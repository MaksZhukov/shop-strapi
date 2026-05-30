const AUTH_COOKIE_NAME = "token";
const AUTH_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;

const getAuthCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    domain: process.env.COOKIE_DOMAIN,
    path: "/",
    sameSite: "none" as const,
});

export default (config, { strapi }) => {
    return async (ctx, next) => {
        const cookieToken = ctx.cookies.get(AUTH_COOKIE_NAME);
        const existingAuth = ctx.request.headers?.authorization;
        if (cookieToken && !existingAuth) {
            ctx.request.headers.authorization = `Bearer ${cookieToken}`;
        }
        await next();
        const shouldSetAuthCookie =
            ctx.url.endsWith("/auth/local") && ctx.method === "POST";

        if (shouldSetAuthCookie && ctx.status === 200) {
            const { jwt } = ctx.body ?? {};
            if (jwt) {
                ctx.cookies.set(AUTH_COOKIE_NAME, jwt, {
                    ...getAuthCookieOptions(),
                    maxAge: AUTH_COOKIE_MAX_AGE,
                });
            }
        }
        const shouldClearAuthCookie =
            ctx.url.includes("/auth/logout") &&
            ctx.method === "POST" &&
            ctx.status === 200;

        if (shouldClearAuthCookie) {
            ctx.cookies.set(AUTH_COOKIE_NAME, null, getAuthCookieOptions());
        }
    };
};
