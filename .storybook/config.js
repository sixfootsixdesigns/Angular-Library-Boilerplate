import { configure } from '@storybook/angular';

const req = require.context('../projects/library/src', true, /\.stories\.ts$/)

configure(() => {
  req.keys().forEach((filename) => req(filename));
}, module);
