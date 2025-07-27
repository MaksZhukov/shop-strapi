export default (plugin) => {
    let nativeSend = plugin.controllers["email"].send;
    plugin.controllers["email"].send = (ctx) => {
        const configEmail = strapi.plugins.email.config("providerOptions.username");
        const email = ctx.request.body.to || configEmail;
        ctx.request.body.from = configEmail;
        ctx.request.body.to = email;
        return nativeSend(ctx);
    };
    return plugin;
};
