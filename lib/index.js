'use strict';

// Import default styles.
require('./styles/executor-editor.css');

// Browser polyfills.
require('./vendors/polyfills');

// Defined default layout for JavaScript mode in Ace editor.
require('ace-builds/src-min/ace');
require('ace-builds/src-min/ext-language_tools');
require('ace-builds/src-min/mode-javascript');
require('ace-builds/src-min/theme-tomorrow');

import ExecutorManager from './scripts/executor-manager';
import pkg from '../package.json';

let parseSettings = ($editor) => {
    let settings = {};
    let supportedParams = ['fontSize', 'autoExecDelay', 'width', 'height'];
    let $attributes = $editor.dataset;

    supportedParams.forEach((param) => {
        if (Number($attributes[param])) {
            settings[param] = Number($attributes[param]);
        }
    });

    return settings;
};

let ExecutorEditor = {
    VERSION: pkg.version,
    AUTHOR: pkg.author,
    LICENSE: pkg.license,

    setup: () => {
        let $editors = window.document.querySelectorAll('.executor-editor');

        Array.prototype.forEach.call($editors, ($editor) => {
            let settings = parseSettings($editor);

            return new ExecutorManager($editor, settings);
        });
    }
};

module.exports = ExecutorEditor;
