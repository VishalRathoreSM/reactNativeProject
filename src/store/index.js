import {configureStore} from '@reduxjs/toolkit';

import reducer from '@slices/orders';

const store = configureStore({
  reducer,
});

export default store;
