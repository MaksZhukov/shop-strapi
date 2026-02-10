const RECAPTCHA_SCORE_THRESHOLD = 0.5;
const URL = "https://www.google.com/recaptcha/api/siteverify";

export const verifyRecaptcha = async (
    token: string | undefined
): Promise<boolean> => {
    if (!token) return false;
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) return false;
    const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }).toString(),
    });
    const data = (await response.json()) as {
        success?: boolean;
        score?: number;
    };
    if (!data.success) return false;
    // v3 returns score; v2 does not — treat missing score as pass when success
    const score = data.score ?? 1;
    return score > RECAPTCHA_SCORE_THRESHOLD;
};
