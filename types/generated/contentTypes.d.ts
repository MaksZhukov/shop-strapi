import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
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
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
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
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
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
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
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
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
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
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    description: '';
    displayName: 'Article';
    pluralName: 'articles';
    singularName: 'article';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content1: Attribute.RichText;
    content2: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    images1: Attribute.Media<'images', true>;
    images2: Attribute.Media<'images', true>;
    mainImage: Attribute.Media<'images'>;
    name: Attribute.String;
    rightText: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    slug: Attribute.UID<'api::article.article', 'name'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Autocomises';
    pluralName: 'autocomises';
    singularName: 'autocomis';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::autocomis.autocomis',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    image: Attribute.Media<'images'>;
    name: Attribute.String;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::autocomis.autocomis', 'name'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Brand';
    pluralName: 'brands';
    singularName: 'brand';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    cabins: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::cabin.cabin'
    >;
    cars: Attribute.Relation<'api::brand.brand', 'oneToMany', 'api::car.car'>;
    carsOnParts: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    generations: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::generation.generation'
    >;
    image: Attribute.Media<'images'>;
    models: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::model.model'
    >;
    name: Attribute.String;
    productBrandTexts: Attribute.Component<'brand.brand-type-product-texts'>;
    seoCabins: Attribute.Component<'seo.seo'>;
    seoSpareParts: Attribute.Component<'seo.seo'>;
    seoWheels: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::brand.brand', 'name'>;
    spareParts: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    wheels: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::wheel.wheel'
    >;
  };
}

export interface ApiCabinCabin extends Schema.CollectionType {
  collectionName: 'cabins';
  info: {
    description: '';
    displayName: 'Cabin';
    pluralName: 'cabins';
    singularName: 'cabin';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    brand: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::brand.brand'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cabin.cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Decimal;
    generation: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::generation.generation'
    >;
    h1: Attribute.String;
    images: Attribute.Media<'images', true>;
    kindSparePart: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::kind-spare-part.kind-spare-part'
    >;
    model: Attribute.Relation<
      'api::cabin.cabin',
      'manyToOne',
      'api::model.model'
    >;
    name: Attribute.String;
    price: Attribute.Decimal;
    priceRUB: Attribute.Decimal;
    priceUSD: Attribute.Decimal;
    seatUpholstery: Attribute.String;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::cabin.cabin', 'h1'>;
    snippets: Attribute.Component<'product.snippets'>;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<['cabin']> &
      Attribute.Required &
      Attribute.DefaultTo<'cabin'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::cabin.cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    year: Attribute.Integer;
  };
}

export interface ApiCarOnPartsCarOnParts extends Schema.CollectionType {
  collectionName: 'cars_on_parts';
  info: {
    description: '';
    displayName: 'Car on parts';
    pluralName: 'cars-on-parts';
    singularName: 'car-on-parts';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bodyStyle: Attribute.String;
    brand: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::brand.brand'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    deliveryDate: Attribute.Date;
    description: Attribute.String;
    engine: Attribute.String;
    fuel: Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434'
      ]
    >;
    generation: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::generation.generation'
    >;
    images: Attribute.Media<'images', true>;
    manufactureDate: Attribute.Date;
    mileage: Attribute.Decimal;
    model: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::model.model'
    >;
    price: Attribute.Decimal;
    priceUSD: Attribute.Decimal;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::car-on-parts.car-on-parts', 'bodyStyle'>;
    transmission: Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440'
      ]
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    videoLink: Attribute.String;
    volume: Attribute.Relation<
      'api::car-on-parts.car-on-parts',
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
  };
}

export interface ApiCarCar extends Schema.CollectionType {
  collectionName: 'cars';
  info: {
    description: '';
    displayName: 'Car';
    pluralName: 'cars';
    singularName: 'car';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bodyStyle: Attribute.String;
    brand: Attribute.Relation<'api::car.car', 'manyToOne', 'api::brand.brand'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::car.car', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    deliveryDate: Attribute.Date;
    engine: Attribute.String;
    fuel: Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434'
      ]
    >;
    generation: Attribute.Relation<
      'api::car.car',
      'manyToOne',
      'api::generation.generation'
    >;
    images: Attribute.Media<'images', true>;
    manufactureDate: Attribute.Date;
    mileage: Attribute.Integer;
    model: Attribute.Relation<'api::car.car', 'manyToOne', 'api::model.model'>;
    name: Attribute.String;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::car.car', 'name'>;
    transmission: Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440'
      ]
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::car.car', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    videoLink: Attribute.String;
    volume: Attribute.Relation<
      'api::car.car',
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
  };
}

export interface ApiEngineVolumeEngineVolume extends Schema.CollectionType {
  collectionName: 'engine_volumes';
  info: {
    description: '';
    displayName: 'Engine volume';
    pluralName: 'engine-volumes';
    singularName: 'engine-volume';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::engine-volume.engine-volume',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Unique;
    spareParts: Attribute.Relation<
      'api::engine-volume.engine-volume',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Favorite';
    pluralName: 'favorites';
    singularName: 'favorite';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::favorite.favorite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    product: Attribute.DynamicZone<
      ['product.tire', 'product.wheel', 'product.spare-part']
    > &
      Attribute.SetMinMax<
        {
          max: 1;
        },
        number
      >;
    uid: Attribute.UID & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::favorite.favorite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    usersPermissionsUser: Attribute.Relation<
      'api::favorite.favorite',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiGenerationGeneration extends Schema.CollectionType {
  collectionName: 'generations';
  info: {
    description: '';
    displayName: 'Generation';
    pluralName: 'generations';
    singularName: 'generation';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    brand: Attribute.Relation<
      'api::generation.generation',
      'manyToOne',
      'api::brand.brand'
    >;
    cabins: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::cabin.cabin'
    >;
    cars: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::car.car'
    >;
    cars_on_parts: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generation.generation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    model: Attribute.Relation<
      'api::generation.generation',
      'manyToOne',
      'api::model.model'
    >;
    name: Attribute.String;
    slug: Attribute.String;
    spareParts: Attribute.Relation<
      'api::generation.generation',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Kind spare part';
    pluralName: 'kind-spare-parts';
    singularName: 'kind-spare-part';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    cabins: Attribute.Relation<
      'api::kind-spare-part.kind-spare-part',
      'oneToMany',
      'api::cabin.cabin'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kind-spare-part.kind-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Unique;
    slug: Attribute.UID<'api::kind-spare-part.kind-spare-part', 'name'>;
    spareParts: Attribute.Relation<
      'api::kind-spare-part.kind-spare-part',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    type: Attribute.Enumeration<['regular', 'cabin']> &
      Attribute.DefaultTo<'regular'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Layout';
    pluralName: 'layouts';
    singularName: 'layout';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::layout.layout',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    footer: Attribute.Component<'general.footer'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::layout.layout',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    videoWidget: Attribute.Component<'general.video-widget'>;
  };
}

export interface ApiModelModel extends Schema.CollectionType {
  collectionName: 'models';
  info: {
    description: '';
    displayName: 'Model';
    pluralName: 'models';
    singularName: 'model';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    brand: Attribute.Relation<
      'api::model.model',
      'manyToOne',
      'api::brand.brand'
    >;
    cabins: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::cabin.cabin'
    >;
    cars: Attribute.Relation<'api::model.model', 'oneToMany', 'api::car.car'>;
    cars_on_parts: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::model.model',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    generations: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::generation.generation'
    >;
    name: Attribute.String;
    seoCabins: Attribute.Component<'seo.seo'>;
    seoSpareParts: Attribute.Component<'seo.seo'>;
    seoWheels: Attribute.Component<'seo.seo'>;
    slug: Attribute.String;
    spareParts: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::model.model',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    wheels: Attribute.Relation<
      'api::model.model',
      'oneToMany',
      'api::wheel.wheel'
    >;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    description: '';
    displayName: 'Order';
    pluralName: 'orders';
    singularName: 'order';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.String;
    handled: Attribute.Boolean;
    patronymic: Attribute.String;
    phone: Attribute.String;
    products: Attribute.DynamicZone<
      ['product.spare-part', 'product.tire', 'product.wheel', 'product.cabin']
    >;
    surname: Attribute.String;
    transactionId: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiPageAboutPageAbout extends Schema.SingleType {
  collectionName: 'page_abouts';
  info: {
    description: '';
    displayName: 'Page about';
    pluralName: 'page-abouts';
    singularName: 'page-about';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-about.page-about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    h1: Attribute.String;
    images1: Attribute.Media<'images', true>;
    images2: Attribute.Media<'images', true>;
    images3: Attribute.Media<'images', true>;
    images4: Attribute.Media<'images', true>;
    mainImageLeft: Attribute.Media<'images'>;
    mainPrinciplesImageRight: Attribute.Media<'images'>;
    mainPrinciplesTextAfterImages3: Attribute.RichText;
    mainPrinciplesTextLeft: Attribute.RichText;
    mainPrinciplesTitle: Attribute.String;
    mainTextRight: Attribute.RichText;
    nuancesText: Attribute.RichText;
    nuancesTitle: Attribute.String;
    pricesLeftImage: Attribute.Media<'images'>;
    pricesRightText: Attribute.RichText;
    pricesTitle: Attribute.String;
    seo: Attribute.Component<'seo.short-seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-about.page-about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    whyNeedServicesText: Attribute.RichText;
    whyNeedServicesTextAfterImages2: Attribute.RichText;
    whyNeedServicesTitle: Attribute.String;
  };
}

export interface ApiPageArticlePageArticle extends Schema.SingleType {
  collectionName: 'page_articles';
  info: {
    description: '';
    displayName: 'Page articles';
    pluralName: 'page-articles';
    singularName: 'page-article';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-article.page-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page autocomises';
    pluralName: 'page-autocomises';
    singularName: 'page-autocomis';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-autocomis.page-autocomis',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    displayName: 'Page awaiting cars';
    pluralName: 'page-awaiting-cars';
    singularName: 'page-awaiting-car';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-awaiting-car.page-awaiting-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page buyback cars';
    pluralName: 'page-buyback-cars';
    singularName: 'page-buyback-car';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    advantages: Attribute.Text;
    advantagesRightImage: Attribute.Media<'images'>;
    advantagesTitle: Attribute.String;
    anyCarsAfter: Attribute.Component<'general.card', true> &
      Attribute.SetMinMax<
        {
          max: 6;
          min: 6;
        },
        number
      >;
    applicationLeftText: Attribute.RichText;
    buyAnyCarsTitle: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-buyback-car.page-buyback-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    h1: Attribute.String;
    mainBackgroundImage: Attribute.Media<'images'>;
    mainBackgroundLeftImage: Attribute.Media<'images'>;
    purchasedCarsTitle: Attribute.String;
    sellCarTitle: Attribute.String;
    sellImage: Attribute.Media<'images'>;
    sellSteps: Attribute.Component<'general.card-without-image', true>;
    seo: Attribute.Component<'seo.short-seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-buyback-car.page-buyback-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    weProvide: Attribute.Component<'general.card', true> &
      Attribute.SetMinMax<
        {
          max: 3;
          min: 3;
        },
        number
      >;
    weProvideTitle: Attribute.String;
    whyWe: Attribute.Text;
    whyWeLeftImage: Attribute.Media<'images'>;
    whyWeTitle: Attribute.String;
  };
}

export interface ApiPageCabinPageCabin extends Schema.SingleType {
  collectionName: 'page_cabins';
  info: {
    description: '';
    displayName: 'Page cabins';
    pluralName: 'page-cabins';
    singularName: 'page-cabin';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-cabin.page-cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page car dismantling photos';
    pluralName: 'page-car-dismantling-photos';
    singularName: 'page-car-dismantling-photo';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-car-dismantling-photo.page-car-dismantling-photo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    images: Attribute.Media<'images', true>;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    displayName: 'Page cars on parts';
    pluralName: 'page-cars-on-parts';
    singularName: 'page-cars-on-part';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-cars-on-part.page-cars-on-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page company photos';
    pluralName: 'page-company-photos';
    singularName: 'page-company-photo';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-company-photo.page-company-photo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    images: Attribute.Media<'images', true>;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page contacts';
    pluralName: 'page-contacts';
    singularName: 'page-contact';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    askText: Attribute.RichText;
    askTitle: Attribute.String;
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-contact.page-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    h1: Attribute.String;
    images: Attribute.Media<'images', true>;
    location: Attribute.String;
    phone1: Attribute.String;
    phone2: Attribute.String;
    requisites: Attribute.Media<'images', true>;
    requisitesTitle: Attribute.String;
    seo: Attribute.Component<'seo.short-seo'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page delivery';
    pluralName: 'page-deliveries';
    singularName: 'page-delivery';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    courierDescription: Attribute.Component<'general.label-and-value', true>;
    courierTitle: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-delivery.page-delivery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    deliveryCitiesDescription: Attribute.Component<
      'general.label-and-value',
      true
    >;
    deliveryCitiesTitle: Attribute.String;
    h1: Attribute.String;
    images1: Attribute.Media<'images', true>;
    images2: Attribute.Media<'images', true>;
    mainImageLeft: Attribute.Media<'images'>;
    mainTextRight: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    shipmentImageRight: Attribute.Media<'images'>;
    shipmentText: Attribute.RichText;
    shipmentTitle: Attribute.String;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page guarantee';
    pluralName: 'page-guarantees';
    singularName: 'page-guarantee';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-guarantee.page-guarantee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    guaranteeNotApplyText: Attribute.RichText;
    guaranteeNotApplyTitle: Attribute.String;
    h1: Attribute.String;
    images1: Attribute.Media<'images', true>;
    images2: Attribute.Media<'images', true>;
    mainLeftImage: Attribute.Media<'images'>;
    mainRightText: Attribute.RichText;
    seo: Attribute.Component<'seo.short-seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-guarantee.page-guarantee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    warningLeftImage: Attribute.Media<'images'>;
    warningRightText: Attribute.Text;
    warningTitle: Attribute.String;
  };
}

export interface ApiPageHowToGetToPageHowToGetTo extends Schema.SingleType {
  collectionName: 'page_how_to_get_tos';
  info: {
    description: '';
    displayName: 'Page how to get to';
    pluralName: 'page-how-to-get-tos';
    singularName: 'page-how-to-get-to';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-how-to-get-to.page-how-to-get-to',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    text: Attribute.RichText;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-how-to-get-to.page-how-to-get-to',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    video: Attribute.Media<'videos'>;
  };
}

export interface ApiPageInstallmentPlanPageInstallmentPlan
  extends Schema.SingleType {
  collectionName: 'page_installment_plans';
  info: {
    description: '';
    displayName: 'Page installment plan';
    pluralName: 'page-installment-plans';
    singularName: 'page-installment-plan';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-installment-plan.page-installment-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page main';
    pluralName: 'page-mains';
    singularName: 'page-main';
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
    banner: Attribute.Media<'images'>;
    bannerMobile: Attribute.Media<'images'>;
    benefits: Attribute.Component<'general.link-and-image', true>;
    benefitsLeftText: Attribute.RichText;
    benefitsRightImage: Attribute.Media<'images'>;
    benefitsTitle: Attribute.String;
    blogLeftText: Attribute.RichText;
    blogRightText: Attribute.RichText;
    blogTitle: Attribute.String;
    categoryImages: Attribute.Media<'images', true>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-main.page-main',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    deliveryText: Attribute.RichText;
    deliveryTitle: Attribute.String;
    h1: Attribute.String;
    leftSideText: Attribute.RichText;
    popularBrandsTitle: Attribute.String;
    reviewsTitle: Attribute.String;
    seo: Attribute.Component<'seo.short-seo'>;
    serviceStations: Attribute.Relation<
      'api::page-main.page-main',
      'oneToMany',
      'api::service-station.service-station'
    >;
    subH1: Attribute.String;
    titleCategories: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-main.page-main',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    videoUrl: Attribute.String;
  };
}

export interface ApiPagePaymentPagePayment extends Schema.SingleType {
  collectionName: 'page_payments';
  info: {
    displayName: 'Page payment';
    pluralName: 'page-payments';
    singularName: 'page-payment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-payment.page-payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-payment.page-payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageProductCabinPageProductCabin extends Schema.SingleType {
  collectionName: 'page_product_cabins';
  info: {
    description: '';
    displayName: 'Page product cabin';
    pluralName: 'page-product-cabins';
    singularName: 'page-product-cabin';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    additionalDescription: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-cabin.page-product-cabin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.short-seo'>;
    textAfterBenefits: Attribute.RichText;
    textAfterDescription: Attribute.RichText;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page product spare part';
    pluralName: 'page-product-spare-parts';
    singularName: 'page-product-spare-part';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    additionalDescription: Attribute.RichText;
    autoSynonyms: Attribute.String &
      Attribute.DefaultTo<'\u0430\u0432\u0442\u043E,\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-spare-part.page-product-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.short-seo'>;
    textAfterBenefits: Attribute.RichText;
    textAfterDescription: Attribute.RichText;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page product tire';
    pluralName: 'page-product-tires';
    singularName: 'page-product-tire';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    additionalDescription: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-tire.page-product-tire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.short-seo'>;
    textAfterBenefits: Attribute.RichText;
    textAfterDescription: Attribute.RichText;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page product wheel';
    pluralName: 'page-product-wheels';
    singularName: 'page-product-wheel';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    additionalDescription: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product-wheel.page-product-wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.short-seo'>;
    textAfterBenefits: Attribute.RichText;
    textAfterDescription: Attribute.RichText;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-product-wheel.page-product-wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageProductPageProduct extends Schema.SingleType {
  collectionName: 'page_products';
  info: {
    description: '';
    displayName: 'Page product';
    pluralName: 'page-products';
    singularName: 'page-product';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-product.page-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-product.page-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    whyWeBest: Attribute.Component<'general.link-and-image', true>;
  };
}

export interface ApiPageReviewPageReview extends Schema.SingleType {
  collectionName: 'page_reviews';
  info: {
    description: '';
    displayName: 'Page reviews';
    pluralName: 'page-reviews';
    singularName: 'page-review';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-review.page-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    displayName: 'Page service stations';
    pluralName: 'page-service-stations';
    singularName: 'page-service-station';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-service-station.page-service-station',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page spare parts';
    pluralName: 'page-spare-parts';
    singularName: 'page-spare-part';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-spare-part.page-spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page tires';
    pluralName: 'page-tires';
    singularName: 'page-tire';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-tire.page-tire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Page vacancies';
    pluralName: 'page-vacancies';
    singularName: 'page-vacancy';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-vacancy.page-vacancy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.short-seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-vacancy.page-vacancy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    vacancies: Attribute.Component<'page-vacancies.vacancies', true>;
  };
}

export interface ApiPageWheelPageWheel extends Schema.SingleType {
  collectionName: 'page_wheels';
  info: {
    description: '';
    displayName: 'Page wheels';
    pluralName: 'page-wheels';
    singularName: 'page-wheel';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-wheel.page-wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    seo: Attribute.Component<'seo.seo'>;
    textCategory: Attribute.RichText;
    updatedAt: Attribute.DateTime;
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
    displayName: 'Product';
    pluralName: 'products';
    singularName: 'product';
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
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Review';
    pluralName: 'reviews';
    singularName: 'review';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text;
    rating: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Service stations';
    pluralName: 'service-stations';
    singularName: 'service-station';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-station.service-station',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    image: Attribute.Media<'images'>;
    name: Attribute.String;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::service-station.service-station', 'name'>;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Shopping cart(INACTIVE)';
    pluralName: 'shopping-carts';
    singularName: 'shopping-cart';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shopping-cart.shopping-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    product: Attribute.DynamicZone<
      ['product.spare-part', 'product.tire', 'product.wheel']
    > &
      Attribute.SetMinMax<
        {
          max: 1;
        },
        number
      >;
    uid: Attribute.UID & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::shopping-cart.shopping-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    usersPermissionsUser: Attribute.Relation<
      'api::shopping-cart.shopping-cart',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiSparePartSparePart extends Schema.CollectionType {
  collectionName: 'spare_parts';
  info: {
    description: '';
    displayName: 'Spare part';
    pluralName: 'spare-parts';
    singularName: 'spare-part';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bodyStyle: Attribute.String;
    brand: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::brand.brand'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::spare-part.spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text &
      Attribute.DefaultTo<'\u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u044C, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u0440\u043E\u0448\u043B\u0430 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u043F\u0435\u0440\u0435\u0434 \u043F\u0440\u043E\u0434\u0430\u0436\u0435\u0439. \u041E\u043D\u0430 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0434\u0430\u043D\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 \u0430\u0432\u0442\u043E. \u0422\u043E\u0432\u0430\u0440 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0445\u043E\u0440\u043E\u0448\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0438 \u0433\u043E\u0442\u043E\u0432 \u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435. \u0412 \u0445\u043E\u0440\u043E\u0448\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438. \u0418\u0437 \u0415\u0432\u0440\u043E\u043F\u044B. \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430'>;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Integer;
    engine: Attribute.String;
    engineNumber: Attribute.String;
    fuel: Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434'
      ]
    >;
    generation: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::generation.generation'
    >;
    h1: Attribute.String;
    images: Attribute.Media<'images', true>;
    kindSparePart: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::kind-spare-part.kind-spare-part'
    >;
    model: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::model.model'
    >;
    name: Attribute.String;
    price: Attribute.Decimal & Attribute.DefaultTo<0>;
    priceRUB: Attribute.Decimal;
    priceUSD: Attribute.Decimal;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::spare-part.spare-part', 'h1'>;
    snippets: Attribute.Component<'product.snippets'>;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    transmission: Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440'
      ]
    >;
    type: Attribute.Enumeration<['sparePart']> &
      Attribute.Required &
      Attribute.DefaultTo<'sparePart'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::spare-part.spare-part',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    videoLink: Attribute.String;
    volume: Attribute.Relation<
      'api::spare-part.spare-part',
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
    year: Attribute.Integer;
  };
}

export interface ApiTireBrandTireBrand extends Schema.CollectionType {
  collectionName: 'tire_brands';
  info: {
    description: '';
    displayName: 'Tire brand';
    pluralName: 'tire-brands';
    singularName: 'tire-brand';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-brand.tire-brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'>;
    name: Attribute.String & Attribute.Unique;
    productBrandText: Attribute.Component<'brand.brand-text'>;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::tire-brand.tire-brand', 'name'>;
    tires: Attribute.Relation<
      'api::tire-brand.tire-brand',
      'oneToMany',
      'api::tire.tire'
    >;
    updatedAt: Attribute.DateTime;
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
    displayName: 'Tire diameter';
    pluralName: 'tire-diameters';
    singularName: 'tire-diameter';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-diameter.tire-diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Unique;
    tires: Attribute.Relation<
      'api::tire-diameter.tire-diameter',
      'oneToMany',
      'api::tire.tire'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Tire height';
    pluralName: 'tire-heights';
    singularName: 'tire-height';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-height.tire-height',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.Decimal;
    tires: Attribute.Relation<
      'api::tire-height.tire-height',
      'oneToMany',
      'api::tire.tire'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Tire width';
    pluralName: 'tire-widths';
    singularName: 'tire-width';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tire-width.tire-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.Decimal;
    tires: Attribute.Relation<
      'api::tire-width.tire-width',
      'oneToMany',
      'api::tire.tire'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::tire-width.tire-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTireTire extends Schema.CollectionType {
  collectionName: 'tires';
  info: {
    description: '';
    displayName: 'Tire';
    pluralName: 'tires';
    singularName: 'tire';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    brand: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-brand.tire-brand'
    >;
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tire.tire', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.Text;
    diameter: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-diameter.tire-diameter'
    >;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Integer;
    h1: Attribute.String;
    height: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-height.tire-height'
    >;
    images: Attribute.Media<'images', true>;
    name: Attribute.String;
    price: Attribute.Decimal & Attribute.DefaultTo<0>;
    priceRUB: Attribute.Decimal;
    priceUSD: Attribute.Decimal;
    season: Attribute.Enumeration<
      [
        '\u0437\u0438\u043C\u043D\u0438\u0435',
        '\u043B\u0435\u0442\u043D\u0438\u0435',
        '\u0432\u0441\u0435\u0441\u0435\u0437\u043E\u043D\u043D\u044B\u0435'
      ]
    >;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::tire.tire', 'h1'>;
    snippets: Attribute.Component<'product.snippets'>;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<['tire']> &
      Attribute.Required &
      Attribute.DefaultTo<'tire'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::tire.tire', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    width: Attribute.Relation<
      'api::tire.tire',
      'manyToOne',
      'api::tire-width.tire-width'
    >;
  };
}

export interface ApiWheelDiameterCenterHoleWheelDiameterCenterHole
  extends Schema.CollectionType {
  collectionName: 'wheel_diameter_center_holes';
  info: {
    description: '';
    displayName: 'Wheel diameter center hole';
    pluralName: 'wheel-diameter-center-holes';
    singularName: 'wheel-diameter-center-hole';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.Decimal & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    wheels: Attribute.Relation<
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole',
      'oneToMany',
      'api::wheel.wheel'
    >;
  };
}

export interface ApiWheelDiameterWheelDiameter extends Schema.CollectionType {
  collectionName: 'wheel_diameters';
  info: {
    description: '';
    displayName: 'Wheel diameter';
    pluralName: 'wheel-diameters';
    singularName: 'wheel-diameter';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-diameter.wheel-diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::wheel-diameter.wheel-diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    wheels: Attribute.Relation<
      'api::wheel-diameter.wheel-diameter',
      'oneToMany',
      'api::wheel.wheel'
    >;
  };
}

export interface ApiWheelDiskOffsetWheelDiskOffset
  extends Schema.CollectionType {
  collectionName: 'wheel_disk_offsets';
  info: {
    description: '';
    displayName: 'Wheel disk offset';
    pluralName: 'wheel-disk-offsets';
    singularName: 'wheel-disk-offset';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-disk-offset.wheel-disk-offset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.Decimal & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::wheel-disk-offset.wheel-disk-offset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    wheels: Attribute.Relation<
      'api::wheel-disk-offset.wheel-disk-offset',
      'oneToMany',
      'api::wheel.wheel'
    >;
  };
}

export interface ApiWheelNumberHoleWheelNumberHole
  extends Schema.CollectionType {
  collectionName: 'wheel_number_holes';
  info: {
    description: '';
    displayName: 'Wheel number holes';
    pluralName: 'wheel-number-holes';
    singularName: 'wheel-number-hole';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-number-hole.wheel-number-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.Decimal & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::wheel-number-hole.wheel-number-hole',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    wheels: Attribute.Relation<
      'api::wheel-number-hole.wheel-number-hole',
      'oneToMany',
      'api::wheel.wheel'
    >;
  };
}

export interface ApiWheelWidthWheelWidth extends Schema.CollectionType {
  collectionName: 'wheel_widths';
  info: {
    description: '';
    displayName: 'Wheel width';
    pluralName: 'wheel-widths';
    singularName: 'wheel-width';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel-width.wheel-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.Decimal & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::wheel-width.wheel-width',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    wheels: Attribute.Relation<
      'api::wheel-width.wheel-width',
      'oneToMany',
      'api::wheel.wheel'
    >;
  };
}

export interface ApiWheelWheel extends Schema.CollectionType {
  collectionName: 'wheels';
  info: {
    description: '';
    displayName: 'Wheel';
    pluralName: 'wheels';
    singularName: 'wheel';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    brand: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::brand.brand'
    >;
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wheel.wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text;
    diameter: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-diameter.wheel-diameter'
    >;
    diameterCenterHole: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole'
    >;
    discountPrice: Attribute.Decimal;
    discountPriceUSD: Attribute.Integer;
    diskOffset: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-disk-offset.wheel-disk-offset'
    >;
    distanceBetweenCenters: Attribute.Decimal;
    h1: Attribute.String;
    images: Attribute.Media<'images', true>;
    kind: Attribute.Enumeration<
      [
        '\u0448\u0442\u0430\u043C\u043F\u043E\u0432\u0430\u043D\u043D\u044B\u0439',
        '\u043B\u0438\u0442\u043E\u0439'
      ]
    >;
    model: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::model.model'
    >;
    name: Attribute.String;
    numberHoles: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-number-hole.wheel-number-hole'
    >;
    price: Attribute.Decimal & Attribute.DefaultTo<0>;
    priceRUB: Attribute.Decimal;
    priceUSD: Attribute.Integer;
    seo: Attribute.Component<'seo.seo'>;
    slug: Attribute.UID<'api::wheel.wheel', 'h1'>;
    snippets: Attribute.Component<'product.snippets'>;
    sold: Attribute.Boolean & Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<['wheel']> &
      Attribute.Required &
      Attribute.DefaultTo<'wheel'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::wheel.wheel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    width: Attribute.Relation<
      'api::wheel.wheel',
      'manyToOne',
      'api::wheel-width.wheel-width'
    >;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
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
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
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
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
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
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginInternalData extends Schema.SingleType {
  collectionName: 'internal_data';
  info: {
    description: '';
    displayName: 'Data';
    pluralName: 'datas';
    singularName: 'data';
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
    bePaidTestMode: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::internal.data',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    currencyCoefficient: Attribute.Component<'general.currency'>;
    currencyDate: Attribute.DateTime;
    dateNewProductSentToEmail: Attribute.DateTime;
    dateProductFullDescriptionGenerated: Attribute.DateTime;
    dateProductsInCsvSentToEmail: Attribute.DateTime;
    dateUpdatingImagesMetadata: Attribute.DateTime;
    dateYMLSentToEmail: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::internal.data',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
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
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
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
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
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
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
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
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
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
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
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
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    address: Attribute.String;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    phone: Attribute.String;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::article.article': ApiArticleArticle;
      'api::autocomis.autocomis': ApiAutocomisAutocomis;
      'api::brand.brand': ApiBrandBrand;
      'api::cabin.cabin': ApiCabinCabin;
      'api::car-on-parts.car-on-parts': ApiCarOnPartsCarOnParts;
      'api::car.car': ApiCarCar;
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
      'api::page-product-cabin.page-product-cabin': ApiPageProductCabinPageProductCabin;
      'api::page-product-spare-part.page-product-spare-part': ApiPageProductSparePartPageProductSparePart;
      'api::page-product-tire.page-product-tire': ApiPageProductTirePageProductTire;
      'api::page-product-wheel.page-product-wheel': ApiPageProductWheelPageProductWheel;
      'api::page-product.page-product': ApiPageProductPageProduct;
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
      'api::tire-brand.tire-brand': ApiTireBrandTireBrand;
      'api::tire-diameter.tire-diameter': ApiTireDiameterTireDiameter;
      'api::tire-height.tire-height': ApiTireHeightTireHeight;
      'api::tire-width.tire-width': ApiTireWidthTireWidth;
      'api::tire.tire': ApiTireTire;
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole': ApiWheelDiameterCenterHoleWheelDiameterCenterHole;
      'api::wheel-diameter.wheel-diameter': ApiWheelDiameterWheelDiameter;
      'api::wheel-disk-offset.wheel-disk-offset': ApiWheelDiskOffsetWheelDiskOffset;
      'api::wheel-number-hole.wheel-number-hole': ApiWheelNumberHoleWheelNumberHole;
      'api::wheel-width.wheel-width': ApiWheelWidthWheelWidth;
      'api::wheel.wheel': ApiWheelWheel;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::internal.data': PluginInternalData;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
