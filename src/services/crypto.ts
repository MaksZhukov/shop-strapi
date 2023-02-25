import crypto from "crypto";

const algorithm = strapi.config.get("server.cryptoAlgorithm");
const key = strapi.config.get("server.cryptoKey");
const iv = strapi.config.get("server.cryptoIV");

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    return encrypted;
};

export const decrypt = (val: string) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted =
        decipher.update(val, "hex", "utf8") + decipher.final("utf8");
    return JSON.parse(decrypted);
};
