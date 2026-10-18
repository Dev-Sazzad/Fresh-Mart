const path = require("path");
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate"));
const controller = require("./order.controller");

module.exports = (app) => {
    app.route("/api/orders")
        .get(controller.getOrders)
        .post(controller.createOrder);

    app.route("/api/orders/:id")
        .get(controller.getOrder)
        .post(controller.updateOrder)
        .delete(controller.deleteOrder);

    app.route("/api/orders/:id/products")
        .get(controller.getOrder)
        .post(controller.updateOrder)
        .delete(controller.deleteOrder);

    app.route("/api/orders/:id/products/:id")
        .get(controller.getOrder)
        .post(controller.updateOrder)
        .delete(controller.deleteOrder);


};