import { factories } from "@strapi/strapi";

const SEPARATOR = " ";
const APPEND_AFTER = "запчасти";

type SeoFields = {
    title: string;
    description: string;
    h1: string;
};

/** Mirrors src/services/index.ts generateDefaultBrandSnippets */
const generateDefaultBrandSnippets = (
    type: string,
    name: string
): SeoFields => ({
    title: `Купить ${type} для ${name}. Доставка. Цены не кусаются`,
    description: `Предлагаем купить ${type} для ${name} в нашем магазине. Диски, салоны, запчасти. На нашей разборке найдется все для вашего авто`,
    h1: `${type.charAt(0).toUpperCase() + type.slice(1)} для ${name}`,
});

/** Mirrors src/services/index.ts generateDefaultModelSnippets */
const generateDefaultModelSnippets = (
    type: string,
    brandName: string,
    modelName: string
): SeoFields => ({
    title: `${
        type.charAt(0).toUpperCase() + type.slice(1)
    } для ${brandName} ${modelName} б/у купить с доставкой по Беларуси`,
    description: `Ищете как можно ${type} для ${brandName} ${modelName} б/у купить выгодно? У нас топ цены, доставка, покупка онлайн на сайте. Огромный выбор`,
    h1: `${
        type.charAt(0).toUpperCase() + type.slice(1)
    } для ${brandName} ${modelName}`,
});

type CategoryEntry = {
    title: string;
    description: string;
    h1: string;
};

type BrandEntity = {
    name: string;
    seoSpareParts?: SeoFields | null;
};

type ModelEntity = {
    name: string;
    brand?: { name: string };
    seoSpareParts?: SeoFields | null;
};

type GenerationEntity = {
    name: string;
    brand?: { name: string };
    model?: ModelEntity;
};

const joinParts = (...parts: (string | undefined | null)[]) =>
    parts.filter(Boolean).join(SEPARATOR);

/** Mirrors shop/src/entities/kindSparePart/kindSparePartUtils.ts */
const withKindSparePart = (
    seo: SeoFields,
    appendAfter: string,
    kindSparePart?: string
): SeoFields => {
    if (!kindSparePart) {
        return seo;
    }

    const arrH1 = seo.h1.split(" ");
    const arrTitle = seo.title.split(" ");
    const arrDescription = seo.description.split(" ");

    arrH1.splice(1, 0, kindSparePart);
    arrTitle.splice(
        arrTitle.findIndex((item) => item.toLowerCase() === appendAfter) + 1,
        0,
        kindSparePart
    );
    arrDescription.splice(
        arrDescription.findIndex((item) => item.toLowerCase() === appendAfter) +
            1,
        0,
        kindSparePart
    );

    return {
        title: arrTitle.join(" "),
        description: arrDescription.join(" "),
        h1: arrH1.join(" "),
    };
};

/** Mirrors shop/src/entities/generation/generationUtils.ts */
const withGeneration = (
    seo: SeoFields,
    replace: string,
    generation?: string
): SeoFields => {
    if (!generation) {
        return seo;
    }

    const replacement = `${replace} ${generation}`;

    return {
        ...seo,
        h1: seo.h1.replace(replace, replacement),
        title: seo.title.replace(replace, replacement),
        description: seo.description.replace(replace, replacement),
    };
};

const getBrandSeo = (brand: BrandEntity): SeoFields =>
    brand.seoSpareParts ?? generateDefaultBrandSnippets(APPEND_AFTER, brand.name);

const getModelSeo = (model: ModelEntity): SeoFields | null => {
    if (!model.brand?.name) {
        return null;
    }

    return (
        model.seoSpareParts ??
        generateDefaultModelSnippets(
            APPEND_AFTER,
            model.brand.name,
            model.name
        )
    );
};

const getGenerationSeo = (
    brandName: string,
    model: ModelEntity,
    generationName: string
): SeoFields | null => {
    const modelSeo = getModelSeo(model);

    if (!modelSeo) {
        return null;
    }

    return withGeneration(
        modelSeo,
        `${brandName} ${model.name}`,
        generationName
    );
};

const addUnique = (
    set: Set<string>,
    rows: CategoryEntry[],
    format: string,
    path: string,
    seo: SeoFields
) => {
    const key = `${format}\0${path}`;
    if (!set.has(key)) {
        set.add(key);
        rows.push({
            title: seo.title,
            description: seo.description,
            h1: seo.h1,
        });
    }
};

export default factories.createCoreService(
    "plugin::internal.data",
    function () {
        return {
            async buildCategoryPaths(): Promise<CategoryEntry[]> {
                const unique = new Set<string>();
                const rows: CategoryEntry[] = [];

                const [brands, models, generations, kindSpareParts] =
                    await Promise.all([
                        strapi.db.query("api::brand.brand").findMany({
                            select: ["name"],
                            populate: { seoSpareParts: true },
                        }),
                        strapi.db.query("api::model.model").findMany({
                            select: ["name"],
                            populate: {
                                brand: { select: ["name"] },
                                seoSpareParts: true,
                            },
                        }),
                        strapi.db.query("api::generation.generation").findMany({
                            select: ["name"],
                            populate: {
                                brand: { select: ["name"] },
                                model: {
                                    select: ["name"],
                                    populate: { seoSpareParts: true },
                                },
                            },
                        }),
                        strapi.db
                            .query("api::kind-spare-part.kind-spare-part")
                            .findMany({ select: ["name"] }),
                    ]);

                brands.forEach((brand: BrandEntity) => {
                    addUnique(
                        unique,
                        rows,
                        "марка",
                        brand.name,
                        getBrandSeo(brand)
                    );
                });

                models.forEach((model: ModelEntity) => {
                    if (!model.brand?.name) return;

                    const modelSeo = getModelSeo(model);
                    if (!modelSeo) return;

                    addUnique(
                        unique,
                        rows,
                        "Марка - модель",
                        joinParts(model.brand.name, model.name),
                        modelSeo
                    );
                });

                generations.forEach((generation: GenerationEntity) => {
                    if (
                        !generation.brand?.name ||
                        !generation.model?.name
                    ) {
                        return;
                    }

                    const generationSeo = getGenerationSeo(
                        generation.brand.name,
                        generation.model,
                        generation.name
                    );

                    if (!generationSeo) return;

                    addUnique(
                        unique,
                        rows,
                        "Марка - модель - поколение",
                        joinParts(
                            generation.brand.name,
                            generation.model.name,
                            generation.name
                        ),
                        generationSeo
                    );
                });

                const modelsByBrand = new Map<string, ModelEntity[]>();
                models.forEach((model: ModelEntity) => {
                    if (!model.brand?.name) return;
                    const list = modelsByBrand.get(model.brand.name) ?? [];
                    list.push(model);
                    modelsByBrand.set(model.brand.name, list);
                });

                const generationsByBrandModel = new Map<
                    string,
                    { name: string; model: ModelEntity }[]
                >();
                generations.forEach((generation: GenerationEntity) => {
                    if (
                        !generation.brand?.name ||
                        !generation.model?.name
                    ) {
                        return;
                    }

                    const key = `${generation.brand.name}\0${generation.model.name}`;
                    const list = generationsByBrandModel.get(key) ?? [];
                    list.push({
                        name: generation.name,
                        model: generation.model,
                    });
                    generationsByBrandModel.set(key, list);
                });

                kindSpareParts.forEach((kind: { name: string }) => {
                    brands.forEach((brand: BrandEntity) => {
                        addUnique(
                            unique,
                            rows,
                            "Вид запчасти - марка",
                            joinParts(kind.name, brand.name),
                            withKindSparePart(
                                getBrandSeo(brand),
                                APPEND_AFTER,
                                kind.name
                            )
                        );

                        const brandModels = modelsByBrand.get(brand.name) ?? [];
                        brandModels.forEach((model) => {
                            const modelSeo = getModelSeo(model);
                            if (!modelSeo) return;

                            addUnique(
                                unique,
                                rows,
                                "Вид запчасти - марка - модель",
                                joinParts(kind.name, brand.name, model.name),
                                withKindSparePart(
                                    modelSeo,
                                    APPEND_AFTER,
                                    kind.name
                                )
                            );

                            const brandModelGenerations =
                                generationsByBrandModel.get(
                                    `${brand.name}\0${model.name}`
                                ) ?? [];

                            brandModelGenerations.forEach((generation) => {
                                const generationSeo = getGenerationSeo(
                                    brand.name,
                                    generation.model,
                                    generation.name
                                );

                                if (!generationSeo) return;

                                const pathWithGeneration = joinParts(
                                    kind.name,
                                    brand.name,
                                    model.name,
                                    generation.name
                                );
                                const kindGenerationSeo = withKindSparePart(
                                    generationSeo,
                                    APPEND_AFTER,
                                    kind.name
                                );

                                addUnique(
                                    unique,
                                    rows,
                                    "Вид запчасти - марка - модель - поколение",
                                    pathWithGeneration,
                                    kindGenerationSeo
                                );

                                addUnique(
                                    unique,
                                    rows,
                                    "Вид запчасти - марка - модель - поколение -",
                                    pathWithGeneration + SEPARATOR,
                                    kindGenerationSeo
                                );
                            });
                        });
                    });
                });

                return rows.sort((a, b) => a.h1.localeCompare(b.h1, "ru"));
            },

            async generateCatalogJson() {
                const data = await this.buildCategoryPaths();
                return JSON.stringify(data, null, 2);
            },
        };
    }
);
