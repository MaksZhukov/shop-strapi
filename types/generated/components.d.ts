import type { Attribute, Schema } from '@strapi/strapi';

export interface BrandBrandText extends Schema.Component {
  collectionName: 'components_brand_brand_texts';
  info: {
    displayName: 'Brand text';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface BrandBrandTypeProductTexts extends Schema.Component {
  collectionName: 'components_brand_brand_type_product_texts';
  info: {
    description: '';
    displayName: 'Brand type product texts';
  };
  attributes: {
    cabinTextBrand: Attribute.Component<'brand.brand-text'>;
    sparePartBrandText: Attribute.Component<'brand.brand-text'>;
    wheelTextBrand: Attribute.Component<'brand.brand-text'>;
  };
}

export interface GeneralCard extends Schema.Component {
  collectionName: 'components_general_card';
  info: {
    description: '';
    displayName: 'Card';
  };
  attributes: {
    description: Attribute.String;
    image: Attribute.Media<'images'>;
    title: Attribute.String;
  };
}

export interface GeneralCardWithoutImage extends Schema.Component {
  collectionName: 'components_general_card_without_images';
  info: {
    displayName: 'CardWithoutImage';
  };
  attributes: {
    description: Attribute.String;
    title: Attribute.String;
  };
}

export interface GeneralCurrency extends Schema.Component {
  collectionName: 'components_general_currencies';
  info: {
    displayName: 'currency';
  };
  attributes: {
    rub: Attribute.Float;
    usd: Attribute.Float;
  };
}

export interface GeneralFooter extends Schema.Component {
  collectionName: 'components_general_footers';
  info: {
    description: '';
    displayName: 'footer';
  };
  attributes: {
    firstBlock: Attribute.RichText &
      Attribute.DefaultTo<'\u00A9 2022 - \u0410\u0432\u0442\u043E\u0440\u0430\u0437\u0431\u043E\u0440\u043A\u0430 \u041F\u043E\u043B\u043E\u0442\u043A\u043E\u0432\u043E  \u041E\u041E\u041E "\u0414\u0440\u0438\u0431\u043B\u0438\u043D\u0433", 2009-2017. \u0423\u041D\u041F 590740644 . \u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 03.11.2008.'>;
    fourthBlock: Attribute.RichText &
      Attribute.DefaultTo<'\u0426\u0415\u041D\u0422\u0420 \u041E\u0411\u0421\u041B\u0423\u0416\u0418\u0412\u0410\u041D\u0418\u042F \u041A\u041B\u0418\u0415\u041D\u0422\u041E\u0412:'>;
    socials: Attribute.Component<'general.link-and-image', true>;
    textAfterPayments: Attribute.RichText;
  };
}

export interface GeneralLabelAndValue extends Schema.Component {
  collectionName: 'components_general_label_and_values';
  info: {
    displayName: 'Label&Value';
  };
  attributes: {
    label: Attribute.String;
    value: Attribute.String;
  };
}

export interface GeneralLinkAndImage extends Schema.Component {
  collectionName: 'components_general_link_and_images';
  info: {
    description: '';
    displayName: 'Link&Image';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface GeneralVideoWidget extends Schema.Component {
  collectionName: 'components_general_video_widgets';
  info: {
    displayName: 'VideoWidget';
  };
  attributes: {
    show: Attribute.Boolean & Attribute.DefaultTo<true>;
    video: Attribute.Media<'videos'>;
  };
}

export interface PageVacanciesVacancies extends Schema.Component {
  collectionName: 'components_page_vacancies_vacancies';
  info: {
    description: '';
    displayName: 'vacancies';
  };
  attributes: {
    description: Attribute.Component<'general.label-and-value', true>;
    fullTitle: Attribute.String;
    image: Attribute.Media<'images'>;
    images: Attribute.Media<'images', true>;
    requirements: Attribute.Text;
    responsibilities: Attribute.Text;
    title: Attribute.String;
    vacancy: Attribute.String;
  };
}

export interface ProductCabin extends Schema.Component {
  collectionName: 'components_product_cabins';
  info: {
    description: '';
    displayName: 'Cabin';
  };
  attributes: {
    product: Attribute.Relation<
      'product.cabin',
      'oneToOne',
      'api::cabin.cabin'
    >;
  };
}

export interface ProductSnippets extends Schema.Component {
  collectionName: 'components_product_snippets';
  info: {
    description: '';
    displayName: 'snippets';
  };
  attributes: {
    benefits: Attribute.Media<'images', true>;
    textAfterH1: Attribute.RichText;
  };
}

export interface ProductSparePart extends Schema.Component {
  collectionName: 'components_product_spare_parts';
  info: {
    displayName: 'Spare part';
  };
  attributes: {
    product: Attribute.Relation<
      'product.spare-part',
      'oneToOne',
      'api::spare-part.spare-part'
    >;
  };
}

export interface ProductTire extends Schema.Component {
  collectionName: 'components_product_tires';
  info: {
    description: '';
    displayName: 'Tire';
  };
  attributes: {
    product: Attribute.Relation<'product.tire', 'oneToOne', 'api::tire.tire'>;
  };
}

export interface ProductWheel extends Schema.Component {
  collectionName: 'components_product_wheels';
  info: {
    displayName: 'Wheel';
  };
  attributes: {
    product: Attribute.Relation<
      'product.wheel',
      'oneToOne',
      'api::wheel.wheel'
    >;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    description: '';
    displayName: 'seo';
  };
  attributes: {
    content: Attribute.RichText;
    description: Attribute.String;
    h1: Attribute.String;
    images: Attribute.Media<'images', true>;
    keywords: Attribute.String;
    title: Attribute.String;
  };
}

export interface SeoShortSeo extends Schema.Component {
  collectionName: 'components_seo_short_seos';
  info: {
    displayName: 'shortSeo';
  };
  attributes: {
    description: Attribute.String;
    keywords: Attribute.String;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
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
