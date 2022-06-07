export default ({ strapi }) => ({
    getWelcomeMessage() {
        console.log(strapi);
        return "Welcome to Strapi 🚀";
    },
});
