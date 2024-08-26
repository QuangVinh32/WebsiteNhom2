import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type ShoppingContextProviderProps = {
  children: ReactNode;
};

type CartItem = {
  productId: number;
  productName: string;
  price: number;
  qty: number;
  image: string;
};

type ProductItem = {
  productId: number;
  productName: string;
  price: number;
  image: string;
};

interface ShoppingContextType {
  cartQty: number;
  totalPrice: number;
  cartItems: CartItem[];
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  addCartItem: (item: ProductItem) => void;
  removeCartItem: (productId: number) => void;
  clearCart: () => void;
}

const ShoppingContext = createContext<ShoppingContextType>(
  {} as ShoppingContextType
);

export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

export const ShoppingContextProvider = ({
  children,
}: ShoppingContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const jsonCartData = localStorage.getItem("shopping_cart");
    return jsonCartData ? JSON.parse(jsonCartData) : [];
  });

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const increaseQty = (productId: number) => {
    console.log("increaseQty => ", productId);
    const currentCartItem = cartItems.find(
      (item) => item.productId === productId
    );
    if (currentCartItem) {
      const newItems = cartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      setCartItems(newItems);
    }
  };

  const decreaseQty = (productId: number) => {
    console.log("decreaseQty => ", productId);
    const currentCartItem = cartItems.find(
      (item) => item.productId === productId
    );
    if (currentCartItem) {
      if (currentCartItem.qty == 1) {
        removeCartItem(productId);
      } else {
        const newItems = cartItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
        setCartItems(newItems);
      }
    }
  };

  const addCartItem = (product: ProductItem) => {
    console.log("product=> ", product);
    if (product) {
      const currentCartItem = cartItems.find(
        (item) => item.productId === product.productId
      );
      if (currentCartItem) {
        const newItems = cartItems.map((item) => {
          if (item.productId === product.productId) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
        setCartItems(newItems);
      } else {
        const newItem = { ...product, qty: 1 };
        setCartItems([...cartItems, newItem]);
      }
    }
  };

  const removeCartItem = (productId: number) => {
    console.log("removeCartItem => ", productId);
    const currentCartItemIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );
    const newItems = [...cartItems];
    newItems.splice(currentCartItemIndex, 1);
    setCartItems(newItems);
  };

  const clearCart = () => {
    console.log("clearCart => ");
    setCartItems([]);
  };

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        cartQty,
        totalPrice,
        increaseQty,
        decreaseQty,
        addCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
