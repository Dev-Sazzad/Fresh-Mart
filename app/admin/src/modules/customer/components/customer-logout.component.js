import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { customerLogout } from "../customers.actions";

function CustomerLogout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(customerLogout());
        window.location.href = "/";
    }, [dispatch]);

    return null;
}

export default CustomerLogout;