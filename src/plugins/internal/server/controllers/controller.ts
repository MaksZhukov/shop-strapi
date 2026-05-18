import { factories } from "@strapi/strapi";

export default factories.createCoreController("plugin::internal.data", () => ({
    async downloadCatalogJson(ctx) {
        const json = await strapi
            .plugin("internal")
            .service("catalog")
            .generateCatalogJson();

        ctx.set("Content-Type", "application/json; charset=utf-8");
        ctx.set("Content-Disposition", 'attachment; filename="catalog.json"');
        ctx.body = json;
    },
}));
