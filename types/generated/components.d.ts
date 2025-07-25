import type { Schema, Struct } from '@strapi/strapi';

export interface BrandBrandText extends Struct.ComponentSchema {
  collectionName: 'components_brand_brand_texts';
  info: {
    displayName: 'Brand text';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface BrandBrandTypeProductTexts extends Struct.ComponentSchema {
  collectionName: 'components_brand_brand_type_product_texts';
  info: {
    description: '';
    displayName: 'Brand type product texts';
  };
  attributes: {
    cabinTextBrand: Schema.Attribute.Component<'brand.brand-text', false>;
    sparePartBrandText: Schema.Attribute.Component<'brand.brand-text', false>;
    wheelTextBrand: Schema.Attribute.Component<'brand.brand-text', false>;
  };
}

export interface GeneralCard extends Struct.ComponentSchema {
  collectionName: 'components_general_card';
  info: {
    description: '';
    displayName: 'Card';
  };
  attributes: {
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface GeneralCardWithoutImage extends Struct.ComponentSchema {
  collectionName: 'components_general_card_without_images';
  info: {
    displayName: 'CardWithoutImage';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface GeneralCurrency extends Struct.ComponentSchema {
  collectionName: 'components_general_currencies';
  info: {
    displayName: 'currency';
  };
  attributes: {
    rub: Schema.Attribute.Float;
    usd: Schema.Attribute.Float;
  };
}

export interface GeneralFooter extends Struct.ComponentSchema {
  collectionName: 'components_general_footers';
  info: {
    description: '';
    displayName: 'footer';
  };
  attributes: {
    firstBlock: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'\u00A9 2022 - \u0410\u0432\u0442\u043E\u0440\u0430\u0437\u0431\u043E\u0440\u043A\u0430 \u041F\u043E\u043B\u043E\u0442\u043A\u043E\u0432\u043E  \u041E\u041E\u041E "\u0414\u0440\u0438\u0431\u043B\u0438\u043D\u0433", 2009-2017. \u0423\u041D\u041F 590740644 . \u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 03.11.2008.'>;
    fourthBlock: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'\u0426\u0415\u041D\u0422\u0420 \u041E\u0411\u0421\u041B\u0423\u0416\u0418\u0412\u0410\u041D\u0418\u042F \u041A\u041B\u0418\u0415\u041D\u0422\u041E\u0412:'>;
    socials: Schema.Attribute.Component<'general.link-and-image', true>;
    textAfterPayments: Schema.Attribute.RichText;
  };
}

export interface GeneralLabelAndValue extends Struct.ComponentSchema {
  collectionName: 'components_general_label_and_values';
  info: {
    displayName: 'Label&Value';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface GeneralLinkAndImage extends Struct.ComponentSchema {
  collectionName: 'components_general_link_and_images';
  info: {
    description: '';
    displayName: 'Link&Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GeneralVideoWidget extends Struct.ComponentSchema {
  collectionName: 'components_general_video_widgets';
  info: {
    displayName: 'VideoWidget';
  };
  attributes: {
    show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface PageVacanciesVacancies extends Struct.ComponentSchema {
  collectionName: 'components_page_vacancies_vacancies';
  info: {
    description: '';
    displayName: 'vacancies';
  };
  attributes: {
    description: Schema.Attribute.Component<'general.label-and-value', true>;
    fullTitle: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    images: Schema.Attribute.Media<'images', true>;
    requirements: Schema.Attribute.Text;
    responsibilities: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    vacancy: Schema.Attribute.String;
  };
}

export interface ProductCabin extends Struct.ComponentSchema {
  collectionName: 'components_product_cabins';
  info: {
    description: '';
    displayName: 'Cabin';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::cabin.cabin'>;
  };
}

export interface ProductSnippets extends Struct.ComponentSchema {
  collectionName: 'components_product_snippets';
  info: {
    description: '';
    displayName: 'snippets';
  };
  attributes: {
    benefits: Schema.Attribute.Media<'images', true>;
    textAfterH1: Schema.Attribute.RichText;
  };
}

export interface ProductSparePart extends Struct.ComponentSchema {
  collectionName: 'components_product_spare_parts';
  info: {
    displayName: 'Spare part';
  };
  attributes: {
    product: Schema.Attribute.Relation<
      'oneToOne',
      'api::spare-part.spare-part'
    >;
  };
}

export interface ProductTire extends Struct.ComponentSchema {
  collectionName: 'components_product_tires';
  info: {
    description: '';
    displayName: 'Tire';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::tire.tire'>;
  };
}

export interface ProductWheel extends Struct.ComponentSchema {
  collectionName: 'components_product_wheels';
  info: {
    displayName: 'Wheel';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::wheel.wheel'>;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    description: '';
    displayName: 'seo';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    description: Schema.Attribute.String;
    h1: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    keywords: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SeoShortSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_short_seos';
  info: {
    displayName: 'shortSeo';
  };
  attributes: {
    description: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'brand.brand-text': BrandBrandText;
      'brand.brand-type-product-texts': BrandBrandTypeProductTexts;
      'general.card': GeneralCard;
      'general.card-without-image': GeneralCardWithoutImage;
      'general.currency': GeneralCurrency;
      'general.footer': GeneralFooter;
      'general.label-and-value': GeneralLabelAndValue;
      'general.link-and-image': GeneralLinkAndImage;
      'general.video-widget': GeneralVideoWidget;
      'page-vacancies.vacancies': PageVacanciesVacancies;
      'product.cabin': ProductCabin;
      'product.snippets': ProductSnippets;
      'product.spare-part': ProductSparePart;
      'product.tire': ProductTire;
      'product.wheel': ProductWheel;
      'seo.seo': SeoSeo;
      'seo.short-seo': SeoShortSeo;
    }
  }
}
