export default (plugin) => {
    plugin.controllers.user.updateMe = (ctx) => {
        const { id } = ctx.state.user;
        const { email } = ctx.request.body;
        if (email) {
            return ctx.response.badRequest("email can't be updated");
        }
        ctx.params.id = id;
        return plugin.controllers.user.update(ctx);
    };

    plugin.routes["content-api"].routes.unshift({
        method: "PUT",
        path: "/users/me",
        handler: "user.updateMe",
        config: {
            prefix: "",
        },
    });

    return plugin;
};
