/**
 * Libraries
 */
import Prism from 'prismjs';
import AOS from 'aos';
import 'prismjs/components/prism-j';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/plugins/keep-markup/prism-keep-markup';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup.js';
import 'prismjs/plugins/show-language/prism-show-language.min.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import html from 'js-beautify';

/**
 * AOS code for presentation
 */
AOS.init({
  once: true
});

Prism.hooks.add('before-highlight', function(env) {
  if (env.language === 'markup') {
    const formatted = html.html_beautify(env.element.innerText)
      .replace(/(^[ \t]*\n)/gm, '');
    env.code = formatted;
  }
  if (env.language === 'js') {
    const formatted = html.js_beautify(env.element.innerText)
      .replace(/(^[ \t]*\n)/gm, '');
    env.code = formatted;
  }
});
