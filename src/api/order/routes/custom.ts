export default {
    routes: [
        {
            method: "GET",
            path: "/orders/checkout",
            handler: "order.checkout",
        },
        {
            method: "POST",
            path: "/orders/notification",
            handler: "order.notification",
        },
    ],
};
