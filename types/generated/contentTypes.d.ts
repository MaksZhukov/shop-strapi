import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginInternalData extends Schema.SingleType {
  collectionName: 'internal_data';
  info: {
    singularName: 'data';
    pluralName: 'datas';
    displayName: 'Data';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: true;
    };
    'content-type-builder': {
      visible: true;
    };
  };
  attributes: {
    dateNewProductSentToEmail: Attribute.DateTime;
    dateProductsInCsvSentToEmail: Attribute.DateTime;
    dateProductFullDescriptionGenerated: Attribute.DateTime;
    dateYMLSentToEmail: Attribute.DateTime;
    currencyDate: Attribute.DateTime;
    bePaidTestMode: Attribute.Boolean & Attribute.DefaultTo<false>;
    currencyCoefficient: Attribute.Component<'general.currency'>;
    dateUpdatingImagesMetadata: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::internal.data',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::internal.data',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    phone: Attribute.String;
    address: Attribute.String;
    shoppingCartItems: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::shopping-cart.shopping-cart'
    >;
    favorites: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::favorite.favorite'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.UID<'api::article.article', 'name'>;
    mainImage: Attribute.Media;
    rightText: Attribute.RichText;
    images1: Attribute.Media;
    content1: Attribute.RichText;
    images2: Attribute.Media;
    content2: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAutocomisAutocomis extends Schema.CollectionType {
  collectionName: 'autocomises';
  info: {
    singularName: 'autocomis';
    pluralName: 'autocomises';
    displayName: 'Autocomises';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    image: Attribute.Media;
    description: Attribute.RichText;
    slug: Attribute.UID<'api::autocomis.autocomis', 'name'>;
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::autocomis.autocomis',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::autocomis.autocomis',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBrandBrand extends Schema.CollectionType {
  collectionName: 'brands';
  info: {
    singularName: 'brand';
    pluralName: 'brands';
    displayName: 'Brand';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    models: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::model.model'
    >;
    cars: Attribute.Relation<'api::brand.brand', 'oneToMany', 'api::car.car'>;
    spareParts: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    wheels: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::wheel.wheel'
    >;
    image: Attribute.Media;
    cabins: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::cabin.cabin'
    >;
    seoCabins: Attribute.Component<'seo.seo'>;
    seoSpareParts: Attribute.Component<'seo.seo'>;
    seoWheels: Attribute.Component<'seo.seo'>;
    carsOnParts: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    slug: Attribute.UID<'api::brand.brand', 'name'>;
    productBrandTexts: Attribute.Component<'brand.brand-type-product-texts'>;
    generations: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::generation.generation'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCabinCabin extends Schema.CollectionType {
  collectionName: 'cabins';
  info: {
    singularName: 'cabin';
    pluralName: 'cabins';
    displayName: 'Cabin';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    model: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::model.model'
    >;
    brand: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::brand.brand'
    >;
    generation: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::generation.generation'
    >;
    seatUpholstery: Attribute.String;
    images: Attribute.Media;
    seo: Attribute.Component<'seo.seo'>;
    h1: Attribute.String;
    slug: Attribute.UID<'api::cabin.cabin', 'h1'>;
    kindSparePart: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::kind-spare-part.kind-spare-part'
    >;
    price: Attribute.Decimal;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Decimal;
    priceUSD: Attribute.Decimal;
    description: Attribute.Text;
    snippets: Attribute.Component<'product.snippets'>;
    type: Attribute.Enumeration<['cabin']> &
      Attribute.Required &
      Attribute.DefaultTo<'cabin'>;
    year: Attribute.Integer;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    priceRUB: Attribute.Decimal;
    code: Attribute.BigInteger & Attribute.Unique;
    olem: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cabin.cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cabin.cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarCar extends Schema.CollectionType {
  collectionName: 'cars';
  info: {
    singularName: 'car';
    pluralName: 'cars';
    displayName: 'Car';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    images: Attribute.Media;
    brand: Attribute.Relation<'api::car.car', 'manyToOne', 'api::brand.brand'>;
    model: Attribute.Relation<'api::car.car', 'manyToOne', 'api::model.model'>;
    manufactureDate: Attribute.Date;
    deliveryDate: Attribute.Date;
    fuel: Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434'
      ]
    >;
    slug: Attribute.UID<'api::car.car', 'name'>;
    engine: Attribute.String;
    bodyStyle: Attribute.String;
    mileage: Attribute.Integer;
    generation: Attribute.Relation<
      'api::car.car',
      'manyToOne',
      'api::generation.generation'
    >;
    seo: Attribute.Component<'seo.seo'>;
    videoLink: Attribute.String;
    volume: Attribute.Relation<
      'api::car.car',
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
    transmission: Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440'
      ]
    >;
    name: Attribute.String;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::car.car', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::car.car', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCarOnPartsCarOnParts extends Schema.CollectionType {
  collectionName: 'cars_on_parts';
  info: {
    singularName: 'car-on-parts';
    pluralName: 'cars-on-parts';
    displayName: 'Car on parts';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    images: Attribute.Media;
    model: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::model.model'
    >;
    manufactureDate: Attribute.Date;
    deliveryDate: Attribute.Date;
    fuel: Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434'
      ]
    >;
    bodyStyle: Attribute.String;
    engine: Attribute.String;
    mileage: Attribute.Decimal;
    generation: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::generation.generation'
    >;
    slug: Attribute.UID<'api::car-on-parts.car-on-parts', 'bodyStyle'>;
    videoLink: Attribute.String;
    seo: Attribute.Component<'seo.seo'>;
    price: Attribute.Decimal;
    priceUSD: Attribute.Decimal;
    brand: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::brand.brand'
    >;
    description: Attribute.String;
    volume: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
    transmission: Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440'
      ]
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCatalogCatalog extends Schema.SingleType {
  collectionName: 'catalogs';
  info: {
    singularName: 'catalog';
    pluralName: 'catalogs';
    displayName: 'Catalog';
    description: 'Catalog with categorized kind spare parts';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    categories: Attribute.Component<'catalog.category', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::catalog.catalog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::catalog.catalog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEngineVolumeEngineVolume extends Schema.CollectionType {
  collectionName: 'engine_volumes';
  info: {
    singularName: 'engine-volume';
    pluralName: 'engine-volumes';
    displayName: 'Engine volume';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    cars: Attribute.Relation<
      'api::engine-volume.engine-volume',
      'oneToMany',
      'api::car.car'
    >;
    carsOnParts: Attribute.Relation<
      'api::engine-volume.engine-volume',
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    spareParts: Attribute.Relation<
      'api::engine-volume.engine-volume',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::engine-volume.engine-volume',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::engine-volume.engine-volume',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFavoriteFavorite extends Schema.CollectionType {
  collectionName: 'favorites';
  info: {
    singularName: 'favorite';
    pluralName: 'favorites';
    displayName: 'Favorite';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Attribute.Relation<
      'api::favorite.favorite',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    product: Attribute.DynamicZone<
      ['product.tire', 'product.wheel', 'product.spare-part']
    > &
      Attribute.SetMinMax<{
        max: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::favorite.favorite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::favorite.favorite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenerationGeneration extends Schema.CollectionType {
  collectionName: 'generations';
  info: {
    singularName: 'generation';
    pluralName: 'generations';
    displayName: 'Generation';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    spareParts: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    cars: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::car.car'
    >;
    model: Attribute.Relation<
      'api::generation.generation',
      'manyToOne',
      'api::model.model'
    >;
    cabins: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::cabin.cabin'
    >;
    cars_on_parts: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    brand: Attribute.Relation<
      'api::generation.generation',
      'manyToOne',
      'api::brand.brand'
    >;
    slug: Attribute.String;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generation.generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generation.generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKindSparePartKindSparePart extends Schema.CollectionType {
  collectionName: 'kind_spare_parts';
  info: {
    singularName: 'kind-spare-part';
    pluralName: 'kind-spare-parts';
    displayName: 'Kind spare part';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    spareParts: Attribute.Relation<
      'api::kind-spare-part.kind-spare-part',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    type: Attribute.Enumeration<['regular', 'cabin']> &
      Attribute.DefaultTo<'regular'>;
    cabins: Attribute.Relation<
      'api::kind-spare-part.kind-spare-part',
      'oneToMany',
      'api::cabin.cabin'
    >;
    slug: Attribute.UID<'api::kind-spare-part.kind-spare-part', 'name'>;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kind-spare-part.kind-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kind-spare-part.kind-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLayoutLayout extends Schema.SingleType {
  collectionName: 'layouts';
  info: {
    singularName: 'layout';
    pluralName: 'layouts';
    displayName: 'Layout';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    footer: Attribute.Component<'general.footer'>;
    videoWidget: Attribute.Component<'general.video-widget'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::layout.layout',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::layout.layout',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiModelModel extends Schema.CollectionType {
  collectionName: 'models';
  info: {
    singularName: 'model';
    pluralName: 'models';
    displayName: 'Model';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    brand: Attribute.Relation<
      'api::model.model',
      'manyToOne',
      'api::brand.brand'
    >;
    cars: Attribute.Relation<'api::model.model', 'oneToMany', 'api::car.car'>;
    spareParts: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    generations: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::generation.generation'
    >;
    wheels: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::wheel.wheel'
    >;
    cabins: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::cabin.cabin'
    >;
    cars_on_parts: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    seoSpareParts: Attribute.Component<'seo.seo'>;
    seoCabins: Attribute.Component<'seo.seo'>;
    seoWheels: Attribute.Component<'seo.seo'>;
    slug: Attribute.String;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::model.model',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::model.model',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'Order';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String;
    surname: Attribute.String;
    patronymic: Attribute.String;
    phone: Attribute.String;
    products: Attribute.DynamicZone<
      ['product.spare-part', 'product.tire', 'product.wheel', 'product.cabin']
    >;
    email: Attribute.String;
    transactionId: Attribute.String;
    address: Attribute.String;
    handled: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageAboutPageAbout extends Schema.SingleType {
  collectionName: 'page_abouts';
  info: {
    singularName: 'page-about';
    pluralName: 'page-abouts';
    displayName: 'Page about';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.short-seo'>;
    h1: Attribute.String;
    mainImageLeft: Attribute.Media;
    mainTextRight: Attribute.RichText;
    images1: Attribute.Media;
    whyNeedServicesTitle: Attribute.String;
    whyNeedServicesText: Attribute.RichText;
    images2: Attribute.Media;
    whyNeedServicesTextAfterImages2: Attribute.RichText;
    mainPrinciplesTitle: Attribute.String;
    mainPrinciplesTextLeft: Attribute.RichText;
    mainPrinciplesImageRight: Attribute.Media;
    images3: Attribute.Media;
    mainPrinciplesTextAfterImages3: Attribute.RichText;
    nuancesTitle: Attribute.String;
    nuancesText: Attribute.RichText;
    images4: Attribute.Media;
    pricesTitle: Attribute.String;
    pricesLeftImage: Attribute.Media;
    pricesRightText: Attribute.RichText;
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-about.page-about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-about.page-about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageArticlePageArticle extends Schema.SingleType {
  collectionName: 'page_articles';
  info: {
    singularName: 'page-article';
    pluralName: 'page-articles';
    displayName: 'Page articles';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-article.page-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-article.page-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageAutocomisPageAutocomis extends Schema.SingleType {
  collectionName: 'page_autocomises';
  info: {
    singularName: 'page-autocomis';
    pluralName: 'page-autocomises';
    displayName: 'Page autocomises';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-autocomis.page-autocomis',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-autocomis.page-autocomis',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageAwaitingCarPageAwaitingCar extends Schema.SingleType {
  collectionName: 'page_awaiting_cars';
  info: {
    singularName: 'page-awaiting-car';
    pluralName: 'page-awaiting-cars';
    displayName: 'Page awaiting cars';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-awaiting-car.page-awaiting-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-awaiting-car.page-awaiting-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageBuybackCarPageBuybackCar extends Schema.SingleType {
  collectionName: 'page_buyback_cars';
  info: {
    singularName: 'page-buyback-car';
    pluralName: 'page-buyback-cars';
    displayName: 'Page buyback cars';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    mainBackgroundImage: Attribute.Media;
    mainBackgroundLeftImage: Attribute.Media;
    h1: Attribute.String;
    weProvideTitle: Attribute.String;
    weProvide: Attribute.Component<'general.card', true> &
      Attribute.SetMinMax<{
        min: 3;
        max: 3;
      }>;
    purchasedCarsTitle: Attribute.String;
    advantagesTitle: Attribute.String;
    advantagesRightImage: Attribute.Media;
    advantages: Attribute.Text;
    buyAnyCarsTitle: Attribute.String;
    anyCarsAfter: Attribute.Component<'general.card', true> &
      Attribute.SetMinMax<{
        min: 6;
        max: 6;
      }>;
    sellCarTitle: Attribute.String;
    sellSteps: Attribute.Component<'general.card-without-image', true>;
    sellImage: Attribute.Media;
    applicationLeftText: Attribute.RichText;
    whyWeTitle: Attribute.String;
    whyWe: Attribute.Text;
    whyWeLeftImage: Attribute.Media;
    seo: Attribute.Component<'seo.short-seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-buyback-car.page-buyback-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-buyback-car.page-buyback-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageCabinPageCabin extends Schema.SingleType {
  collectionName: 'page_cabins';
  info: {
    singularName: 'page-cabin';
    pluralName: 'page-cabins';
    displayName: 'Page cabins';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-cabin.page-cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-cabin.page-cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageCarDismantlingPhotoPageCarDismantlingPhoto
  extends Schema.SingleType {
  collectionName: 'page_car_dismantling_photos';
  info: {
    singularName: 'page-car-dismantling-photo';
    pluralName: 'page-car-dismantling-photos';
    displayName: 'Page car dismantling photos';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    images: Attribute.Media;
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-car-dismantling-photo.page-car-dismantling-photo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-car-dismantling-photo.page-car-dismantling-photo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageCarsOnPartPageCarsOnPart extends Schema.SingleType {
  collectionName: 'page_cars_on_parts';
  info: {
    singularName: 'page-cars-on-part';
    pluralName: 'page-cars-on-parts';
    displayName: 'Page cars on parts';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-cars-on-part.page-cars-on-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-cars-on-part.page-cars-on-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageCompanyPhotoPageCompanyPhoto extends Schema.SingleType {
  collectionName: 'page_company_photos';
  info: {
    singularName: 'page-company-photo';
    pluralName: 'page-company-photos';
    displayName: 'Page company photos';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    images: Attribute.Media;
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-company-photo.page-company-photo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-company-photo.page-company-photo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageContactPageContact extends Schema.SingleType {
  collectionName: 'page_contacts';
  info: {
    singularName: 'page-contact';
    pluralName: 'page-contacts';
    displayName: 'Page contacts';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.short-seo'>;
    phone1: Attribute.String;
    phone2: Attribute.String;
    location: Attribute.String;
    askTitle: Attribute.String;
    askText: Attribute.RichText;
    content: Attribute.RichText;
    images: Attribute.Media;
    h1: Attribute.String;
    requisitesTitle: Attribute.String;
    requisites: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-contact.page-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-contact.page-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageDeliveryPageDelivery extends Schema.SingleType {
  collectionName: 'page_deliveries';
  info: {
    singularName: 'page-delivery';
    pluralName: 'page-deliveries';
    displayName: 'Page delivery';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.short-seo'>;
    h1: Attribute.String;
    mainImageLeft: Attribute.Media;
    mainTextRight: Attribute.RichText;
    images1: Attribute.Media;
    deliveryCitiesTitle: Attribute.String;
    deliveryCitiesDescription: Attribute.Component<
      'general.label-and-value',
      true
    >;
    courierTitle: Attribute.String;
    courierDescription: Attribute.Component<'general.label-and-value', true>;
    shipmentTitle: Attribute.String;
    shipmentText: Attribute.RichText;
    shipmentImageRight: Attribute.Media;
    images2: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-delivery.page-delivery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-delivery.page-delivery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageGuaranteePageGuarantee extends Schema.SingleType {
  collectionName: 'page_guarantees';
  info: {
    singularName: 'page-guarantee';
    pluralName: 'page-guarantees';
    displayName: 'Page guarantee';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.short-seo'>;
    h1: Attribute.String;
    mainLeftImage: Attribute.Media;
    mainRightText: Attribute.RichText;
    images1: Attribute.Media;
    guaranteeNotApplyTitle: Attribute.String;
    guaranteeNotApplyText: Attribute.RichText;
    images2: Attribute.Media;
    warningTitle: Attribute.String;
    warningLeftImage: Attribute.Media;
    warningRightText: Attribute.Text;
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-guarantee.page-guarantee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-guarantee.page-guarantee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageHowToGetToPageHowToGetTo extends Schema.SingleType {
  collectionName: 'page_how_to_get_tos';
  info: {
    singularName: 'page-how-to-get-to';
    pluralName: 'page-how-to-get-tos';
    displayName: 'Page how to get to';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    text: Attribute.RichText;
    video: Attribute.Media;
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-how-to-get-to.page-how-to-get-to',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-how-to-get-to.page-how-to-get-to',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageInstallmentPlanPageInstallmentPlan
  extends Schema.SingleType {
  collectionName: 'page_installment_plans';
  info: {
    singularName: 'page-installment-plan';
    pluralName: 'page-installment-plans';
    displayName: 'Page installment plan';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-installment-plan.page-installment-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-installment-plan.page-installment-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageMainPageMain extends Schema.SingleType {
  collectionName: 'page_mains';
  info: {
    singularName: 'page-main';
    pluralName: 'page-mains';
    displayName: 'Page main';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    autocomises: Attribute.Relation<
      'api::page-main.page-main',
      'oneToMany',
      'api::autocomis.autocomis'
    >;
    serviceStations: Attribute.Relation<
      'api::page-main.page-main',
      'oneToMany',
      'api::service-station.service-station'
    >;
    seo: Attribute.Component<'seo.short-seo'>;
    banner: Attribute.Media;
    h1: Attribute.String;
    subH1: Attribute.String;
    titleCategories: Attribute.String;
    categoryImages: Attribute.Media;
    popularBrandsTitle: Attribute.String;
    leftSideText: Attribute.RichText;
    videoUrl: Attribute.String;
    reviewsTitle: Attribute.String;
    benefitsTitle: Attribute.String;
    benefitsLeftText: Attribute.RichText;
    benefitsRightImage: Attribute.Media;
    blogTitle: Attribute.String;
    blogLeftText: Attribute.RichText;
    blogRightText: Attribute.RichText;
    deliveryTitle: Attribute.String;
    deliveryText: Attribute.RichText;
    bannerMobile: Attribute.Media;
    benefits: Attribute.Component<'general.link-and-image', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-main.page-main',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-main.page-main',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePaymentPagePayment extends Schema.SingleType {
  collectionName: 'page_payments';
  info: {
    singularName: 'page-payment';
    pluralName: 'page-payments';
    displayName: 'Page payment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: Attribute.RichText;
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-payment.page-payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-payment.page-payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageProductPageProduct extends Schema.SingleType {
  collectionName: 'page_products';
  info: {
    singularName: 'page-product';
    pluralName: 'page-products';
    displayName: 'Page product';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    whyWeBest: Attribute.Component<'general.link-and-image', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product.page-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-product.page-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageProductCabinPageProductCabin extends Schema.SingleType {
  collectionName: 'page_product_cabins';
  info: {
    singularName: 'page-product-cabin';
    pluralName: 'page-product-cabins';
    displayName: 'Page product cabin';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    textAfterDescription: Attribute.RichText;
    textAfterBenefits: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    additionalDescription: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-cabin.page-product-cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-product-cabin.page-product-cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageProductSparePartPageProductSparePart
  extends Schema.SingleType {
  collectionName: 'page_product_spare_parts';
  info: {
    singularName: 'page-product-spare-part';
    pluralName: 'page-product-spare-parts';
    displayName: 'Page product spare part';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    textAfterDescription: Attribute.RichText;
    textAfterBenefits: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    autoSynonyms: Attribute.String &
      Attribute.DefaultTo<'\u0430\u0432\u0442\u043E,\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F'>;
    additionalDescription: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-spare-part.page-product-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-product-spare-part.page-product-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageProductTirePageProductTire extends Schema.SingleType {
  collectionName: 'page_product_tires';
  info: {
    singularName: 'page-product-tire';
    pluralName: 'page-product-tires';
    displayName: 'Page product tire';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    textAfterDescription: Attribute.RichText;
    textAfterBenefits: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    additionalDescription: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-tire.page-product-tire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-product-tire.page-product-tire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageProductWheelPageProductWheel extends Schema.SingleType {
  collectionName: 'page_product_wheels';
  info: {
    singularName: 'page-product-wheel';
    pluralName: 'page-product-wheels';
    displayName: 'Page product wheel';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    textAfterDescription: Attribute.RichText;
    textAfterBenefits: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    additionalDescription: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-wheel.page-product-wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-product-wheel.page-product-wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageReviewPageReview extends Schema.SingleType {
  collectionName: 'page_reviews';
  info: {
    singularName: 'page-review';
    pluralName: 'page-reviews';
    displayName: 'Page reviews';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-review.page-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-review.page-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageServiceStationPageServiceStation
  extends Schema.SingleType {
  collectionName: 'page_service_stations';
  info: {
    singularName: 'page-service-station';
    pluralName: 'page-service-stations';
    displayName: 'Page service stations';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-service-station.page-service-station',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-service-station.page-service-station',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageSparePartPageSparePart extends Schema.SingleType {
  collectionName: 'page_spare_parts';
  info: {
    singularName: 'page-spare-part';
    pluralName: 'page-spare-parts';
    displayName: 'Page spare parts';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-spare-part.page-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-spare-part.page-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageTirePageTire extends Schema.SingleType {
  collectionName: 'page_tires';
  info: {
    singularName: 'page-tire';
    pluralName: 'page-tires';
    displayName: 'Page tires';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-tire.page-tire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-tire.page-tire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageVacancyPageVacancy extends Schema.SingleType {
  collectionName: 'page_vacancies';
  info: {
    singularName: 'page-vacancy';
    pluralName: 'page-vacancies';
    displayName: 'Page vacancies';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.short-seo'>;
    vacancies: Attribute.Component<'page-vacancies.vacancies', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-vacancy.page-vacancy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-vacancy.page-vacancy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageWheelPageWheel extends Schema.SingleType {
  collectionName: 'page_wheels';
  info: {
    singularName: 'page-wheel';
    pluralName: 'page-wheels';
    displayName: 'Page wheels';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-wheel.page-wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-wheel.page-wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReviewReview extends Schema.CollectionType {
  collectionName: 'reviews';
  info: {
    singularName: 'review';
    pluralName: 'reviews';
    displayName: 'Review';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    authorName: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    rating: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 5;
      }>;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceStationServiceStation extends Schema.CollectionType {
  collectionName: 'service_stations';
  info: {
    singularName: 'service-station';
    pluralName: 'service-stations';
    displayName: 'Service stations';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    image: Attribute.Media;
    description: Attribute.RichText;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::service-station.service-station', 'name'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-station.service-station',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-station.service-station',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShoppingCartShoppingCart extends Schema.CollectionType {
  collectionName: 'shopping_carts';
  info: {
    singularName: 'shopping-cart';
    pluralName: 'shopping-carts';
    displayName: 'Shopping cart';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Attribute.Relation<
      'api::shopping-cart.shopping-cart',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    product: Attribute.DynamicZone<
      ['product.spare-part', 'product.tire', 'product.wheel', 'product.cabin']
    > &
      Attribute.SetMinMax<{
        max: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shopping-cart.shopping-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shopping-cart.shopping-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSparePartSparePart extends Schema.CollectionType {
  collectionName: 'spare_parts';
  info: {
    singularName: 'spare-part';
    pluralName: 'spare-parts';
    displayName: 'Spare part';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text &
      Attribute.DefaultTo<'\u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u044C, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u0440\u043E\u0448\u043B\u0430 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u043F\u0435\u0440\u0435\u0434 \u043F\u0440\u043E\u0434\u0430\u0436\u0435\u0439. \u041E\u043D\u0430 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0434\u0430\u043D\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 \u0430\u0432\u0442\u043E. \u0422\u043E\u0432\u0430\u0440 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0445\u043E\u0440\u043E\u0448\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0438 \u0433\u043E\u0442\u043E\u0432 \u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435. \u0412 \u0445\u043E\u0440\u043E\u0448\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438. \u0418\u0437 \u0415\u0432\u0440\u043E\u043F\u044B. \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430'>;
    images: Attribute.Media;
    price: Attribute.Decimal & Attribute.DefaultTo<0>;
    priceUSD: Attribute.Decimal;
    slug: Attribute.UID<'api::spare-part.spare-part', 'h1'>;
    year: Attribute.Integer;
    bodyStyle: Attribute.String;
    transmission: Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440'
      ]
    >;
    model: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::model.model'
    >;
    brand: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::brand.brand'
    >;
    kindSparePart: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::kind-spare-part.kind-spare-part'
    >;
    generation: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::generation.generation'
    >;
    seo: Attribute.Component<'seo.seo'>;
    fuel: Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434'
      ]
    >;
    snippets: Attribute.Component<'product.snippets'>;
    h1: Attribute.String;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Integer;
    type: Attribute.Enumeration<['sparePart']> &
      Attribute.Required &
      Attribute.DefaultTo<'sparePart'>;
    engine: Attribute.String;
    volume: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
    engineNumber: Attribute.String;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    videoLink: Attribute.String;
    priceRUB: Attribute.Decimal;
    code: Attribute.BigInteger & Attribute.Unique;
    olem: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::spare-part.spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::spare-part.spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTireTire extends Schema.CollectionType {
  collectionName: 'tires';
  info: {
    singularName: 'tire';
    pluralName: 'tires';
    displayName: 'Tire';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    season: Attribute.Enumeration<
      [
        '\u0437\u0438\u043C\u043D\u0438\u0435',
        '\u043B\u0435\u0442\u043D\u0438\u0435',
        '\u0432\u0441\u0435\u0441\u0435\u0437\u043E\u043D\u043D\u044B\u0435'
      ]
    >;
    price: Attribute.Decimal & Attribute.DefaultTo<0>;
    priceUSD: Attribute.Decimal;
    brand: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-brand.tire-brand'
    >;
    name: Attribute.String;
    slug: Attribute.UID<'api::tire.tire', 'h1'>;
    images: Attribute.Media;
    count: Attribute.Integer;
    description: Attribute.Text;
    seo: Attribute.Component<'seo.seo'>;
    snippets: Attribute.Component<'product.snippets'>;
    h1: Attribute.String;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Integer;
    type: Attribute.Enumeration<['tire']> &
      Attribute.Required &
      Attribute.DefaultTo<'tire'>;
    width: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-width.tire-width'
    >;
    height: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-height.tire-height'
    >;
    diameter: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-diameter.tire-diameter'
    >;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    priceRUB: Attribute.Decimal;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tire.tire', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tire.tire', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTireBrandTireBrand extends Schema.CollectionType {
  collectionName: 'tire_brands';
  info: {
    singularName: 'tire-brand';
    pluralName: 'tire-brands';
    displayName: 'Tire brand';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    tires: Attribute.Relation<
      'api::tire-brand.tire-brand',
      'oneToMany',
      'api::tire.tire'
    >;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::tire-brand.tire-brand', 'name'>;
    productBrandText: Attribute.Component<'brand.brand-text'>;
    image: Attribute.Media;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-brand.tire-brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tire-brand.tire-brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTireDiameterTireDiameter extends Schema.CollectionType {
  collectionName: 'tire_diameters';
  info: {
    singularName: 'tire-diameter';
    pluralName: 'tire-diameters';
    displayName: 'Tire diameter';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    tires: Attribute.Relation<
      'api::tire-diameter.tire-diameter',
      'oneToMany',
      'api::tire.tire'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-diameter.tire-diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tire-diameter.tire-diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTireHeightTireHeight extends Schema.CollectionType {
  collectionName: 'tire_heights';
  info: {
    singularName: 'tire-height';
    pluralName: 'tire-heights';
    displayName: 'Tire height';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.Decimal;
    tires: Attribute.Relation<
      'api::tire-height.tire-height',
      'oneToMany',
      'api::tire.tire'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-height.tire-height',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tire-height.tire-height',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTireWidthTireWidth extends Schema.CollectionType {
  collectionName: 'tire_widths';
  info: {
    singularName: 'tire-width';
    pluralName: 'tire-widths';
    displayName: 'Tire width';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.Decimal;
    tires: Attribute.Relation<
      'api::tire-width.tire-width',
      'oneToMany',
      'api::tire.tire'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-width.tire-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tire-width.tire-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWheelWheel extends Schema.CollectionType {
  collectionName: 'wheels';
  info: {
    singularName: 'wheel';
    pluralName: 'wheels';
    displayName: 'Wheel';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    images: Attribute.Media;
    price: Attribute.Decimal & Attribute.DefaultTo<0>;
    priceUSD: Attribute.Integer;
    name: Attribute.String;
    slug: Attribute.UID<'api::wheel.wheel', 'h1'>;
    brand: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::brand.brand'
    >;
    model: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::model.model'
    >;
    kind: Attribute.Enumeration<
      [
        '\u0448\u0442\u0430\u043C\u043F\u043E\u0432\u0430\u043D\u043D\u044B\u0439',
        '\u043B\u0438\u0442\u043E\u0439'
      ]
    >;
    count: Attribute.Integer;
    description: Attribute.Text;
    seo: Attribute.Component<'seo.seo'>;
    snippets: Attribute.Component<'product.snippets'>;
    h1: Attribute.String;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Integer;
    type: Attribute.Enumeration<['wheel']> &
      Attribute.Required &
      Attribute.DefaultTo<'wheel'>;
    diskOffset: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-disk-offset.wheel-disk-offset'
    >;
    width: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-width.wheel-width'
    >;
    numberHoles: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-number-hole.wheel-number-hole'
    >;
    diameterCenterHole: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole'
    >;
    diameter: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-diameter.wheel-diameter'
    >;
    distanceBetweenCenters: Attribute.Decimal;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    priceRUB: Attribute.Decimal;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel.wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wheel.wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWheelDiameterWheelDiameter extends Schema.CollectionType {
  collectionName: 'wheel_diameters';
  info: {
    singularName: 'wheel-diameter';
    pluralName: 'wheel-diameters';
    displayName: 'Wheel diameter';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    wheels: Attribute.Relation<
      'api::wheel-diameter.wheel-diameter',
      'oneToMany',
      'api::wheel.wheel'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-diameter.wheel-diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wheel-diameter.wheel-diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWheelDiameterCenterHoleWheelDiameterCenterHole
  extends Schema.CollectionType {
  collectionName: 'wheel_diameter_center_holes';
  info: {
    singularName: 'wheel-diameter-center-hole';
    pluralName: 'wheel-diameter-center-holes';
    displayName: 'Wheel diameter center hole';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.Decimal & Attribute.Unique;
    wheels: Attribute.Relation<
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole',
      'oneToMany',
      'api::wheel.wheel'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWheelDiskOffsetWheelDiskOffset
  extends Schema.CollectionType {
  collectionName: 'wheel_disk_offsets';
  info: {
    singularName: 'wheel-disk-offset';
    pluralName: 'wheel-disk-offsets';
    displayName: 'Wheel disk offset';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.Decimal & Attribute.Unique;
    wheels: Attribute.Relation<
      'api::wheel-disk-offset.wheel-disk-offset',
      'oneToMany',
      'api::wheel.wheel'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-disk-offset.wheel-disk-offset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wheel-disk-offset.wheel-disk-offset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWheelNumberHoleWheelNumberHole
  extends Schema.CollectionType {
  collectionName: 'wheel_number_holes';
  info: {
    singularName: 'wheel-number-hole';
    pluralName: 'wheel-number-holes';
    displayName: 'Wheel number holes';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.Decimal & Attribute.Unique;
    wheels: Attribute.Relation<
      'api::wheel-number-hole.wheel-number-hole',
      'oneToMany',
      'api::wheel.wheel'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-number-hole.wheel-number-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wheel-number-hole.wheel-number-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWheelWidthWheelWidth extends Schema.CollectionType {
  collectionName: 'wheel_widths';
  info: {
    singularName: 'wheel-width';
    pluralName: 'wheel-widths';
    displayName: 'Wheel width';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.Decimal & Attribute.Unique;
    wheels: Attribute.Relation<
      'api::wheel-width.wheel-width',
      'oneToMany',
      'api::wheel.wheel'
    >;
    code: Attribute.BigInteger & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-width.wheel-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wheel-width.wheel-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::internal.data': PluginInternalData;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::article.article': ApiArticleArticle;
      'api::autocomis.autocomis': ApiAutocomisAutocomis;
      'api::brand.brand': ApiBrandBrand;
      'api::cabin.cabin': ApiCabinCabin;
      'api::car.car': ApiCarCar;
      'api::car-on-parts.car-on-parts': ApiCarOnPartsCarOnParts;
      'api::catalog.catalog': ApiCatalogCatalog;
      'api::engine-volume.engine-volume': ApiEngineVolumeEngineVolume;
      'api::favorite.favorite': ApiFavoriteFavorite;
      'api::generation.generation': ApiGenerationGeneration;
      'api::kind-spare-part.kind-spare-part': ApiKindSparePartKindSparePart;
      'api::layout.layout': ApiLayoutLayout;
      'api::model.model': ApiModelModel;
      'api::order.order': ApiOrderOrder;
      'api::page-about.page-about': ApiPageAboutPageAbout;
      'api::page-article.page-article': ApiPageArticlePageArticle;
      'api::page-autocomis.page-autocomis': ApiPageAutocomisPageAutocomis;
      'api::page-awaiting-car.page-awaiting-car': ApiPageAwaitingCarPageAwaitingCar;
      'api::page-buyback-car.page-buyback-car': ApiPageBuybackCarPageBuybackCar;
      'api::page-cabin.page-cabin': ApiPageCabinPageCabin;
      'api::page-car-dismantling-photo.page-car-dismantling-photo': ApiPageCarDismantlingPhotoPageCarDismantlingPhoto;
      'api::page-cars-on-part.page-cars-on-part': ApiPageCarsOnPartPageCarsOnPart;
      'api::page-company-photo.page-company-photo': ApiPageCompanyPhotoPageCompanyPhoto;
      'api::page-contact.page-contact': ApiPageContactPageContact;
      'api::page-delivery.page-delivery': ApiPageDeliveryPageDelivery;
      'api::page-guarantee.page-guarantee': ApiPageGuaranteePageGuarantee;
      'api::page-how-to-get-to.page-how-to-get-to': ApiPageHowToGetToPageHowToGetTo;
      'api::page-installment-plan.page-installment-plan': ApiPageInstallmentPlanPageInstallmentPlan;
      'api::page-main.page-main': ApiPageMainPageMain;
      'api::page-payment.page-payment': ApiPagePaymentPagePayment;
      'api::page-product.page-product': ApiPageProductPageProduct;
      'api::page-product-cabin.page-product-cabin': ApiPageProductCabinPageProductCabin;
      'api::page-product-spare-part.page-product-spare-part': ApiPageProductSparePartPageProductSparePart;
      'api::page-product-tire.page-product-tire': ApiPageProductTirePageProductTire;
      'api::page-product-wheel.page-product-wheel': ApiPageProductWheelPageProductWheel;
      'api::page-review.page-review': ApiPageReviewPageReview;
      'api::page-service-station.page-service-station': ApiPageServiceStationPageServiceStation;
      'api::page-spare-part.page-spare-part': ApiPageSparePartPageSparePart;
      'api::page-tire.page-tire': ApiPageTirePageTire;
      'api::page-vacancy.page-vacancy': ApiPageVacancyPageVacancy;
      'api::page-wheel.page-wheel': ApiPageWheelPageWheel;
      'api::product.product': ApiProductProduct;
      'api::review.review': ApiReviewReview;
      'api::service-station.service-station': ApiServiceStationServiceStation;
      'api::shopping-cart.shopping-cart': ApiShoppingCartShoppingCart;
      'api::spare-part.spare-part': ApiSparePartSparePart;
      'api::tire.tire': ApiTireTire;
      'api::tire-brand.tire-brand': ApiTireBrandTireBrand;
      'api::tire-diameter.tire-diameter': ApiTireDiameterTireDiameter;
      'api::tire-height.tire-height': ApiTireHeightTireHeight;
      'api::tire-width.tire-width': ApiTireWidthTireWidth;
      'api::wheel.wheel': ApiWheelWheel;
      'api::wheel-diameter.wheel-diameter': ApiWheelDiameterWheelDiameter;
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole': ApiWheelDiameterCenterHoleWheelDiameterCenterHole;
      'api::wheel-disk-offset.wheel-disk-offset': ApiWheelDiskOffsetWheelDiskOffset;
      'api::wheel-number-hole.wheel-number-hole': ApiWheelNumberHoleWheelNumberHole;
      'api::wheel-width.wheel-width': ApiWheelWidthWheelWidth;
    }
  }
}
