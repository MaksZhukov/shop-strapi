export default {
    routes: [
        {
            method: "POST",
            path: "/orders-v1/checkout",
            handler: "order-v1.checkout",
        },
        {
            method: "POST",
            path: "/orders-v1/notification",
            handler: "order-v1.notification",
        },
        {
            method: "POST",
            path: "/orders-v1/cancel",
            handler: "order-v1.cancel",
        },
    ],
};
