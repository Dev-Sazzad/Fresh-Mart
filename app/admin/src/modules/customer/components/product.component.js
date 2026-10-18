import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPublicProduct } from "../customers.actions";
import Breadcrumbs from "../../core/components/breadcrumb.component";
import Rating from "./rating.component";

const one = "https://picsum.photos/id/1040/500/500";

const CustomerProduct = () => {
    const dispatch = useDispatch();

    let product = useSelector(
        (state) => state.customerReducer.publicProduct?.products || []
    );
    const { id } = useParams();
    const finalProduct = product.find((x) => x.id === id);

    useEffect(() => {
        dispatch(getPublicProduct());
    }, [dispatch]);

    return (
        finalProduct && (
            <React.Fragment>
                <div className="container">
                    <Breadcrumbs />
                    <div className="card m-4">
                        <div className="row">
                            <div className="col-4">
                                <img src={one} alt={finalProduct.name} style={{ maxWidth: "90%" }} />
                            </div>
                            <div className="col-8 p-3">
                                <h4>{finalProduct.name}</h4>
                                <div className="d-flex">
                                    <Rating rating={4} /> 156 Ratings
                                </div>
                                <div className="d-flex">
                                    <h4>Store:</h4>
                                    <h4>{finalProduct.shop?.name}</h4>
                                </div>
                                <div className="d-flex">
                                    <h4>Stock:</h4>
                                    <h4>{finalProduct.stock_quantity}</h4>
                                </div>
                                <hr />
                                <div className="d-flex">
                                    <span
                                        className="card_price"
                                        style={{ fontSize: "20px" }}
                                    >
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        {finalProduct.price}
                                    </span>
                                </div>
                                <hr />
                                <div>
                                    <p className="card_price">
                                        {finalProduct.description}
                                    </p>
                                </div>
                                <div className="d-flex align-items-end">
                                    <button className="btn btn-primary">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    );
};

export default CustomerProduct;