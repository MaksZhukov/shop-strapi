/**
 * currency-freaks service.
 */
import { Agent } from "https";
import axios from "axios";

export default ({ strapi }) => {
    let coefficient = 0;

    let key = strapi.config.get("api.currency-freaks-key");

    const fetchCoefficient = async () => {
        try {
            const {
                data: {
                    rates: { BYN },
                },
            } = await axios.get(
                `https://api.currencyfreaks.com/latest?apikey=${key}&symbols=BYN`,
                { httpsAgent: new Agent({ rejectUnauthorized: false }) }
            );
            coefficient = 1 / BYN;
        } catch (err) {
            console.log(err);
        }
    };

    fetchCoefficient();

    setInterval(() => {
        fetchCoefficient();
    }, 60 * 60 * 1000);

    return {
        getCoefficient: () => coefficient,
    };
};
