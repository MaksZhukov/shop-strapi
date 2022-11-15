/**
 * currency-freaks service.
 */
import { Agent } from "https";
import fs from "fs";
import axios from "axios";

const SIX_HOURS_MS = 12 * 60 * 60 * 1000;
// It stores in dist folder
const PATH_TO_CURRENCY_FILE = __dirname + "/currency.json";

let currency = {
    coefficient: 0,
    date: new Date(new Date().getTime() - SIX_HOURS_MS).toString(),
};

try {
    currency = JSON.parse(
        fs.readFileSync(PATH_TO_CURRENCY_FILE, { encoding: "utf8" })
    ) as {
        coefficient: number;
        date: string;
    };
} catch (err) {
    // console.warn(err);
}

export default ({ strapi }) => {
    let key = strapi.config.get("api.currency-freaks-key");

    const isReadyToFetch = () =>
        new Date(currency.date).getTime() + SIX_HOURS_MS <=
        new Date().getTime();

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
            currency.coefficient = 1 / BYN;
            currency.date = new Date().toString();
            fs.writeFileSync(PATH_TO_CURRENCY_FILE, JSON.stringify(currency));
        } catch (err) {
            console.log(err);
        }
    };

    if (isReadyToFetch()) {
        fetchCoefficient();
    }

    setInterval(() => {
        if (isReadyToFetch()) {
            fetchCoefficient();
        }
    }, 60 * 60 * 1000);
    return {
        getCoefficient: () => currency.coefficient,
    };
};
