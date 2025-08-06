"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  // CART STATE
    const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // or 'signup'


  // Cart helpers
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };


  const fetchFeaturedProducts = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/product/featured");
      const data = await res.json();
      // console.log(data)
      setFeaturedProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching featured products:", err);
      setFeaturedProducts([]);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    const res = await fetch("http://localhost:5000/category/");
    const data = await res.json();
    setCategories(data.cats || []);
    return data.cats || [];
  }, []);

  // Fetch Tags
  const fetchTags = useCallback(async () => {
    const res = await fetch("http://localhost:5000/tag/");
    const data = await res.json();
    // console.log(data.tags)
    setTags(data.tags || []);
    return data.tags || [];
  }, []);

  // Fetch all subcategories by category
  const fetchSubCategories = useCallback(async (cats) => {
    const results = await Promise.all(
      cats.map(async (cat) => {
        const res = await fetch(
          `http://localhost:5000/subcategory/category/${cat._id}`
        );
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
      const res = await fetch("http://localhost:5000/product/");
      const data = await res.json();
      // console.log(Object.keys(data.products).length)

      // Check if data is array
      if (Array.isArray(data)) {
        setAllProducts(data);
      } else if (data.products && Array.isArray(data.products)) {
        setAllProducts(data.products);
      } else {
        console.error("Unexpected response format:", data);
        setAllProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setAllProducts([]);
    }
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/product/category/${categoryId}`
      );
      const data = await res.json();
      const shuffled = Array.isArray(data)
        ? [...data].sort(() => 0.5 - Math.random())
        : [];

      setProductsByCategory(shuffled);
      return shuffled;
    } catch (err) {
      console.error("Error fetching products by category:", err);
      return []; // ✅ return safe empty array on error
    }
  };

  const fetchProductById = useCallback(async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/product/id/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      return data; // returns single product
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      return null;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    (async () => {
      const cats = await fetchCategories();
      if (cats.length) await fetchSubCategories(cats);
      await fetchAllProducts();
      await fetchFeaturedProducts();
      await fetchTags();
    })();
  }, [
    fetchCategories,
    fetchSubCategories,
    fetchAllProducts,
    fetchTags,
    fetchFeaturedProducts,
  ]); // removed fetchProductsByCategory

  return (
    <GlobalContext.Provider
      value={{
        categories,
        subCategoriesMap,
        allProducts,
        featuredProducts,
        productsByCategory,
        tags,
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        authTab,
        setAuthTab, 
        refetchProductsByCategory: fetchProductsByCategory,
        refetchAllProducts: fetchAllProducts,
        refetchProductById: fetchProductById,
        refetchFeaturedProducts: fetchFeaturedProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => useContext(GlobalContext);
