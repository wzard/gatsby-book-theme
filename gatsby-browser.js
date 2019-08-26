import 'normalize.css';
import '@reach/dialog/styles.css';
import 'katex/dist/katex.min.css';
import './src/styles/global.css';
import { wrapRootElement as wrap } from './src/components/wrap-root-element';
require('prismjs/themes/prism-tomorrow.css');

export const wrapRootElement = wrap;
