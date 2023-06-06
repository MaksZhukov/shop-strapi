export const template = (
    categories: any[],
    products: any[],
    serverUrl: string
) => `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toString()}">
    <shop>
        <name>Разбор авто</name>
        <company>Разбор авто</company>
        <url>https://razbor-auto.by/</url>
        <version>1.0</version>
        <email>driblingavto@mail.ru</email>
        <categories>
            ${categories.map(
                (item) => `<category id="1">${item.name}</category>\n\t\t\t`
            )}
        </categories>
        <offers>
        ${products
            .map(
                (item) => `<offer id="${item.id + "-" + item.type}">
        <name>${item.h1}</name>
        <vendor>${item.brand.name}</vendor>              
        <picture>${
            item.images ? serverUrl + item.images[0].url : ""
        }</picture>               
        <description>
           ${item.description}
        </description>                                       
        </offer>\n\t\t\t`
            )
            .toString()}
        </offers>
    </shop>
</yml_catalog>`;
