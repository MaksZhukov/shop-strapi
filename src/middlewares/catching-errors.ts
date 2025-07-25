export default (config, { strapi }) => {
    return async (context, next) => {
        try {
            await next();
        } catch (err) {
            // strapi.plugins.email.services.email.send({
            //     to: "maks_zhukov_97@mail.ru",
            //     from: strapi.plugins.email.config("providerOptions.username"),
            //     subject: "Strapi BE Error",
            //     html: `<b>URL</b>: ${context.req.url}<br>
            // 		   <b>METHOD</b>: ${context.req.method}<br>
            // 		   <b>HOST</b>: ${context.req.headers.host}<br>
            //            <b>BODY</b>: ${JSON.stringify(context.request.body)}<br>
            // 		   <b>DESCRIPTION</b>: ${err.toString()}`,
            // });
            throw new Error(err.toString());
        }
    };
};
