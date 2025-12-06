import { Strapi } from "@strapi/strapi";

// Category mappings with kind spare part IDs
// Updated based on all 1138 kind spare parts from the API
const categoryMappings = {
    Двигатель: [
        21, 110, 123, 134, 137, 145, 155, 157, 160, 161, 162, 169, 170, 171,
        174, 186, 202, 203, 208, 209, 215, 219, 220, 232, 238, 242, 243, 251,
        258, 259, 260, 273, 280, 287, 289, 292, 293, 295, 297, 531, 535, 538,
        540, 602, 641, 644, 825, 831, 833, 1165, 1207, 1272, 1293, 1311, 1454,
        1456, 1561, 1585, 1601, 1615, 1625, 1664, 1693, 1696, 1745, 1750, 1881,
        1913, 1921, 1947, 1948, 1949, 1962, 1964, 1965, 2001, 2149, 2150, 2191,
        2232, 2274, 2289, 2294, 2307,
    ],
    "Колесные диски": [304, 305, 306, 307, 308, 409, 1337, 1338, 1339, 1347],
    "Кузовные элементы": [
        12, 13, 14, 15, 16, 17, 18, 89, 148, 191, 254, 360, 368, 369, 377, 378,
        379, 380, 381, 382, 384, 385, 389, 395, 397, 400, 404, 405, 406, 407,
        408, 410, 415, 423, 428, 429, 432, 439, 440, 441, 443, 444, 445, 452,
        453, 454, 455, 456, 458, 462, 465, 466, 474, 476, 477, 478, 479, 480,
        481, 484, 485, 486, 487, 488, 489, 491, 492, 493, 494, 497, 499, 501,
        505, 506, 517, 518, 527, 542, 543, 544, 545, 546, 549, 551, 554, 555,
        570, 585, 589, 591, 592, 593, 594, 595, 596, 606, 607, 608, 609, 618,
        623, 624, 625, 626, 627, 628, 629, 630, 638, 639, 646, 647, 648, 653,
        707, 709, 719, 732, 751, 752, 788, 845, 847, 848, 850, 853, 865, 873,
        885, 886, 936, 937, 979, 980, 981, 982, 985, 987, 988, 999, 1002, 1052,
        1054, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1065, 1066, 1067, 1068,
        1069, 1070, 1091, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113,
        1114, 1143, 1150, 1151, 1162, 1232, 1233, 1267, 1299, 1309, 1414, 1421,
        1432, 1442, 1443, 1445, 1446, 1615, 1633, 1635, 1702, 1722, 1723, 1771,
        1772, 1787, 1789, 1801, 1807, 1808, 1817, 1818, 1827, 1884, 1934, 1938,
        1939, 1941, 1942, 2009, 2011, 2013, 2043, 2044, 2077, 2078, 2079, 2081,
        2082, 2083, 2084, 2086, 2099, 2144, 2152, 2175, 2190, 2250, 2255, 2257,
        2261, 2262, 2265, 2281, 2285, 2288, 2293, 2300, 2301, 2302, 2303, 2305,
        2309, 2310, 2311, 2312,
    ],
    Стекла: [
        64, 65, 66, 67, 159, 163, 310, 356, 361, 404, 405, 406, 407, 408, 413,
        435, 436, 452, 453, 470, 478, 479, 480, 481, 491, 492, 493, 494, 497,
        499, 501, 505, 506, 517, 518, 530, 533, 534, 542, 543, 544, 545, 572,
        573, 574, 595, 596, 616, 617, 625, 626, 627, 628, 629, 649, 669, 670,
        678, 679, 885, 886, 956, 960, 977, 979, 980, 981, 982, 1009, 1010, 1011,
        1012, 1013, 1043, 1045, 1057, 1058, 1059, 1060, 1090, 1094, 1123, 1129,
        1130, 1131, 1132, 1133, 1135, 1136, 1143, 1207, 1223, 1234, 1235, 1236,
        1237, 1238, 1239, 1242, 1243, 1244, 1261, 1262, 1263, 1264, 1268, 1273,
        1401, 1505, 1509, 1512, 1568, 1576, 1577, 1633, 1735, 1763, 1766, 1782,
        1784, 1785, 1786, 1797, 1827, 1870, 1871, 1872, 1873, 1934, 1970, 1990,
        2017, 2043, 2044, 2064, 2071, 2078, 2088, 2101, 2115, 2118, 2176, 2183,
        2190, 2203, 2240, 2241, 2248, 2268, 2276, 2285, 2293, 2305,
    ],
    Оптика: [
        116, 635, 636, 656, 660, 668, 687, 688, 693, 706, 708, 710, 711, 712,
        713, 721, 722, 723, 724, 725, 728, 1002, 1091, 1092, 1141, 1675, 1676,
        1688, 2086, 2115, 2118, 2119, 2222, 2224,
    ],
    Подвеска: [
        288, 290, 291, 360, 361, 362, 563, 606, 607, 608, 609, 719, 752, 802,
        803, 804, 805, 806, 807, 809, 810, 840, 847, 848, 850, 853, 854, 855,
        860, 861, 869, 877, 878, 888, 889, 890, 892, 893, 894, 896, 897, 899,
        904, 905, 907, 908, 909, 914, 940, 941, 1118, 1172, 1392, 1393, 1441,
        1536, 1537, 1571, 1681, 1728, 1906, 2102, 2103, 2167, 2175, 2198, 2207,
        2252,
    ],
    "Тормозная система": [
        673, 849, 1076, 1078, 1118, 1318, 1319, 1320, 1321, 1325, 1331, 1332,
        1334, 1335, 1337, 1338, 1339, 1346, 1347, 1348, 1354, 1358, 1361, 1373,
        1376, 1377, 1378, 1379, 1383, 1387, 1521, 1611, 1755, 1802, 2037, 2090,
        2196, 2258, 2271, 2314,
    ],
    "Рулевое управление": [
        923, 932, 933, 940, 941, 942, 945, 946, 949, 950, 953, 955, 967, 1098,
        1622, 2245,
    ],
    "Система кондиционирования": [
        394, 502, 565, 637, 733, 734, 735, 739, 742, 747, 752, 764, 770, 776,
        1081, 1897, 1922, 1965,
    ],
    Трансмиссия: [
        272, 409, 498, 671, 704, 844, 946, 953, 966, 1111, 1165, 1316, 1394,
        1400, 1409, 1411, 1415, 1421, 1426, 1427, 1430, 1435, 1436, 1438, 1439,
        1443, 1445, 1451, 1454, 1456, 1459, 1460, 1475, 1479, 1480, 1481, 1487,
        1489, 1490, 1492, 1495, 1497, 1511, 1561, 1668, 1728, 1994, 2013, 2153,
        2175, 2252, 2279, 2286, 2299, 2313,
    ],
    Электроника: [
        23, 40, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 79, 84, 106, 108,
        128, 130, 131, 134, 136, 137, 138, 139, 140, 143, 150, 152, 156, 158,
        159, 163, 165, 185, 205, 209, 252, 318, 319, 321, 329, 330, 337, 340,
        347, 348, 351, 359, 364, 365, 430, 508, 565, 575, 576, 578, 579, 580,
        582, 638, 639, 660, 663, 706, 733, 739, 777, 924, 925, 927, 932, 933,
        967, 975, 977, 978, 984, 991, 992, 993, 994, 995, 996, 997, 1000, 1001,
        1007, 1009, 1010, 1011, 1012, 1013, 1015, 1134, 1139, 1154, 1157, 1201,
        1204, 1225, 1226, 1267, 1268, 1279, 1285, 1286, 1288, 1308, 1322, 1325,
        1329, 1331, 1332, 1334, 1335, 1346, 1400, 1404, 1534, 1540, 1541, 1543,
        1550, 1568, 1575, 1586, 1587, 1591, 1594, 1597, 1599, 1605, 1610, 1627,
        1630, 1631, 1640, 1644, 1647, 1649, 1654, 1655, 1656, 1657, 1661, 1769,
        1777, 1781, 1782, 1784, 1785, 1786, 1826, 1868, 1870, 1871, 1872, 1873,
        1875, 1877, 1881, 1915, 1970, 1971, 1973, 1974, 1975, 2126, 2151, 2152,
        2153, 2183, 2193, 2218, 2245, 2267, 2269, 2271, 2277, 2280, 2284, 2287,
        2292, 2306,
    ],
};

/**
 * Populate catalog with categorized kind spare parts
 * This function creates the catalog single type with all categories only if it's empty
 */
export const populateCatalog = async ({ strapi }: { strapi: Strapi }) => {
    try {
        // Check if catalog exists and has data
        let existingCatalog;
        try {
            existingCatalog = await strapi.entityService.findOne(
                "api::catalog.catalog",
                null,
                {
                    populate: ["categories.kindSpareParts"],
                }
            );
        } catch (error) {
            // Catalog doesn't exist yet
            existingCatalog = null;
        }

        // If catalog exists and has categories, skip population
        if (
            existingCatalog &&
            existingCatalog.categories &&
            existingCatalog.categories.length > 0
        ) {
            console.log("ℹ️  Catalog already populated, skipping...");
            return;
        }

        // First, get all existing kind spare part IDs from the database
        const allKindSpareParts = await strapi.entityService.findMany(
            "api::kind-spare-part.kind-spare-part",
            {
                fields: ["id"],
            }
        );
        const existingIds = new Set(
            allKindSpareParts.map((item: any) => item.id)
        );

        // Filter categories to only include IDs that exist in the database
        const categories = Object.entries(categoryMappings)
            .map(([name, ids]) => {
                const validIds = ids.filter((id) => existingIds.has(id));
                if (validIds.length === 0) {
                    console.warn(
                        `⚠️  Category "${name}" has no valid kind spare part IDs, skipping...`
                    );
                    return null;
                }
                if (validIds.length < ids.length) {
                    const missingCount = ids.length - validIds.length;
                    console.warn(
                        `⚠️  Category "${name}": ${missingCount} kind spare part ID(s) not found in database, using ${validIds.length} valid IDs`
                    );
                }
                return {
                    name,
                    kindSpareParts: validIds,
                };
            })
            .filter((cat) => cat !== null) as Array<{
            name: string;
            kindSpareParts: number[];
        }>;

        if (categories.length === 0) {
            console.error("❌ No valid categories to populate");
            return;
        }

        // Create or update catalog (update if exists but empty, create if doesn't exist)
        if (existingCatalog) {
            // Update existing but empty catalog
            await strapi.entityService.update(
                "api::catalog.catalog",
                existingCatalog.id,
                {
                    data: {
                        categories,
                    },
                    populate: ["categories.kindSpareParts"],
                }
            );
            console.log("✅ Catalog populated successfully");
        } else {
            // Create new catalog
            await strapi.entityService.create("api::catalog.catalog", {
                data: {
                    categories,
                },
                populate: ["categories.kindSpareParts"],
            });
            console.log("✅ Catalog created and populated successfully");
        }

        const totalKindSpareParts = categories.reduce(
            (sum, cat) => sum + cat.kindSpareParts.length,
            0
        );
        console.log(
            `📊 Catalog populated: ${categories.length} categories, ${totalKindSpareParts} kind spare parts`
        );
    } catch (error) {
        console.error("❌ Error populating catalog:", error);
        // Don't throw error to prevent Strapi from failing to start
    }
};
