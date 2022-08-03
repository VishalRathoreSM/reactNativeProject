import {productStatusTypes} from '@constants/order';

const {emptyArr} = global;

const {picked, notPicked, missing, outOfStock} = productStatusTypes;

export const GenerateOrders = (orders = emptyArr) => {
  let formattedOrders = {};

  orders.map(data => {
    formattedOrders[data.orderId] = data;
  });

  return formattedOrders;
};

const SortProducts = (x, y) => {
  if (x.name < y.name) {
    return -1;
  }
  if (x.name > y.name) {
    return 1;
  }
  return 0;
};

export const GenerateFilteredProducts = products => {
  let pickedProducts = [];
  let notPickedProducts = [];
  let outOfStockProducts = [];
  let missingProducts = [];

  for (let product of products) {
    const {status} = product;
    switch (status) {
      case picked:
        pickedProducts.push(product);
        break;
      case notPicked:
        notPickedProducts.push(product);
        break;
      case outOfStock:
        outOfStockProducts.push(product);
        break;
      case missing:
        missingProducts.push(product);
        break;
      default:
        break;
    }
  }

  pickedProducts.sort(SortProducts);
  notPickedProducts.sort(SortProducts);
  missingProducts.sort(SortProducts);
  outOfStockProducts.sort(SortProducts);

  return {
    pickedProducts,
    notPickedProducts,
    missingProducts,
    outOfStockProducts,
  };
};
