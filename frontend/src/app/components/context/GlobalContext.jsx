"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

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
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login"); // or 'signup'
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  // Forgot Password (Not Logged In)
  const forgotPassword = async (email) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      return {
        ok: res.ok,
        message:
          data.message ||
          (res.ok ? "Password reset link sent!" : "Something went wrong."),
      };
    } catch (err) {
      return { ok: false, message: "Network error, please try again!" };
    }
  };

  // Reset Password (Logged In)
  const resetPassword = async (token, password) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/reset-password/${token}`,
        {
          method: "PUT",

          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      return {
        ok: res.ok,
        message:
          data.message ||
          (res.ok
            ? "Password updated successfully!"
            : "Failed to update password."),
      };
    } catch (err) {
      return { ok: false, message: "Network error, please try again!" };
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/all`,
        {
          method: "GET",
          credentials: "include", // send cookies if required
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAllUsers(data.users || []);
      } else {
        // toast.error(data.message || "Failed to load users");
        setAllUsers([]);
      }
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      // hit your backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/user`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/userlogout`, {
        method: "POST",
        credentials: "include",
      });
      // manual cookie clear for frontend domain
      document.cookie =
        "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setUser(null);
      setCart([]);
      setWishlist([]);
      localStorage.removeItem("saajUser");
      localStorage.removeItem("saajToken");
      window.location.reload();
    } catch (err) {
      console.error("User logout failed", err);
    }
  };

  const fetchAdmin = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/admin`,
        {
          credentials: "include",
        }
      );
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
      await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/adminlogout`, {
        method: "POST",
        credentials: "include",
      });
      // manual cookie clear for frontend domain
      document.cookie =
        "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setUser(null);
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ productId }),
        }
      );

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
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/wishlist/${productId}`,
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

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/cart`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id,
          quantity: product.selectedQty || 1,
          color: product.selectedColor?.colorName || null,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      // if product already exists → show "view cart"
      if (data.message === "Product already in cart") {
        toast.custom(() => (
          <div className="bg-white px-4 py-3 rounded shadow-md border flex items-center gap-3">
            <span className="text-sm font-medium text-gray-800">
              Product already in cart
            </span>
            <Link
              href="/cart"
              className="ml-2 px-3 py-1 text-xs font-medium text-white bg-[#B67032] rounded hover:bg-[#a95c2e]"
            >
              View Cart
            </Link>
          </div>
        ));
        return;
      }
      toast.error(data.message || "Failed to add to cart");
      return;
    }

    // Update local cart state
    setCart(
      data.cart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
        color: item.color,
        stock: item.color
          ? item.product.colorVariants.find(
              (c) => c.colorName === item.color
            )?.quantity
          : item.product.quantity,
      }))
    );

    toast.success("Added to cart ✅");
  } catch (err) {
    console.error("Add to cart error:", err);
  }
};


  // const addToCart = async (product) => {
  //   if (!user) {
  //     setIsAuthOpen(true);
  //     setAuthTab("login");
  //     return;
  //   }

  //   // Check if product already in cart with same color
  //   const alreadyInCart = cart.some(
  //     (item) =>
  //       item._id === product._id &&
  //       (item.color || null) === (product.selectedColor?.colorName || null)
  //   );

  //   if (alreadyInCart) {
  //     toast.custom((t) => (
  //       <div className="bg-white px-4 py-3 rounded shadow-md border flex items-center gap-3">
  //         <span className="text-sm font-medium text-gray-800">
  //           Product already in cart
  //         </span>
  //         <Link
  //           href="/cart"
  //           className="ml-2 px-3 py-1 text-xs font-medium text-white bg-[#B67032] rounded hover:bg-[#a95c2e]"
  //         >
  //           View Cart
  //         </Link>
  //       </div>
  //     ));
  //     return;
  //   }

  //   // Logged-in user: Call backend
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/cart`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify({
  //           productId: product._id,
  //           quantity: product.selectedQty || 1,
  //           color: product.selectedColor?.colorName || null,
  //         }),
  //       }
  //     );

  //     if (res.ok) {
  //       const data = await res.json();
  //       setCart(
  //         data.cart.map((item) => ({
  //           ...item.product,
  //           quantity: item.quantity,
  //           color: item.color,
  //           stock: item.color
  //             ? item.product.colorVariants.find(
  //                 (c) => c.colorName === item.color
  //               )?.quantity
  //             : item.product.quantity,
  //         }))
  //       );
  //       // Get updated cart from backend and update state
  //       // const updatedCart = data.cart.map((item) => ({
  //       //   ...item.product,
  //       //   quantity: item.quantity,
  //       //    color: item.color,
  //       //      stock: item.color
  //       //   ? item.product.colorVariants.find(c => c.colorName === item.color)?.quantity
  //       //   : item.product.quantity,
  //       // }));
  //       // setCart(updatedCart);
  //       // toast.success("Added to cart ✅");
  //     } else {
  //       const error = await res.json();
  //       toast.error(error.message || "Failed to add to cart");
  //     }
  //   } catch (err) {
  //     console.error("Add to cart error:", err);
  //   }
  // };

  const removeFromCart = async (productId) => {
    if (!user) {
      // force login first
      setIsAuthOpen(true);
      setAuthTab("login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/cart/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

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

  const updateQty = async (productId, qty, color) => {
    if (!user) {
      // force login first
      setIsAuthOpen(true);
      setAuthTab("login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/cart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ productId, quantity: qty, color }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const updatedCart = data.cart.map((item) => ({
          ...item.product,
          quantity: item.quantity,
          color: item.color,
          stock: item.color
            ? item.product.colorVariants.find((c) => c.colorName === item.color)
                ?.quantity
            : item.product.quantity,
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/product/featured`
      );
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/category`);
    const data = await res.json();
    setCategories(data.cats || []);
    return data.cats || [];
  }, []);

  // Fetch Tags
  const fetchTags = useCallback(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/tag/`);
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
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/subcategory/category/${cat._id}`
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/product/`);
      const data = await res.json();
      console.log(Object.values(data.products));

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

  const fetchOrderById = useCallback(async (orderId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/${orderId}`,
        {
          credentials: "include",
        }
      );

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Order data:", data);

      if (!res.ok) throw new Error("Failed to fetch order");
      return data.order;
    } catch (err) {
      console.error("Error fetching order by ID:", err);
      return null;
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/`, {
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        toast.error("Admin access required");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/product/category/${categoryId}`
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/product/id/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      return data; // returns single product
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      return null;
    }
  }, []);

  // Initial fetch
  useEffect(
    () => {
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
        if (cats?.length) await fetchSubCategories(cats);
        await fetchAllProducts();
        await fetchFeaturedProducts();
        await fetchTags();
        await fetchAllUsers();
      })();
    },
    [
      // fetchCategories,
      // fetchSubCategories,
      // fetchAllProducts,
      // fetchTags,
      // fetchFeaturedProducts,
      // fetchAllUsers,
      // fetchUser,
      // fetchAdmin,
    ]
  );
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
        isOrderOpen,
        setIsOrderOpen,
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
        refetchUser: fetchUser,
        refetchAdmin: fetchAdmin,
        logoutAdmin,
        fetchOrders,
        fetchOrderById,
        orders,
        loadingOrders,
        allUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => useContext(GlobalContext);
