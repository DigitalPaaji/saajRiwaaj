"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
  import { useRouter } from "next/navigation";


const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // or 'signup'
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

// Forgot Password (Not Logged In)
const forgotPassword = async (email) => {
  try {
    const res = await fetch("https://saajriwaaj.onrender.com/user/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return { ok: res.ok, message: data.message || (res.ok ? "Password reset link sent!" : "Something went wrong.") };
  } catch (err) {
    return { ok: false, message: "Network error, please try again!" };
  }
};

// Reset Password (Logged In)
const resetPassword = async (token, password) => {
  try {
    const res = await fetch(`https://saajriwaaj.onrender.com/user/reset-password/${token}`, {
      method: "PUT",
   
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  password  }),
    });
    const data = await res.json();
    return { ok: res.ok, message: data.message || (res.ok ? "Password updated successfully!" : "Failed to update password.") };
  } catch (err) {
    return { ok: false, message: "Network error, please try again!" };
  }
};



const fetchUser = useCallback(async () => {
  try {
    // hit your backend
    const res = await fetch("https://saajriwaaj.onrender.com/user", {
      credentials: "include",
    });

    if (!res.ok) {
      // not logged in or cookie expired
      setUser(null);
      setCart([]);
      setWishlist([]);
      localStorage.removeItem("saajUser");
      return;
    }

    const data = await res.json();
    setUser(data.user);
    localStorage.setItem("saajUser", JSON.stringify(data.user));

    if (data.user?.cart) {
      const formattedCart = data.user.cart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      setCart(formattedCart);
    } else {
      setCart([]);
    }

    if (data.user?.wishlist) {
      setWishlist(data.user.wishlist);
    } else {
      setWishlist([]);
    }

  } catch (err) {
    // fail silently for guest users
    setUser(null);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem("saajUser");
  }
}, []);



 const logoutUser = async () => {
    try {
      await fetch("https://saajriwaaj.onrender.com/user/userlogout", { credentials: "include" });
      setUser(null);
      localStorage.removeItem("saajUser");
      router.refresh();
    } catch (err) {
      console.error("User logout failed", err);
    }
  };



 const fetchAdmin = useCallback(async () => {
    try {
      const res = await fetch("https://saajriwaaj.onrender.com/user/admin", { credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        setAdmin(data.user);
        // localStorage.setItem("saajAdmin", JSON.stringify(data.user));
      } else {
        setAdmin(null);
        localStorage.removeItem("saajAdmin");
      localStorage.removeItem("saajAdminToken");

      }
    } catch (err) {
      setAdmin(null);
      localStorage.removeItem("saajAdmin");
      localStorage.removeItem("saajAdminToken");

      
    }
  }, []);

  const logoutAdmin = async () => {
    try {
      await fetch("https://saajriwaaj.onrender.com/user/adminlogout", { credentials: "include" });
      setAdmin(null);
      localStorage.removeItem("saajAdmin");
      router.replace("/admin/auth");
    } catch (err) {
      console.error("Admin logout failed", err);
    }
  };




const isLoggedIn = !!user;

// Inside your component
const addToWishlist = async (productId) => {
  if (!user) {
    setIsAuthOpen(true);
    setAuthTab("login");
    return;
  }

  try {
    const res = await fetch("https://saajriwaaj.onrender.com/user/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      const data = await res.json();
      setWishlist(data.wishlist);
    } else {
      console.error("Failed to add to wishlist");
    }
  } catch (err) {
    console.error("Add to wishlist error:", err);
  }
};




const removeFromWishlist = async (productId) => {
  if (!user) {
    setIsWishlistOpen(true);
    return;
  }

  try {
    const res = await fetch(
      `https://saajriwaaj.onrender.com/user/wishlist/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (res.ok) {
      const data = await res.json();
      setWishlist(data.wishlist);
    } else {
      console.error("Failed to remove from wishlist");
    }
  } catch (err) {
    console.error("Remove from wishlist error:", err);
  }
};



  const addToCart = async (product) => {
  if (!user) {
   setIsAuthOpen(true);
   setAuthTab("login");
   return;
  }

  // Logged-in user: Call backend
  try {
    const res = await fetch("https://saajriwaaj.onrender.com/user/cart", {
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


  const removeFromCart = async (productId) => {
  if (!user) {
    // force login first
    setIsAuthOpen(true);
    setAuthTab("login");
    return;
  }

  try {
    const res = await fetch(`https://saajriwaaj.onrender.com/user/cart/${productId}`, {
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

  const updateQty = async (productId, qty) => {
  if (!user) {
    // force login first
    setIsAuthOpen(true);
    setAuthTab("login");
    return;
  }

  try {
    const res = await fetch("https://saajriwaaj.onrender.com/user/cart", {
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
      const res = await fetch("https://saajriwaaj.onrender.com/product/featured");
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
    const res = await fetch("https://saajriwaaj.onrender.com/category/");
    const data = await res.json();
    setCategories(data.cats || []);
    return data.cats || [];
  }, []);

  // Fetch Tags
  const fetchTags = useCallback(async () => {
    const res = await fetch("https://saajriwaaj.onrender.com/tag/");
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
          `https://saajriwaaj.onrender.com/subcategory/category/${cat._id}`
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
      const res = await fetch("https://saajriwaaj.onrender.com/product/");
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
        `https://saajriwaaj.onrender.com/product/category/${categoryId}`
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
      const res = await fetch(`https://saajriwaaj.onrender.com/product/id/${id}`);
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
    const savedAdmin = localStorage.getItem("saajAdmin");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));

  if (savedUser) {
    fetchUser();
  }

  if (window.location.pathname.startsWith("/admin") && savedAdmin) {
    fetchAdmin();
  }
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
    fetchUser,
    fetchAdmin
  ]);
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
        setCart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        addToWishlist,
        removeFromWishlist,
        isAuthOpen,
        setIsAuthOpen,
        authTab,
        setAuthTab, 
        user,
        admin,
        setUser,
        logoutUser,
        // logout,
        isLoggedIn,
        forgotPassword,
        resetPassword,
        refetchProductsByCategory: fetchProductsByCategory,
        refetchAllProducts: fetchAllProducts,
        refetchProductById: fetchProductById,
        refetchFeaturedProducts: fetchFeaturedProducts,
    refetchUser:fetchUser,
   refetchAdmin: fetchAdmin,
   logoutAdmin
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => useContext(GlobalContext);
