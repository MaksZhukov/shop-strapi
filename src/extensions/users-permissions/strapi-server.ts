import { verifyRecaptcha } from "../../services/recaptcha";

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

    const originalAuthRegister = plugin.controllers.auth.register.bind(
        plugin.controllers.auth
    );
    plugin.controllers.auth.register = async (ctx) => {
        const token = ctx.request.body?.recaptchaToken;
        if (token && !(await verifyRecaptcha(token))) {
            return ctx.badRequest("reCAPTCHA failed", {
                error: "browser-error",
            });
        }
        return originalAuthRegister(ctx);
    };

    const originalAuthCallback = plugin.controllers.auth.callback.bind(
        plugin.controllers.auth
    );
    plugin.controllers.auth.callback = async (ctx) => {
        const provider = ctx.params?.provider ?? "local";
        const token = ctx.request.body?.recaptchaToken;
        if (provider === "local" && token) {
            if (!(await verifyRecaptcha(token))) {
                return ctx.badRequest("reCAPTCHA failed", {
                    error: "browser-error",
                });
            }
        }
        return originalAuthCallback(ctx);
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
