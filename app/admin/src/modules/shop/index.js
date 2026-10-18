import React from 'react';
import ShopLogin from './components/login.component';
import ShopLogout from './components/logout.component';
import ForgotPassword from './components/forgot-password.component';
import shopReducer from './shop.reducer';
import productsReducer from './components/products/products.reducer';
import Products from './components/products/components/products';
import * as productActions from './components/products/products.actions';
import * as shopActions from './shop.actions';

// Fallback components for missing shop dashboard and profile files
const ShopDashboard = () => <div className="container mt-5"><h4>Shop Dashboard (Coming Soon)</h4></div>;
const MyShopProfile = () => <div className="container mt-5"><h4>My Shop Profile (Coming Soon)</h4></div>;
const UpdateMyShopProfile = () => <div className="container mt-5"><h4>Update Shop Profile (Coming Soon)</h4></div>;

export {
	ShopLogin,
	ShopLogout,
	ShopDashboard,
	ForgotPassword,
	MyShopProfile,
	UpdateMyShopProfile,
	shopReducer,
	productsReducer,
	shopActions,
	Products,
	productActions,
};