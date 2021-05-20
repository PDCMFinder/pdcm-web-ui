// .storybook/pdcm-theme.js

import { create } from '@storybook/theming/create';

export default create({
    base: 'light',
    brandTitle: 'PDCM Finder - Component Library',
    brandUrl: 'https://www.pdxfinder.org',
    brandImage: './pdcm.png',
    colorPrimary: '#06369d',
    colorSecondary: '#00b2d5',
    // Typography
    fontBase: '"Maven Pro", sans-serif',
    fontCode: 'monospace',
});