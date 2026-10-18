import axios from "axios";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import join from "url-join";
import NoMatch from "./NoMatch";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import ServiceList from "./components/service-list.component";
import {
    Dashboard,
    Login,
    Logout,
    ForgotPassword,
    ResetPassword,
    PlatformRoutes,
    MyProfile,
    UpdateMyProfile,
    userActions,
} from "../platform";
import { Complain } from "../complaint";

import {
    CustomerHome,
    CustomerLogin,
    CustomerSignUp,
    CustomerLogout,
    CustomerProduct,
    customerActions,
} from "../customer";
import {
    Products,
    shopActions,
    ShopLogin,
    ShopLogout,
} from "../shop";

// Fallback components for missing Shop exports
const ShopDashboard = () => <div className="container mt-5"><h4>Shop Dashboard (Coming Soon)</h4></div>;
const MyShopProfile = () => <div className="container mt-5"><h4>My Shop Profile (Coming Soon)</h4></div>;
const UpdateMyShopProfile = () => <div className="container mt-5"><h4>Update Shop Profile (Coming Soon)</h4></div>;

const { getSignedInShopProfile } = shopActions || {};
const { getSignedInUserProfile } = userActions || {};
const { getSignedInCustomerProfile } = customerActions || {};

let refCount = 0;

function setLoading(isLoading) {
    if (isLoading) {
        refCount++;
        const loader = document.getElementById("loader");
        if (loader) loader.style = "display: block";
    } else if (refCount > 0) {
        refCount--;
        const loader = document.getElementById("loader");
        if (loader) {
            if (refCount > 0) loader.style = "display: block";
            else loader.style = "display: none";
        }
    }
}

axios.interceptors.request.use(
    (config) => {
        setLoading(true);
        return config;
    },
    (error) => {
        setLoading(false);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        setLoading(false);
        return response;
    },
    (error) => {
        setLoading(false);
        return Promise.reject(error);
    }
);

// Updated Interceptor with Token and BaseURL handling
axios.interceptors.request.use(function (config) {
    const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
    const baseUrl = "http://localhost:3000";

    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(baseUrl, config.url);
    }

    // Pass JWT Token in Authorization Header if available
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.withCredentials = true;

    return config;
});

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Only fetch Customer Profile on startup if logged in to prevent 401s from admin/shop APIs
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token && getSignedInCustomerProfile) {
            dispatch(getSignedInCustomerProfile());
        }
    }, [dispatch]);

    return (
        <>
            <ToastContainer />
            <Switch>
                <PublicRoutes path="/admin/login" component={Login} />
                <PrivateRoutes path="/admin/logout" component={Logout} />
                <Route path="/admin/reset-password" component={ResetPassword} />
                <Route path="/admin/forgot-password" component={ForgotPassword} />
                <Route path="/admin/platform" component={PlatformRoutes} />
                <PrivateRoutes path="/admin/complaint" component={Complain} />
                <PrivateRoutes exact path="/admin" component={Dashboard} />

                <PublicRoutes path="/signup" component={CustomerSignUp} />
                <PublicRoutes path="/login" component={CustomerLogin} />
                <PublicRoutes path="/product/:id" component={CustomerProduct} />
                <Route path="/logout" component={CustomerLogout} />
                <PublicRoutes exact path="/" component={CustomerHome} />
                <PrivateRoutes path="/my-profile" component={MyProfile} />
                <PrivateRoutes path="/update-my-profile" component={UpdateMyProfile} />
                <PrivateRoutes path="/service-list" component={ServiceList} />

                <PublicRoutes path="/shop-login" component={ShopLogin} />
                <PrivateRoutes path="/shop-logout" component={ShopLogout} />
                <PrivateRoutes path="/shop-dashboard" component={ShopDashboard} />
                <PrivateRoutes path="/my-shop-profile" component={MyShopProfile} />
                <PrivateRoutes path="/update-my-shop-profile" component={UpdateMyShopProfile}/>
                <PrivateRoutes path="/shop-products" component={Products} />

                <Route component={NoMatch} />
            </Switch>
        </>
    );
}

export default App;