import React, { Fragment } from 'react';
import { useReloadData } from '../../hooks';
import { Catalog } from '../../models';
import { API_URL } from '../../utils';
import { ProductView } from '../ProductView';

export interface CatalogViewProps {
  catalog: Catalog;
}

export const CatalogView = ({ catalog }: CatalogViewProps) => {
  const reloadData = useReloadData();

  const handleProductClicked = async (productId: string) => {
    await fetch(`${API_URL}/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    reloadData();
  };

  return (
    <Fragment>
      {Object.values(catalog).map((product) => (
        <ProductView
          key={product.id}
          product={product}
          onClick={handleProductClicked}
        />
      ))}
    </Fragment>
  );
};
