import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json } from 'remix';
import { Header, ViewVerticalContainer } from '../components';


type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: 'Remix Docs',
        url: 'https://remix.run/docs',
      },
      {
        name: 'React Router Docs',
        url: 'https://reactrouter.com/docs',
      },
      {
        name: 'Remix Discord',
        url: 'https://discord.gg/VBePs6d',
      },
    ],
    demos: [
      {
        to: 'demos/actions',
        name: 'Actions',
      },
      {
        to: 'demos/about',
        name: 'Nested Routes, CSS loading/unloading',
      },
      {
        to: 'demos/params',
        name: 'URL Params and Error Boundaries',
      },
    ],
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
  let data = useLoaderData<IndexData>();

  return (
    <ViewVerticalContainer>
      <Header />
      <h1>Home</h1>
    </ViewVerticalContainer>
  );
}
