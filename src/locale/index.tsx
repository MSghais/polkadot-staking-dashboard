// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DefaultLocale } from 'consts';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AnyJson } from 'types';
import { loadDefault } from './default';
import baseEn from './en/base.json';
import helpEn from './en/help.json';

let lng: string;
let dynamicLoad = false;

const localLng = localStorage.getItem('lng');

// determine the default language.
if (!localLng) {
  lng = DefaultLocale;
  localStorage.setItem('lng', DefaultLocale);
} else {
  lng = localLng;
}

// determine resources exist without dynamically importing them.
let resources: AnyJson = null;
if (lng === DefaultLocale) {
  resources = {
    en: {
      ...baseEn,
      ...helpEn,
    },
  };
} else {
  // TODO: get entire language from localStorage if exists.
  // TODO: introduce `lng_resources` localStorage item.
  dynamicLoad = true;
  resources = {
    en: {
      ...baseEn,
      ...helpEn,
    },
  };
}

// configure i18n object.
i18next.use(initReactI18next).init({
  debug: process.env.REACT_APP_DEBUG_I18N === '1',
  fallbackLng: DefaultLocale,
  lng: dynamicLoad ? DefaultLocale : lng,
  resources,
});

// dynamically load default language resources if needed.
(async () => {
  if (!dynamicLoad) {
    return;
  }
  const {
    key,
    value: { base, help },
  } = await loadDefault(lng);

  i18next.addResourceBundle(key, 'base', base);
  i18next.addResourceBundle(key, 'help', help);

  if (key !== i18next.resolvedLanguage) {
    i18next.changeLanguage(key);
  }
})();

// export i18next for context.
export { i18next };
