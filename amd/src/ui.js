// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny C4L UI.
 *
 * @module      tiny_c4l/ui
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {component} from './common';
import C4LModal from './modal';
import ModalFactory from 'core/modal_factory';
import {components as Components} from './components';
import {get_strings as getStrings} from 'core/str';
import {
    isStudent,
    getallowedComponents,
    showPreview
} from './options';
import ModalEvents from 'core/modal_events';

let userStudent = false;
let previewC4L = true;
let allowedComponents = [];
let Contexts = [];

/**
 * Handle action
 * @param {TinyMCE} editor
 */
export const handleAction = (editor) => {
    userStudent = isStudent(editor);
    previewC4L = showPreview(editor);
    allowedComponents = getallowedComponents(editor);
    displayDialogue(editor);
};

/**
 * Display modal
 * @param  {TinyMCE} editor
 */
const displayDialogue = async(editor) => {
    const data = Object.assign({}, {});

    // Show modal with buttons.
    const modal = await ModalFactory.create({
        type: C4LModal.TYPE,
        templateContext: await getTemplateContext(editor, data),
        large: true,
    });

    // Set modal size when no preview.
    if (!previewC4L) {
        editor.targetElm.closest('body').classList.add('c4l-modal-no-preview');
    }
    modal.show();

    // Event listeners.
    modal.getRoot()[0].addEventListener('click', (event) => {
        handleModalClick(event, editor, modal);
    });
    modal.getRoot().on(ModalEvents.hidden, () => {
        handleModalHidden(editor);
    });
    modal.getRoot()[0].querySelector('.c4l-select-filter').addEventListener('change', (event) => {
       handleModalChange(event, modal);
    });
    if (previewC4L) {
        modal.getRoot()[0].addEventListener('mouseover', (event) => {
            handleModalMouseEvent(event, modal, true);
        });
        modal.getRoot()[0].addEventListener('mouseout', (event) => {
            handleModalMouseEvent(event, modal, false);
        });
    }
};

/**
 * Handle a change within filter select.
 *
 * @param {MouseEvent} event The change event
 * @param {obj} modal
 */
const handleModalChange = (event, modal) => {
    const select = event.target.closest('select');

    if (select) {
        const currentContext = select.value;
        if (Contexts.indexOf(currentContext) !== -1) {
            // Select current button.
            const buttons = modal.getRoot()[0].querySelectorAll('.c4l-buttons-filters button');
            buttons.forEach(node => node.classList.remove('c4l-button-filter-enabled'));
            const button = modal.getRoot()[0].querySelector('.c4l-button-filter[data-filter="' + currentContext + '"]');
            button.classList.add('c4l-button-filter-enabled');

            // Show/hide component buttons.
            showContextButtons(modal, currentContext);
        }
    }
};

/**
 * Handle when closing the Modal.
 *
 * @param {obj} editor
 */
const handleModalHidden = (editor) => {
    editor.targetElm.closest('body').classList.remove('c4l-modal-no-preview');
};

/**
 * Handle a click within the Modal.
 *
 * @param {MouseEvent} event The click event
 * @param {obj} editor
 * @param {obj} modal
 */
const handleModalClick = (event, editor, modal) => {
    const button = event.target.closest('button');

    if (button) {
        const selectedButton = button.dataset.id;

        // Component button.
        if (Components?.[selectedButton]) {
            const sel = editor.selection.getContent();
            let componentCode = Components[selectedButton].code;
            const placeholder = (sel.length > 0 ? sel : Components[selectedButton].text);

            // Create a new node to replace the placeholder.
            const timestamp = new Date().getTime();
            const randomId = Math.round(Math.random() * 100000) + '-' + timestamp;
            const newNode = document.createElement('span');
            newNode.dataset.id = randomId;
            newNode.innerHTML = placeholder;
            componentCode = componentCode.replace('{{PLACEHOLDER}}', newNode.outerHTML);

            // Sets new content.
            editor.selection.setContent(componentCode);

            // Select text.
            const nodeSel = editor.dom.select('span[data-id="' + randomId + '"]');
            if (nodeSel?.[0]) {
                editor.selection.select(nodeSel[0]);
            }

            modal.destroy();
            editor.focus();
        } else {
            const currentContext = button.dataset.filter;
            // Filter button.
            if (Contexts.indexOf(currentContext) !== -1) {
                // Select current button.
                const buttons = modal.getRoot()[0].querySelectorAll('.c4l-buttons-filters button');
                buttons.forEach(node => node.classList.remove('c4l-button-filter-enabled'));
                button.classList.add('c4l-button-filter-enabled');

                // Select current option in select.
                const select = modal.getRoot()[0].querySelector('.c4l-select-filter');
                select.selectedIndex = Contexts.indexOf(currentContext);

                // Show/hide component buttons.
                showContextButtons(modal, currentContext);
            }
        }
    }
};

/**
 * Handle a mouse event within the Modal.
 *
 * @param {MouseEvent} event The click event
 * @param {obj} modal
 * @param {bool} show
 */
const handleModalMouseEvent = (event, modal, show) => {
    const isPreview = event.target.classList.contains('c4lt-dialog-button');
    const button = event.target.closest('button');

    if (isPreview && button) {
        const selectedButton = button.dataset.id;
        const node = modal.getRoot()[0].querySelector('div[data-id="code-preview-' + selectedButton + '"]');
        const previewDefault = modal.getRoot()[0].querySelector('div[data-id="code-preview-default"]');

        if (node) {
            if (show) {
                previewDefault.classList.toggle('c4l-hidden');
                node.classList.toggle('c4l-hidden');
            } else {
                node.classList.toggle('c4l-hidden');
                previewDefault.classList.toggle('c4l-hidden');
            }
        }
    }
};

/**
 * Get the template context for the dialogue.
 *
 * @param {Editor} editor
 * @param {object} data
 * @returns {object} data
 */
const getTemplateContext = async(editor, data) => {
    return Object.assign({}, {
        elementid: editor.id,
        buttons: await getButtons(editor),
        filters: await getFilters(),
        preview: previewC4L,
    }, data);
};

/**
 * Get the C4L filters for the dialogue.
 *
 * @returns {object} data
 */
const getFilters = async() => {
    const filters = [];
    const stringValues = await getStrings(Contexts.map((key) => ({key, component})));

    // Iterate over contexts.
    Contexts.map((context, index) => {
        filters.push({
            name: stringValues[index],
            type: context,
            filterClass: index === 0 ? 'c4l-button-filter-enabled' : '',
        });
    });

    return filters;
};

/**
 * Get the C4L buttons for the dialogue.
 *
 * @param {Editor} editor
 * @returns {object} data
 */
const getButtons = async(editor) => {
    const buttons = [];
    const strings = await getAllStrings();
    const sel = editor.selection.getContent();
    let componentCode = '';
    let placeholder = '';

    // Iterate over components.
    Components.map((component, index) => {
        if (!userStudent || (userStudent && allowedComponents.includes(component.name))) {
            if (previewC4L) {
                placeholder = (sel.length > 0 ? sel : component.text);
                componentCode = component.code;
                componentCode = componentCode.replace('{{PLACEHOLDER}}', placeholder);
            }

            // Save contexts.
            if (Contexts.indexOf(component.type) === -1) {
                Contexts.push(component.type);
            }

            buttons.push({
                id: index,
                name: strings.get(component.name),
                type: component.type,
                imageClass: component.imageClass,
                htmlcode: componentCode,
            });

            // Add class to hide button.
            if (Contexts.indexOf(component.type) !== 0) {
                buttons[buttons.length - 1].imageClass += ' c4l-hidden';
            }
        }
    });

    return buttons;
};

/**
 * Show/hide buttons depend on selected context.
 * @param  {object} modal
 * @param  {String} context
 */
const showContextButtons = (modal, context) => {
    const showNodes = modal.getRoot()[0].querySelectorAll('button[data-type="' + context + '"]');
    const hideNodes = modal.getRoot()[0].querySelectorAll('button[data-type]:not([data-type="' + context + '"])');

    showNodes.forEach(node => node.classList.remove('c4l-hidden'));
    hideNodes.forEach(node => node.classList.add('c4l-hidden'));
};

/**
 * Get language strings.
 *
 * @return {object} Language strings
 */
const getAllStrings = async() => {
    const keys = [];

    Components.map(element => keys.push(element.name));

    const stringValues = await getStrings(keys.map((key) => ({key, component})));
    return new Map(keys.map((key, index) => ([key, stringValues[index]])));
};
