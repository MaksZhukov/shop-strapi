import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
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
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
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
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
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
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
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
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiArticleArticle extends Struct.CollectionTypeSchema {
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
    content1: Schema.Attribute.RichText;
    content2: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    images1: Schema.Attribute.Media<'images', true>;
    images2: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    > &
      Schema.Attribute.Private;
    mainImage: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    rightText: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAutocomisAutocomis extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::autocomis.autocomis'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBrandBrand extends Struct.CollectionTypeSchema {
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
    cabins: Schema.Attribute.Relation<'oneToMany', 'api::cabin.cabin'>;
    cars: Schema.Attribute.Relation<'oneToMany', 'api::car.car'>;
    carsOnParts: Schema.Attribute.Relation<
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    generations: Schema.Attribute.Relation<
      'oneToMany',
      'api::generation.generation'
    >;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::brand.brand'> &
      Schema.Attribute.Private;
    models: Schema.Attribute.Relation<'oneToMany', 'api::model.model'>;
    name: Schema.Attribute.String;
    productBrandTexts: Schema.Attribute.Component<
      'brand.brand-type-product-texts',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    seoCabins: Schema.Attribute.Component<'seo.seo', false>;
    seoSpareParts: Schema.Attribute.Component<'seo.seo', false>;
    seoWheels: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'name'>;
    spareParts: Schema.Attribute.Relation<
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wheels: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'>;
  };
}

export interface ApiCabinCabin extends Struct.CollectionTypeSchema {
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
    brand: Schema.Attribute.Relation<'manyToOne', 'api::brand.brand'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    discountPrice: Schema.Attribute.Decimal;
    discountPriceUSD: Schema.Attribute.Decimal;
    generation: Schema.Attribute.Relation<
      'manyToOne',
      'api::generation.generation'
    >;
    h1: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    kindSparePart: Schema.Attribute.Relation<
      'manyToOne',
      'api::kind-spare-part.kind-spare-part'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::cabin.cabin'> &
      Schema.Attribute.Private;
    model: Schema.Attribute.Relation<'manyToOne', 'api::model.model'>;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    priceRUB: Schema.Attribute.Decimal;
    priceUSD: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    seatUpholstery: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'h1'>;
    snippets: Schema.Attribute.Component<'product.snippets', false>;
    sold: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<['cabin']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'cabin'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    year: Schema.Attribute.Integer;
  };
}

export interface ApiCarOnPartsCarOnParts extends Struct.CollectionTypeSchema {
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
    bodyStyle: Schema.Attribute.String;
    brand: Schema.Attribute.Relation<'manyToOne', 'api::brand.brand'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryDate: Schema.Attribute.Date;
    description: Schema.Attribute.String;
    engine: Schema.Attribute.String;
    fuel: Schema.Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434',
      ]
    >;
    generation: Schema.Attribute.Relation<
      'manyToOne',
      'api::generation.generation'
    >;
    images: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    > &
      Schema.Attribute.Private;
    manufactureDate: Schema.Attribute.Date;
    mileage: Schema.Attribute.Decimal;
    model: Schema.Attribute.Relation<'manyToOne', 'api::model.model'>;
    price: Schema.Attribute.Decimal;
    priceUSD: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'bodyStyle'>;
    transmission: Schema.Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoLink: Schema.Attribute.String;
    volume: Schema.Attribute.Relation<
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
  };
}

export interface ApiCarCar extends Struct.CollectionTypeSchema {
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
    bodyStyle: Schema.Attribute.String;
    brand: Schema.Attribute.Relation<'manyToOne', 'api::brand.brand'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryDate: Schema.Attribute.Date;
    engine: Schema.Attribute.String;
    fuel: Schema.Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434',
      ]
    >;
    generation: Schema.Attribute.Relation<
      'manyToOne',
      'api::generation.generation'
    >;
    images: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::car.car'> &
      Schema.Attribute.Private;
    manufactureDate: Schema.Attribute.Date;
    mileage: Schema.Attribute.Integer;
    model: Schema.Attribute.Relation<'manyToOne', 'api::model.model'>;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'name'>;
    transmission: Schema.Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoLink: Schema.Attribute.String;
    volume: Schema.Attribute.Relation<
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
  };
}

export interface ApiEngineVolumeEngineVolume
  extends Struct.CollectionTypeSchema {
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
    cars: Schema.Attribute.Relation<'oneToMany', 'api::car.car'>;
    carsOnParts: Schema.Attribute.Relation<
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::engine-volume.engine-volume'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    spareParts: Schema.Attribute.Relation<
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFavoriteFavorite extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::favorite.favorite'
    > &
      Schema.Attribute.Private;
    product: Schema.Attribute.DynamicZone<
      ['product.tire', 'product.wheel', 'product.spare-part']
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    uid: Schema.Attribute.UID & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usersPermissionsUser: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiGenerationGeneration extends Struct.CollectionTypeSchema {
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
    brand: Schema.Attribute.Relation<'manyToOne', 'api::brand.brand'>;
    cabins: Schema.Attribute.Relation<'oneToMany', 'api::cabin.cabin'>;
    cars: Schema.Attribute.Relation<'oneToMany', 'api::car.car'>;
    cars_on_parts: Schema.Attribute.Relation<
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::generation.generation'
    > &
      Schema.Attribute.Private;
    model: Schema.Attribute.Relation<'manyToOne', 'api::model.model'>;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.String;
    spareParts: Schema.Attribute.Relation<
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiKindSparePartKindSparePart
  extends Struct.CollectionTypeSchema {
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
    cabins: Schema.Attribute.Relation<'oneToMany', 'api::cabin.cabin'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::kind-spare-part.kind-spare-part'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    spareParts: Schema.Attribute.Relation<
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    type: Schema.Attribute.Enumeration<['regular', 'cabin']> &
      Schema.Attribute.DefaultTo<'regular'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLayoutLayout extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    footer: Schema.Attribute.Component<'general.footer', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::layout.layout'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoWidget: Schema.Attribute.Component<'general.video-widget', false>;
  };
}

export interface ApiModelModel extends Struct.CollectionTypeSchema {
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
    brand: Schema.Attribute.Relation<'manyToOne', 'api::brand.brand'>;
    cabins: Schema.Attribute.Relation<'oneToMany', 'api::cabin.cabin'>;
    cars: Schema.Attribute.Relation<'oneToMany', 'api::car.car'>;
    cars_on_parts: Schema.Attribute.Relation<
      'oneToMany',
      'api::car-on-parts.car-on-parts'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    generations: Schema.Attribute.Relation<
      'oneToMany',
      'api::generation.generation'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::model.model'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seoCabins: Schema.Attribute.Component<'seo.seo', false>;
    seoSpareParts: Schema.Attribute.Component<'seo.seo', false>;
    seoWheels: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.String;
    spareParts: Schema.Attribute.Relation<
      'oneToMany',
      'api::spare-part.spare-part'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wheels: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'>;
  };
}

export interface ApiOrderOrder extends Struct.CollectionTypeSchema {
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
    address: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.String;
    handled: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::order.order'> &
      Schema.Attribute.Private;
    patronymic: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    products: Schema.Attribute.DynamicZone<
      ['product.spare-part', 'product.tire', 'product.wheel', 'product.cabin']
    >;
    publishedAt: Schema.Attribute.DateTime;
    surname: Schema.Attribute.String;
    transactionId: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiPageAboutPageAbout extends Struct.SingleTypeSchema {
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
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    h1: Schema.Attribute.String;
    images1: Schema.Attribute.Media<'images', true>;
    images2: Schema.Attribute.Media<'images', true>;
    images3: Schema.Attribute.Media<'images', true>;
    images4: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-about.page-about'
    > &
      Schema.Attribute.Private;
    mainImageLeft: Schema.Attribute.Media<'images'>;
    mainPrinciplesImageRight: Schema.Attribute.Media<'images'>;
    mainPrinciplesTextAfterImages3: Schema.Attribute.RichText;
    mainPrinciplesTextLeft: Schema.Attribute.RichText;
    mainPrinciplesTitle: Schema.Attribute.String;
    mainTextRight: Schema.Attribute.RichText;
    nuancesText: Schema.Attribute.RichText;
    nuancesTitle: Schema.Attribute.String;
    pricesLeftImage: Schema.Attribute.Media<'images'>;
    pricesRightText: Schema.Attribute.RichText;
    pricesTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whyNeedServicesText: Schema.Attribute.RichText;
    whyNeedServicesTextAfterImages2: Schema.Attribute.RichText;
    whyNeedServicesTitle: Schema.Attribute.String;
  };
}

export interface ApiPageArticlePageArticle extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-article.page-article'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageAutocomisPageAutocomis extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-autocomis.page-autocomis'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageAwaitingCarPageAwaitingCar
  extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-awaiting-car.page-awaiting-car'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageBuybackCarPageBuybackCar
  extends Struct.SingleTypeSchema {
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
    advantages: Schema.Attribute.Text;
    advantagesRightImage: Schema.Attribute.Media<'images'>;
    advantagesTitle: Schema.Attribute.String;
    anyCarsAfter: Schema.Attribute.Component<'general.card', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 6;
        },
        number
      >;
    applicationLeftText: Schema.Attribute.RichText;
    buyAnyCarsTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    h1: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-buyback-car.page-buyback-car'
    > &
      Schema.Attribute.Private;
    mainBackgroundImage: Schema.Attribute.Media<'images'>;
    mainBackgroundLeftImage: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    purchasedCarsTitle: Schema.Attribute.String;
    sellCarTitle: Schema.Attribute.String;
    sellImage: Schema.Attribute.Media<'images'>;
    sellSteps: Schema.Attribute.Component<'general.card-without-image', true>;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weProvide: Schema.Attribute.Component<'general.card', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 3;
        },
        number
      >;
    weProvideTitle: Schema.Attribute.String;
    whyWe: Schema.Attribute.Text;
    whyWeLeftImage: Schema.Attribute.Media<'images'>;
    whyWeTitle: Schema.Attribute.String;
  };
}

export interface ApiPageCabinPageCabin extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-cabin.page-cabin'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    textCategory: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageCarDismantlingPhotoPageCarDismantlingPhoto
  extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    images: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-car-dismantling-photo.page-car-dismantling-photo'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageCarsOnPartPageCarsOnPart
  extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-cars-on-part.page-cars-on-part'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageCompanyPhotoPageCompanyPhoto
  extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    images: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-company-photo.page-company-photo'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageContactPageContact extends Struct.SingleTypeSchema {
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
    askText: Schema.Attribute.RichText;
    askTitle: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    h1: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-contact.page-contact'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    phone1: Schema.Attribute.String;
    phone2: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    requisites: Schema.Attribute.Media<'images', true>;
    requisitesTitle: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageDeliveryPageDelivery extends Struct.SingleTypeSchema {
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
    courierDescription: Schema.Attribute.Component<
      'general.label-and-value',
      true
    >;
    courierTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryCitiesDescription: Schema.Attribute.Component<
      'general.label-and-value',
      true
    >;
    deliveryCitiesTitle: Schema.Attribute.String;
    h1: Schema.Attribute.String;
    images1: Schema.Attribute.Media<'images', true>;
    images2: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-delivery.page-delivery'
    > &
      Schema.Attribute.Private;
    mainImageLeft: Schema.Attribute.Media<'images'>;
    mainTextRight: Schema.Attribute.RichText;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    shipmentImageRight: Schema.Attribute.Media<'images'>;
    shipmentText: Schema.Attribute.RichText;
    shipmentTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageGuaranteePageGuarantee extends Struct.SingleTypeSchema {
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
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    guaranteeNotApplyText: Schema.Attribute.RichText;
    guaranteeNotApplyTitle: Schema.Attribute.String;
    h1: Schema.Attribute.String;
    images1: Schema.Attribute.Media<'images', true>;
    images2: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-guarantee.page-guarantee'
    > &
      Schema.Attribute.Private;
    mainLeftImage: Schema.Attribute.Media<'images'>;
    mainRightText: Schema.Attribute.RichText;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    warningLeftImage: Schema.Attribute.Media<'images'>;
    warningRightText: Schema.Attribute.Text;
    warningTitle: Schema.Attribute.String;
  };
}

export interface ApiPageHowToGetToPageHowToGetTo
  extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-how-to-get-to.page-how-to-get-to'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    text: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface ApiPageInstallmentPlanPageInstallmentPlan
  extends Struct.SingleTypeSchema {
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
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-installment-plan.page-installment-plan'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageMainPageMain extends Struct.SingleTypeSchema {
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
    autocomises: Schema.Attribute.Relation<
      'oneToMany',
      'api::autocomis.autocomis'
    >;
    banner: Schema.Attribute.Media<'images'>;
    bannerMobile: Schema.Attribute.Media<'images'>;
    benefits: Schema.Attribute.Component<'general.link-and-image', true>;
    benefitsLeftText: Schema.Attribute.RichText;
    benefitsRightImage: Schema.Attribute.Media<'images'>;
    benefitsTitle: Schema.Attribute.String;
    blogLeftText: Schema.Attribute.RichText;
    blogRightText: Schema.Attribute.RichText;
    blogTitle: Schema.Attribute.String;
    categoryImages: Schema.Attribute.Media<'images', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryText: Schema.Attribute.RichText;
    deliveryTitle: Schema.Attribute.String;
    h1: Schema.Attribute.String;
    leftSideText: Schema.Attribute.RichText;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-main.page-main'
    > &
      Schema.Attribute.Private;
    popularBrandsTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    reviewsTitle: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    serviceStations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-station.service-station'
    >;
    subH1: Schema.Attribute.String;
    titleCategories: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoUrl: Schema.Attribute.String;
  };
}

export interface ApiPagePaymentPagePayment extends Struct.SingleTypeSchema {
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
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-payment.page-payment'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageProductCabinPageProductCabin
  extends Struct.SingleTypeSchema {
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
    additionalDescription: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-product-cabin.page-product-cabin'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    textAfterBenefits: Schema.Attribute.RichText;
    textAfterDescription: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageProductSparePartPageProductSparePart
  extends Struct.SingleTypeSchema {
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
    additionalDescription: Schema.Attribute.RichText;
    autoSynonyms: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0430\u0432\u0442\u043E,\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-product-spare-part.page-product-spare-part'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    textAfterBenefits: Schema.Attribute.RichText;
    textAfterDescription: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageProductTirePageProductTire
  extends Struct.SingleTypeSchema {
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
    additionalDescription: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-product-tire.page-product-tire'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    textAfterBenefits: Schema.Attribute.RichText;
    textAfterDescription: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageProductWheelPageProductWheel
  extends Struct.SingleTypeSchema {
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
    additionalDescription: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-product-wheel.page-product-wheel'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    textAfterBenefits: Schema.Attribute.RichText;
    textAfterDescription: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageProductPageProduct extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-product.page-product'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whyWeBest: Schema.Attribute.Component<'general.link-and-image', true>;
  };
}

export interface ApiPageReviewPageReview extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-review.page-review'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageServiceStationPageServiceStation
  extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-service-station.page-service-station'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageSparePartPageSparePart extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-spare-part.page-spare-part'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    textCategory: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageTirePageTire extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-tire.page-tire'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    textCategory: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPageVacancyPageVacancy extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-vacancy.page-vacancy'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.short-seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vacancies: Schema.Attribute.Component<'page-vacancies.vacancies', true>;
  };
}

export interface ApiPageWheelPageWheel extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-wheel.page-wheel'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    textCategory: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReviewReview extends Struct.CollectionTypeSchema {
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
    authorName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::review.review'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceStationServiceStation
  extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-station.service-station'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiShoppingCartShoppingCart
  extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::shopping-cart.shopping-cart'
    > &
      Schema.Attribute.Private;
    product: Schema.Attribute.DynamicZone<
      ['product.spare-part', 'product.tire', 'product.wheel']
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    uid: Schema.Attribute.UID & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usersPermissionsUser: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiSparePartSparePart extends Struct.CollectionTypeSchema {
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
    bodyStyle: Schema.Attribute.String;
    brand: Schema.Attribute.Relation<'manyToOne', 'api::brand.brand'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'\u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u044C, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u0440\u043E\u0448\u043B\u0430 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u043F\u0435\u0440\u0435\u0434 \u043F\u0440\u043E\u0434\u0430\u0436\u0435\u0439. \u041E\u043D\u0430 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0434\u0430\u043D\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 \u0430\u0432\u0442\u043E. \u0422\u043E\u0432\u0430\u0440 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0445\u043E\u0440\u043E\u0448\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0438 \u0433\u043E\u0442\u043E\u0432 \u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435. \u0412 \u0445\u043E\u0440\u043E\u0448\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438. \u0418\u0437 \u0415\u0432\u0440\u043E\u043F\u044B. \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430'>;
    discountPrice: Schema.Attribute.Decimal;
    discountPriceUSD: Schema.Attribute.Integer;
    engine: Schema.Attribute.String;
    engineNumber: Schema.Attribute.String;
    fuel: Schema.Attribute.Enumeration<
      [
        '\u0431\u0435\u043D\u0437\u0438\u043D',
        '\u0434\u0438\u0437\u0435\u043B\u044C',
        '\u044D\u043B\u0435\u043A\u0442\u0440\u043E',
        '\u0433\u0438\u0431\u0440\u0438\u0434',
      ]
    >;
    generation: Schema.Attribute.Relation<
      'manyToOne',
      'api::generation.generation'
    >;
    h1: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    kindSparePart: Schema.Attribute.Relation<
      'manyToOne',
      'api::kind-spare-part.kind-spare-part'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::spare-part.spare-part'
    > &
      Schema.Attribute.Private;
    model: Schema.Attribute.Relation<'manyToOne', 'api::model.model'>;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    priceRUB: Schema.Attribute.Decimal;
    priceUSD: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'h1'>;
    snippets: Schema.Attribute.Component<'product.snippets', false>;
    sold: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    transmission: Schema.Attribute.Enumeration<
      [
        '\u0430\u043A\u043F\u043F',
        '\u043C\u043A\u043F\u043F',
        '\u0440\u043E\u0431\u043E\u0442',
        '\u0432\u0430\u0440\u0438\u0430\u0442\u043E\u0440',
      ]
    >;
    type: Schema.Attribute.Enumeration<['sparePart']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'sparePart'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoLink: Schema.Attribute.String;
    volume: Schema.Attribute.Relation<
      'manyToOne',
      'api::engine-volume.engine-volume'
    >;
    year: Schema.Attribute.Integer;
  };
}

export interface ApiTireBrandTireBrand extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tire-brand.tire-brand'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Unique;
    productBrandText: Schema.Attribute.Component<'brand.brand-text', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'name'>;
    tires: Schema.Attribute.Relation<'oneToMany', 'api::tire.tire'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTireDiameterTireDiameter
  extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tire-diameter.tire-diameter'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    tires: Schema.Attribute.Relation<'oneToMany', 'api::tire.tire'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTireHeightTireHeight extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tire-height.tire-height'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    tires: Schema.Attribute.Relation<'oneToMany', 'api::tire.tire'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTireWidthTireWidth extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tire-width.tire-width'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    tires: Schema.Attribute.Relation<'oneToMany', 'api::tire.tire'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTireTire extends Struct.CollectionTypeSchema {
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
    brand: Schema.Attribute.Relation<'manyToOne', 'api::tire-brand.tire-brand'>;
    count: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    diameter: Schema.Attribute.Relation<
      'manyToOne',
      'api::tire-diameter.tire-diameter'
    >;
    discountPrice: Schema.Attribute.Decimal;
    discountPriceUSD: Schema.Attribute.Integer;
    h1: Schema.Attribute.String;
    height: Schema.Attribute.Relation<
      'manyToOne',
      'api::tire-height.tire-height'
    >;
    images: Schema.Attribute.Media<'images', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::tire.tire'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    priceRUB: Schema.Attribute.Decimal;
    priceUSD: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    season: Schema.Attribute.Enumeration<
      [
        '\u0437\u0438\u043C\u043D\u0438\u0435',
        '\u043B\u0435\u0442\u043D\u0438\u0435',
        '\u0432\u0441\u0435\u0441\u0435\u0437\u043E\u043D\u043D\u044B\u0435',
      ]
    >;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'h1'>;
    snippets: Schema.Attribute.Component<'product.snippets', false>;
    sold: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<['tire']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'tire'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    width: Schema.Attribute.Relation<'manyToOne', 'api::tire-width.tire-width'>;
  };
}

export interface ApiWheelDiameterCenterHoleWheelDiameterCenterHole
  extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.Decimal & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wheels: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'>;
  };
}

export interface ApiWheelDiameterWheelDiameter
  extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::wheel-diameter.wheel-diameter'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wheels: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'>;
  };
}

export interface ApiWheelDiskOffsetWheelDiskOffset
  extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::wheel-disk-offset.wheel-disk-offset'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.Decimal & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wheels: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'>;
  };
}

export interface ApiWheelNumberHoleWheelNumberHole
  extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::wheel-number-hole.wheel-number-hole'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.Decimal & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wheels: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'>;
  };
}

export interface ApiWheelWidthWheelWidth extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::wheel-width.wheel-width'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.Decimal & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wheels: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'>;
  };
}

export interface ApiWheelWheel extends Struct.CollectionTypeSchema {
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
    brand: Schema.Attribute.Relation<'manyToOne', 'api::brand.brand'>;
    count: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    diameter: Schema.Attribute.Relation<
      'manyToOne',
      'api::wheel-diameter.wheel-diameter'
    >;
    diameterCenterHole: Schema.Attribute.Relation<
      'manyToOne',
      'api::wheel-diameter-center-hole.wheel-diameter-center-hole'
    >;
    discountPrice: Schema.Attribute.Decimal;
    discountPriceUSD: Schema.Attribute.Integer;
    diskOffset: Schema.Attribute.Relation<
      'manyToOne',
      'api::wheel-disk-offset.wheel-disk-offset'
    >;
    distanceBetweenCenters: Schema.Attribute.Decimal;
    h1: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    kind: Schema.Attribute.Enumeration<
      [
        '\u0448\u0442\u0430\u043C\u043F\u043E\u0432\u0430\u043D\u043D\u044B\u0439',
        '\u043B\u0438\u0442\u043E\u0439',
      ]
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::wheel.wheel'> &
      Schema.Attribute.Private;
    model: Schema.Attribute.Relation<'manyToOne', 'api::model.model'>;
    name: Schema.Attribute.String;
    numberHoles: Schema.Attribute.Relation<
      'manyToOne',
      'api::wheel-number-hole.wheel-number-hole'
    >;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    priceRUB: Schema.Attribute.Decimal;
    priceUSD: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'seo.seo', false>;
    slug: Schema.Attribute.UID<'h1'>;
    snippets: Schema.Attribute.Component<'product.snippets', false>;
    sold: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<['wheel']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'wheel'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    width: Schema.Attribute.Relation<
      'manyToOne',
      'api::wheel-width.wheel-width'
    >;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
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
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
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
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
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
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginInternalData extends Struct.SingleTypeSchema {
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
    bePaidTestMode: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currencyCoefficient: Schema.Attribute.Component<'general.currency', false>;
    currencyDate: Schema.Attribute.DateTime;
    dateNewProductSentToEmail: Schema.Attribute.DateTime;
    dateProductFullDescriptionGenerated: Schema.Attribute.DateTime;
    dateProductsInCsvSentToEmail: Schema.Attribute.DateTime;
    dateUpdatingImagesMetadata: Schema.Attribute.DateTime;
    dateYMLSentToEmail: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::internal.data'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
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
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
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
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
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
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
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
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
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
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
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
    address: Schema.Attribute.String;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    phone: Schema.Attribute.String;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
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
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
