import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rogue-cart');
      const items = saved ? JSON.parse(saved) : [];
      // Preserve saved bags when local product assets migrate to WebP.
      return items.map(item => ({
        ...item,
        image: typeof item.image === 'string' && item.image.startsWith('/products/')
          ? item.image.replace(/\.(png|jpe?g)(?=$|[?#])/i, '.webp')
          : item.image,
      }));
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rogue-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('rogue-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rogue-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const [lastAddedKey, setLastAddedKey] = useState(null);

  const addToCart = (product, size = 'M', quantity = 1, selectedImage = null, sourceRect = null) => {
    const itemImg = selectedImage || (product.images && product.images[0]?.url) || '';

    let cleanRect = null;
    if (sourceRect && typeof sourceRect === 'object') {
      cleanRect = {
        left: typeof sourceRect.left === 'number' ? sourceRect.left : Number(sourceRect.left) || 0,
        top: typeof sourceRect.top === 'number' ? sourceRect.top : Number(sourceRect.top) || 0,
        width: typeof sourceRect.width === 'number' ? sourceRect.width : Number(sourceRect.width) || 160,
        height: typeof sourceRect.height === 'number' ? sourceRect.height : Number(sourceRect.height) || 200
      };
    }

    // Trigger Fly to Cart animation cleanly on animation frame
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('rogue-fly-to-cart', {
          detail: {
            image: itemImg,
            startRect: cleanRect
          }
        }));
      });
    }

    const itemKey = `${product.id}-${size}`;
    setLastAddedKey(itemKey);

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            sku: product.sku,
            category: product.category,
            image: itemImg,
            size: size,
            quantity: quantity,
            stock: product.stock
          }
        ];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Curated Wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Added to Curated Wishlist");
        return [...prev, productId];
      }
    });
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const estimatedTax = Math.round(subtotal * 0.12);
  const total = subtotal + shippingFee + estimatedTax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItemsCount,
        shippingFee,
        estimatedTax,
        total,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        toastMessage,
        showToast,
        lastAddedKey
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
