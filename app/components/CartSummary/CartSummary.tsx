import React, { Fragment } from 'react';
import { Cart } from '../../models';
import { OrderItemList } from '../OrderView';

export interface CartSummaryProps {
  cart: Cart;
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
  return (
    <Fragment>
      <h2>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <OrderItemList items={cart.items} className="mt-3" />
      )}
    </Fragment>
  );
};
