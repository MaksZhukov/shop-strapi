import { getProductUrl } from "..";
import { CATEGORIES, CATEGORIES_TEXTS } from "./constants";

export const template = (
    products: any[],
    serverUrl: string,
    clientUrl: string
) => `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString()}">
    <shop>
        <name>Razbor auto</name>
        <company>Razbor auto</company>
        <url>https://razbor-auto.by/</url>
        <offers>
        ${products
            .map(
                (item) => `\t<offer available="true" id="${
                    item.id +
                    "-" +
                    CATEGORIES.findIndex((cat) => cat === item.type)
                }">
                \t<name>${item.h1}</name>
                \t<price>${item.price}</price>     
                \t<picture>${
                    item.images
                        ? serverUrl + item.images[0].url
                        : clientUrl + "/logo.jpg"
                }</picture>               
                \t<description>${
                    item.description
                } ${getProductUrl(item)}</description>                           
            \t</offer>\n\t`
            )
            .join("")}
        </offers>
    </shop>
</yml_catalog>`;
