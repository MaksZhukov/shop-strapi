export default (config, { strapi }) => {
    return async (context, next) => {
        try {
            await next();
        } catch (err) {
            strapi.plugins.email.services.email.send({
                to: "maks_zhukov_97@mail.ru",
                from: strapi.plugins.email.config("providerOptions.username"),
                subject: "Razbor Auto Error",
                text: err.toString(),
            });
        }
    };
};
