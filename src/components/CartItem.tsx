import React from "react";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";

type CartItemProps = {
  productId: number;
  productName: string;
  price: number;
  qty: number;
  image: string;
};

const CartItem = ({
  productId,
  productName,
  price,
  qty,
  image,
}: CartItemProps) => {
  const { increaseQty, decreaseQty, removeCartItem } = useShoppingContext();

  return (
    <tr>
      <td>
        <img
          style={{ width: "300px", height: "50px" }}
          src={image}
          className="img-fluid rounded"
          alt="Product 1"
        />
      </td>
      <td>
        <span className="item-name">{productName}</span>
      </td>
      <td>
        <span className="item-quantity">
          {formatCurrency(price)} <i className="fa-solid fa-xmark"></i> {qty}
        </span>
        <button
          type="button"
          className="btn btn-sm btn-primary ms-4 me-1"
          onClick={() => decreaseQty(productId)}
        >
          <strong>-</strong>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => increaseQty(productId)}
        >
          <strong>+</strong>
        </button>
      </td>
      <td>
        <span className="item-price">{formatCurrency(qty * price)}</span>
      </td>
      <td>
        <button
          className="btn btn-sm btn-danger btn-remove"
          onClick={() => removeCartItem(productId)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
