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
import {
    get_string as getString,
    get_strings as getStrings
} from 'core/str';
import {showPreview} from './options';
import ModalEvents from 'core/modal_events';

let previewC4L = true;

/**
 * Handle action
 * @param {TinyMCE} editor
 */
export const handleAction = (editor) => {
    previewC4L = showPreview(editor);
    displayDialogue(editor);
};

const displayDialogue = async(editor) => {
    const data = Object.assign({}, {});

    // Show modal with buttons.
    const modal = await ModalFactory.create({
        type: C4LModal.TYPE,
        templateContext: await getTemplateContext(editor, data),
        large: true,
    });

    // Disable scroll on preview.
    if (previewC4L) {
        editor.targetElm.closest('body').classList.add('c4l-modal-open');
        modal.setScrollable(false);
    }
    modal.show();

    // Event listeners.
    modal.getRoot()[0].addEventListener('click', (event) => {
        handleModalClick(event, editor, modal);
    });
    modal.getRoot().on(ModalEvents.hidden, () => {
        handleModalHidden(editor);
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
 * Handle when closing the Modal.
 *
 * @param {obj} editor
 */
const handleModalHidden = (editor) => {
    editor.targetElm.closest('body').classList.remove('c4l-modal-open');
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
        const sel = editor.selection.getContent();
        const selectedButton = button.dataset.id;

        if (Components?.[selectedButton]) {
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

            editor.focus();
        }

        modal.destroy();
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
    const isPreview = event.target.className == 'c4l-eye-preview';
    const button = event.target.closest('button');

    if (isPreview && button) {
        const selectedButton = button.dataset.id;
        const node = modal.getRoot()[0].querySelector('div[data-id="code-preview-' + selectedButton + '"]');

        if (node) {
            if (show) {
                node.parentElement.classList.remove('c4l-hidden');
                node.parentElement.classList.add('c4l-visible');
                node.classList.remove('c4l-hidden');
                node.classList.add('c4l-visible');
            } else {
                node.parentElement.classList.remove('c4l-visible');
                node.parentElement.classList.add('c4l-hidden');
                node.classList.remove('c4l-visible');
                node.classList.add('c4l-hidden');
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
const getTemplateContext = async (editor, data) => {
    return Object.assign({}, {
        elementid: editor.id,
        buttons: await getButtons(editor),
        preview: previewC4L,
        textpreview: await getString('preview', component),
    }, data);
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
        if (previewC4L) {
            placeholder = (sel.length > 0 ? sel : component.text);
            componentCode = component.code;
            componentCode = componentCode.replace('{{PLACEHOLDER}}', placeholder);
        }

        buttons.push({
            id: index,
            name: strings.get(component.name),
            imageClass: component.imageClass,
            htmlcode: componentCode,
        });
    });

    return buttons;
};

/**
 * Get language strings.
 *
 * @return {object} Language strings
 */
const getAllStrings = async() => {
    const keys = [];

    Components.map((element) => {
        keys.push(element.name);
    });

    const stringValues = await getStrings(keys.map((key) => ({key, component})));
    return new Map(keys.map((key, index) => ([key, stringValues[index]])));
};
