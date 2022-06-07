export default ({ strapi }) => ({
    index(ctx) {
        ctx.body = strapi
            .plugin("generate-data")
            .service("myService")
            .getWelcomeMessage();
    },
});
