import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import {
  CartView,
  CatalogView,
  Header,
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../components';
import { Cart, Catalog } from '../models';
import { API_URL } from '../utils';

type HomePageData = {
  catalog: Catalog;
  cart: Cart;
};

export let loader: LoaderFunction = async () => {
  const resCatalog = await fetch(`${API_URL}/catalog`);
  const catalog = await resCatalog.json();

  const resCart = await fetch(`${API_URL}/cart`);
  const cart = await resCart.json();

  let data: HomePageData = {
    catalog,
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

export default function HomePage() {
  let data = useLoaderData<HomePageData>();

  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">
          <CatalogView catalog={data.catalog} />
        </ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <CartView cart={data.cart} />
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
}
