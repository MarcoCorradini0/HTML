import type { Schema, Struct } from '@strapi/strapi';

export interface CardsCardBase extends Struct.ComponentSchema {
  collectionName: 'components_cards_card_bases';
  info: {
    displayName: 'CardBase';
  };
  attributes: {
    CreatedDatetime: Schema.Attribute.DateTime;
    Image: Schema.Attribute.Media<'images' | 'files'>;
    Price: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.card-base': CardsCardBase;
    }
  }
}
