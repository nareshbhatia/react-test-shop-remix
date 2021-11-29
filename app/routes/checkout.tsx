import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import {
  CartSummary,
  Header,
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../components';
import { Cart, Catalog } from '../models';
import { API_URL } from '../utils';

type CheckoutPageData = {
  cart: Cart;
};

export let loader: LoaderFunction = async () => {
  const resCart = await fetch(`${API_URL}/cart`);
  const cart = await resCart.json();

  let data: CheckoutPageData = {
    cart,
  };

  return json(data);
};

export let meta: MetaFunction = () => {
  return {
    title: 'React Test Shop',
    description: 'Welcome to React Test Shop!',
  };
};

export default function CheckoutPage() {
  let { cart } = useLoaderData<CheckoutPageData>();

  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">Form</ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <CartSummary cart={cart} />
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
}
