import {faker} from '@faker-js/faker';

export const fetchAllOrders = async () => {
  let orders = [];

  for (let id = 1; id <= 7; id++) {
    let email = faker.internet.email();
    let address = faker.address.streetAddress();
    let name = faker.name.firstName();
    let phone = faker.phone.number();

    let totalPrice = faker.commerce.price(400, 800, 0, '$');
    let pkgCode = 'Pkg' + faker.random.numeric(5);
    let dlvryCode = 'Dly' + faker.random.numeric(5);
    let invoiceNo = 'INo' + faker.random.numeric(5);
    let orderId = 'OId' + faker.random.numeric(5);

    let noOfItems = faker.datatype.number({max: 5, min: 1});

    let items = [];
    for (let i = 0; i < noOfItems; i++) {
      let name = faker.commerce.product();
      let price = faker.commerce.price(100, 200, 0, '$');
      let productId = 'PId' + faker.random.numeric(5);
      let inStock = faker.datatype.boolean();
      let img = faker.image.food(150, 150);

      items.push({
        name,
        productId,
        price,
        status: inStock ? 'not-picked' : 'out-of-stock',
        inStock,
        img,
      });
    }

    orders.push({
      pkgCode,
      dlvryCode,
      invoiceNo,
      orderId,
      totalPrice,
      user: {
        name,
        email,
        address,
        phone,
      },
      items,
    });
  }

  return orders;
};
