
/*
 *
 * ============================================================
 * WARNING: THIS FILE HAS BEEN COMMENTED OUT
 * ============================================================
 *
 * CONTEXT:
 *
 * The lifecycles.js file has been commented out to prevent unintended side effects when starting Strapi 5 for the first time after migrating to the document service.
 *
 * STRAPI 5 introduces a new document service that handles lifecycles differently compared to previous versions. Without migrating your lifecycles to document service middlewares, you may experience issues such as:
 *
 * - `unpublish` actions triggering `delete` lifecycles for every locale with a published entity, which differs from the expected behavior in v4.
 * - `discardDraft` actions triggering both `create` and `delete` lifecycles, leading to potential confusion.
 *
 * MIGRATION GUIDE:
 *
 * For a thorough guide on migrating your lifecycles to document service middlewares, please refer to the following link:
 * [Document Services Middlewares Migration Guide](https://docs.strapi.io/dev-docs/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service)
 *
 * IMPORTANT:
 *
 * Simply uncommenting this file without following the migration guide may result in unexpected behavior and inconsistencies. Ensure that you have completed the migration process before re-enabling this file.
 *
 * ============================================================
 */

// import slugify from "slugify";
// import { lifecycleSitemap } from "../../../../lifecycles";
// import {
//     generateDefaultBrandSnippets,
//     generateDefaultBrandTextComponent,
// } from "../../../../services";
// 
// export default {
//     beforeCreate(event) {
//         const { data } = event.params;
//         if (data.name) {
//             data.slug = slugify(data.name, { lower: true, strict: true });
//         }
//     },
//     afterCreate: (event) => {
//         strapi.entityService.update("api::brand.brand", event.result.id, {
//             data: {
//                 seoSpareParts: generateDefaultBrandSnippets(
//                     "запчасти",
//                     event.result.name
//                 ),
//                 seoCabins: generateDefaultBrandSnippets(
//                     "салоны",
//                     event.result.name
//                 ),
//                 seoWheels: generateDefaultBrandSnippets(
//                     "диски",
//                     event.result.name
//                 ),
//                 productBrandTexts: {
//                     sparePartBrandText: generateDefaultBrandTextComponent(
//                         event.result,
//                         "Запчасти",
//                         "spare-parts"
//                     ),
//                     cabinTextBrand: generateDefaultBrandTextComponent(
//                         event.result,
//                         "Салоны",
//                         "cabins"
//                     ),
//                     wheelTextBrand: generateDefaultBrandTextComponent(
//                         event.result,
//                         "Диски",
//                         "wheels"
//                     ),
//                 },
//             } as any,
//         });
//         lifecycleSitemap();
//     },
//     afterUpdate: lifecycleSitemap,
//     afterDelete: lifecycleSitemap,
// };
// 