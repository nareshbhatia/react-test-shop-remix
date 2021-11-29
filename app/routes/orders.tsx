import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import {
  Header,
  OrderView,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../components';
import { Order } from '../models';
import { API_URL } from '../utils';

type OrdersPageData = {
  orders: Array<Order>;
};

export let loader: LoaderFunction = async () => {
  const resOrders = await fetch(`${API_URL}/orders`);
  const orders = await resOrders.json();

  const sortedOrders = orders.sort((order1: Order, order2: Order) => {
    const date1 = new Date(order1.createdAt);
    const date2 = new Date(order2.createdAt);
    if (date1 < date2) return 1;
    if (date1 > date2) return -1;
    return 0;
  });

  let data: OrdersPageData = {
    orders: sortedOrders,
  };

  return json(data);
};

export let meta: MetaFunction = () => {
  return {
    title: 'React Test Shop',
    description: 'Welcome to React Test Shop!',
  };
};

export default function OrdersPage() {
  const { orders } = useLoaderData<OrdersPageData>();

  return (
    <ViewVerticalContainer>
      <Header />
      <ScrollingContainer className="container flex-1 my-2">
        {orders.length === 0 ? (
          <p>Your have no orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="w-640">
              <OrderView order={order} />
            </div>
          ))
        )}
      </ScrollingContainer>
    </ViewVerticalContainer>
  );
}
