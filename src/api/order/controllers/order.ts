/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import uniqueBy from "lodash.uniqby";

export default factories.createCoreController(
    "api::order.order",
    ({ strapi }) => ({
        create(ctx) {
            ctx.request.body.data.products = uniqueBy(
                ctx.request.body.data.products,
                (item: { id: string; __component: string }) =>
                    item.id + item.__component
            );
            return super.create(ctx);
        },
    })
);
