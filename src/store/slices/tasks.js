import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: {},
  activeTask: null,
};

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setOrders(state, {payload}) {
      state.orders = payload;
    },
    removeOrder(state, {payload}) {
      delete state.orders[payload];
    },
    updateOrderProductStatus(state, {payload}) {
      const {orderId, productId, status} = payload;
      const index = state.orders[orderId].items.findIndex(
        item => item.productId == productId,
      );
      state.orders[orderId].items[index].status = status;
    },
  },
});

export const {setOrders, removeOrder, updateOrderProductStatus} = tasks.actions;

export const getOrders = state => state.tasks.orders;

export const getOrder = id => state => state.tasks.orders[id];

export default tasks.reducer;
