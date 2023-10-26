import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import notificationSlice from './notification/notificationSlice';
import productsSlice from './products/productsSlice';
import suppliersSlice from './suppliers/suppliersSlice';
import userSlice from './users/userSlice';
import productCategorySlice from './productCategory/productCategorySlice';
import productUnitSlice from './productUnit/productUnitSlice';
import dashboardSlice from './dashboard/dashboardSlice';

const reducer = {
    auth: authSlice,
    users: userSlice,
    suppliers: suppliersSlice,
    products: productsSlice,
    categories: productCategorySlice,
    units: productUnitSlice,
    notification: notificationSlice,
    dashboard: dashboardSlice
}


export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})
