import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Footer from "../components/footer.component";
import { getPublicProduct } from "../customers.actions";
import Rating from "../components/rating.component";

// Fallback images to prevent missing module errors
const one = "https://picsum.photos/id/1000/800/400";
const two = "https://picsum.photos/id/1010/800/400";
const three = "https://picsum.photos/id/1020/800/400";

const imageItem = [
    "https://picsum.photos/id/1030/300/300",
    "https://picsum.photos/id/1040/300/300",
    "https://picsum.photos/id/1050/300/300",
    "https://picsum.photos/id/1060/300/300",
    "https://picsum.photos/id/1070/300/300",
    "https://picsum.photos/id/1080/300/300",
    "https://picsum.photos/id/1090/300/300",
];

const CustomerHome = () => {
    const dispatch = useDispatch();

    const cartItem = useSelector((state) => state.customerReducer.cart);
    const product = useSelector((state) => state.customerReducer.publicProduct);
    const loggedInCustomer = useSelector(
        (state) => state.customerReducer.loggedInCustomer
    );

    let cnt = 0;

    const handleCardButton = (item) => {
        if (!loggedInCustomer) {
            toast.error("Log in to add Cart", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        } else {
            let cartItemCopy = [...cartItem];
            cartItemCopy.push(item);
            dispatch({ type: "ADD_PRODUCT_CART", payload: cartItemCopy });
            toast.success("Add to Cart", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        }
    };

    useEffect(() => {
        dispatch(getPublicProduct());
    }, [dispatch]);

    return (
        <>
            <div className="slide_carosel">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-50"
                            src={one}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-50"
                            src={two}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-50"
                            src={three}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="row m-3">
                <h5>Just For You</h5>
            </div>
            <div className="d-flex flex-wrap">
                {product && product.products &&
                    product.products.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className="card_box-wrapper">
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "#000",
                                        }}
                                        to={`/product/${item.id}`}
                                    >
                                        <img
                                            className="card_img"
                                            src={imageItem[cnt++ % 7]}
                                            alt={item.name}
                                        />
                                    </Link>
                                    <div className="card_box-content">
                                        <div
                                            onClick={() =>
                                                handleCardButton(item)
                                            }
                                            className="card_buy"
                                        >
                                            <span>
                                                <i className="fa fa-cart-plus"></i>
                                            </span>
                                        </div>
                                        <div className="card_title">
                                            {item.name ? item.name.slice(0, 17) : ""}
                                        </div>
                                        <div className="card_desc">
                                            Lorem ipsum dolor sit amet.
                                        </div>
                                        <span className="card_price">
                                            {item.price}$
                                        </span>
                                        <div className="card_footer">
                                            <ul>
                                                <Rating rating={3.5} />
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card_success"></div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Footer />
        </>
    );
};

export default CustomerHome;