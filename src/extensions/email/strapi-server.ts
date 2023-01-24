export default (plugin) => {
    let nativeSend = plugin.controllers.email.send;
    plugin.controllers.email.send = (ctx) => {
        const email = strapi.plugins.email.config("providerOptions.username");
        ctx.request.body.from = email;
        ctx.request.body.to = email;
        return nativeSend(ctx);
    };
    return plugin;
};
