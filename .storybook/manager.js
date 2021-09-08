// .storybook/manager.js

import { addons } from '@storybook/addons';
import PDCMTheme from './PDCMTheme';
addons.setConfig({
    theme: PDCMTheme,
});