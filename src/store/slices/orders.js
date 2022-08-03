import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: {},
};

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    set(state, {payload}) {
      state.orders = payload;
    },
    updateProductStatus(state, {payload}) {
      const {orderId, productId, status} = payload;
      const index = state.orders[orderId].items.find(
        item => item.productId == productId,
      );
      state.orders[orderId].items[index].status = status;
    },
  },
});

export const {set: setOrders, updateProductStatus: updateOrderProductStatus} =
  orders.actions;

export default orders.reducer;
