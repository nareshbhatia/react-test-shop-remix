import type { MetaFunction } from 'remix';
import { Header, ViewVerticalContainer } from '../components';

export let meta: MetaFunction = () => {
  return {
    title: 'React Test Shop',
    description: 'Welcome to React Test Shop!',
  };
};

export default function OrdersPage() {
  return (
    <ViewVerticalContainer>
      <Header />
      <h1>Orders</h1>
    </ViewVerticalContainer>
  );
}
