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
  const [user, setUser] = useState(null);


// const fetchUser = useCallback(async () => {
//   try {
//     const res = await fetch("http://localhost:5000/user/", {
//       credentials: "include",
//     });

//     if (res.status === 204) {
//       // No user logged in
//       setUser(null);
//       localStorage.removeItem("saajUser");
//       return;
//     }
   
//     if (res.ok) {  
//       const userData = await res.json() ;  
//       // console.log(userData.user);     
//       localStorage.setItem("saajUser", JSON.stringify(userData));
//       setUser(userData.user);
//     } else {
//       console.log("Failed to fetch user");
//       setUser(null);
//       localStorage.removeItem("saajUser");
//     }
//   } catch (err) {
//     console.error("Error fetching user:", err);
//   }
// },[]);



const fetchUser = useCallback(async () => {
  try {
    const res = await fetch("http://localhost:5000/user/", {
      credentials: "include",
    });

    if (res.status === 204) {
      setUser(null);
      setCart([]);
      localStorage.removeItem("saajUser");
      return;
    }

    if (res.ok) {
      const userData = await res.json();
      localStorage.setItem("saajUser", JSON.stringify(userData));
      setUser(userData.user);

      // Convert populated cart into usable frontend format
      const formattedCart = userData.user.cart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      setCart(formattedCart);
    } else {
      setUser(null);
      setCart([]);
    }
  } catch (err) {
    console.error("Error fetching user:", err);
  }
}, []);




const logoutUser = async () => {
  try {
    await fetch("http://localhost:5000/user/logout", {
      credentials: "include",
    });
    localStorage.removeItem("saajUser");
    localStorage.removeItem("saajToken");
    setUser(null);
  } catch (err) {
    console.error("Logout error:", err);
  }
};

const isLoggedIn = !!user;

  // Cart helpers
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     const exists = prevCart.find((item) => item._id === product._id);
  //     if (exists) {
  //       return prevCart.map((item) =>
  //         item._id === product._id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };


  const addToCart = async (product) => {
  if (!user) {
    // Local cart for guest user
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
    return;
  }

  // Logged-in user: Call backend
  try {
    const res = await fetch("http://localhost:5000/user/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      // Get updated cart from backend and update state
      const updatedCart = data.cart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      setCart(updatedCart);
    } else {
      console.error("Failed to add to cart");
    }
  } catch (err) {
    console.error("Add to cart error:", err);
  }
};


  // const removeFromCart = (id) => {
  //   setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  // };


  const removeFromCart = async (productId) => {
  if (!user) {
    setCart((prev) => prev.filter((item) => item._id !== productId));
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/user/cart/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      const updatedCart = data.cart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      setCart(updatedCart);
    } else {
      console.error("Failed to remove from cart");
    }
  } catch (err) {
    console.error("Remove from cart error:", err);
  }
};



  // const updateQty = (id, qty) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item._id === id ? { ...item, quantity: qty } : item
  //     )
  //   );
  // };


  const updateQty = async (productId, qty) => {
  if (!user) {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: qty } : item
      )
    );
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/user/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity: qty }),
    });

    if (res.ok) {
      const data = await res.json();
      const updatedCart = data.cart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      setCart(updatedCart);
    } else {
      console.error("Failed to update quantity");
    }
  } catch (err) {
    console.error("Update quantity error:", err);
  }
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
     const savedUser = localStorage.getItem("saajUser");
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("saajUser");
    }
  }
    (async () => {
      const cats = await fetchCategories();
      if (cats.length) await fetchSubCategories(cats);
      await fetchAllProducts();
      await fetchFeaturedProducts();
      await fetchTags();
      await fetchUser()
    })();
  }, [
    fetchCategories,
    fetchSubCategories,
    fetchAllProducts,
    fetchTags,
    fetchFeaturedProducts,
    fetchUser
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
        user,
        setUser,
        logoutUser,
        isLoggedIn,
        refetchProductsByCategory: fetchProductsByCategory,
        refetchAllProducts: fetchAllProducts,
        refetchProductById: fetchProductById,
        refetchFeaturedProducts: fetchFeaturedProducts,
    refetchUser:fetchUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => useContext(GlobalContext);
