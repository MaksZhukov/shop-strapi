const AUTH_COOKIE_NAME = "token";
const AUTH_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;

export default (config, { strapi }) => {
    return async (ctx, next) => {
        const cookieToken = ctx.cookies.get(AUTH_COOKIE_NAME);
        const existingAuth = ctx.request.headers?.authorization;
        if (cookieToken && !existingAuth) {
            ctx.request.headers.authorization = `Bearer ${cookieToken}`;
        }
        await next();
        if (
            ctx.url.endsWith("/auth/local") &&
            ctx.method === "POST" &&
            ctx.status === 200
        ) {
            const { jwt } = ctx.body;
            if (jwt) {
                ctx.cookies.set(AUTH_COOKIE_NAME, jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: AUTH_COOKIE_MAX_AGE,
                    domain: process.env.COOKIE_DOMAIN || "localhost",
                    path: "/",
                    sameSite: "lax",
                });
            }
        }
        if (ctx.url.includes("/auth/logout")) {
            ctx.cookies.set(AUTH_COOKIE_NAME, null);
        }
    };
};
