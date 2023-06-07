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
        <currencies>
            <currency id="BYN" rate="1"/>
        </currencies>
        <categories>
${CATEGORIES_TEXTS.map(
    (item, i) => `\t<category id="${i}">${item}</category>\n`
).join("")}
        </categories>
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
                \t<categoryId>${CATEGORIES.findIndex(
                    (cat) => cat === item.type
                )}</categoryId>          
                \t<picture>${
                    item.images
                        ? serverUrl + item.images[0].url
                        : clientUrl + "/logo.jpg"
                }</picture>               
                \t<description>${
                    item.description
                }</description>                           
            \t</offer>\n\t`
            )
            .join("")}
        </offers>
    </shop>
</yml_catalog>`;
