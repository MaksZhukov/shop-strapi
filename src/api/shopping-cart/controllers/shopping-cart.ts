/**
 *  shopping-cart controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::shopping-cart.shopping-cart",
  // @ts-ignore
  ({ strapi }) => ({
    async find(ctx) {
      const userId = ctx.state.user.id;
      ctx.query = {
        populate: "product",
        filters: {
          users_permissions_user: {
            id: {
              $eq: userId,
            },
          },
        },
      };
      return await super.find(ctx);
    },

    async delete(ctx) {
      const { id } = ctx.params;
      const userId = ctx.state.user.id;
      if (
        await strapi.db.query("api::shopping-cart.shopping-cart").findOne({
          where: {
            id: {
              $eq: id,
            },
            users_permissions_user: {
              id: {
                $eq: userId,
              },
            },
          },
        })
      ) {
        return await super.delete(ctx);
      }
    },
  })
);
