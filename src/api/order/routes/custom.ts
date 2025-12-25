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
        {
            method: "POST",
            path: "/orders/checkout-v1",
            handler: "order.checkoutV1",
        },
        {
            method: "POST",
            path: "/orders/notification-v1",
            handler: "order.notificationV1",
        },
    ],
};
