import CustomerHome from "./components/customer-home.component";
import customerReducer from "./customer.reducer";
import CustomerNav from "./components/customerNavbar.component";
import CustomerLogin from "./components/customer-login.component";
import CustomerSignUp from "./components/customer-signup.component";
import CustomerLogout from "./components/customer-logout.component";
import CustomerProduct from "./components/product.component";
import * as customerActions from "./customers.actions";

export {
    CustomerHome,
    customerReducer,
    CustomerNav,
    CustomerLogin,
    CustomerSignUp,
    CustomerLogout,
    CustomerProduct,
    customerActions,
    customerActions as CustomerAction,
};