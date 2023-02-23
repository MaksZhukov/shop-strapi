export default {
    routes: [
        {
            method: "GET",
            path: "/orders/checkout/:id",
            handler: "order.checkout",
        }
    ],
};
