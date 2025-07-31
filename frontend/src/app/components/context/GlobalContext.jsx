'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);


  // Fetch categories
  const fetchCategories = useCallback(async () => {
    const res = await fetch('http://localhost:5000/category/');
    const data = await res.json();
    setCategories(data.cats || []);
    return data.cats || [];
  }, []);

  // Fetch all subcategories by category
  const fetchSubCategories = useCallback(async (cats) => {
    const results = await Promise.all(
      cats.map(async (cat) => {
        const res = await fetch(`http://localhost:5000/subcategory/category/${cat._id}`);
        const data = await res.json();
        return { [cat._id]: data };
      })
    );
    setSubCategoriesMap(Object.assign({}, ...results));
  }, []);

  // Fetch all products (optional: use later for filters, search, etc.)
 
    const fetchAllProducts = useCallback(async () => {
      try {
        // const res = await fetch(`${Apiurl}/products`);
        const res = await fetch('http://localhost:5000/product/');
        const data = await res.json();
         // Check if data is array
      if (Array.isArray(data)) {
        setAllProducts(data);
      } else if (data.products && Array.isArray(data.products)) {
        setAllProducts(data.products);
      } else {
        console.error("Unexpected response format:", data);
        setAllProducts([]);
      }
      // console.log(data)
       
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts([]);
      }
    },[])

  const fetchProductsByCategory = async (categoryId) => {
  try {
    const res = await fetch(`http://localhost:5000/product/category/${categoryId}`);
    const data = await res.json();

    setProductsByCategory(data); // update context state (optional)
    return data; // ✅ RETURN so the calling component gets the products
  } catch (err) {
    console.error('Error fetching products by category:', err);
    return []; // ✅ return safe empty array on error
  }
};


    

  // Initial fetch
useEffect(() => {
  (async () => {
    const cats = await fetchCategories();
    if (cats.length) await fetchSubCategories(cats);
    await fetchAllProducts();
  })();
}, [fetchCategories, fetchSubCategories, fetchAllProducts]); // removed fetchProductsByCategory

  return (
    <GlobalContext.Provider value={{ categories, subCategoriesMap, allProducts, productsByCategory, refetchProductsByCategory: fetchProductsByCategory, refetchAllProducts: fetchAllProducts }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => useContext(GlobalContext);
