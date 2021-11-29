import React, { Fragment } from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useNavigate } from 'remix';
import { useReloadData } from '../../hooks';
import { Cart, CartUtils } from '../../models';
import { API_URL } from '../../utils';
import { HorizontalContainer } from '../Containers';

export interface CartViewProps {
  cart: Cart;
}

export const CartView = ({ cart }: CartViewProps) => {
  const navigate = useNavigate();
  const reloadData = useReloadData();

  const handleQuantityChange = async (productId: string, quantity: string) => {
    await fetch(`${API_URL}/cart/items/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    reloadData();
  };

  const handleDelete = async (productId: string) => {
    await fetch(`${API_URL}/cart/items/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    reloadData();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Fragment>
      <HorizontalContainer className="justify-between items-center">
        <h2>Shopping Cart</h2>
        {cart.items.length > 0 ? (
          <button className="btn btn-sm btn-secondary" onClick={handleCheckout}>
            Checkout
          </button>
        ) : null}
      </HorizontalContainer>
      {cart.items.length === 0 ? (
        <p>Please click on a product to start your order.</p>
      ) : (
        <table data-testid="order-items" className="mt-3">
          <tbody>
            {cart.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td className="cart__qty-col text-right">
                  <input
                    data-testid="quantity-input"
                    className="cart__qty"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, e.target.value)
                    }
                  />
                </td>
                <td
                  className="cart__price-col text-right"
                  data-testid="price-cell"
                >
                  {NumberUtils.formatAsMoney(item.price * item.quantity)}
                </td>
                <td className="cart__del-col text-center">
                  <AiTwotoneDelete
                    data-testid="delete-button"
                    className="cursor-pointer"
                    onClick={() => handleDelete(item.productId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td className="text-right">
                {NumberUtils.formatAsMoney(CartUtils.total(cart))}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </Fragment>
  );
};
