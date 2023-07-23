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
 * Tiny C4L components.
 *
 * @module      tiny_c4l/components
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const components = [
    {
        name: "keyconcept",
        type: "contextual",
        imageClass: "c4l-keyconcept-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-keyconcept\">" +
            "{{PLACEHOLDER}}</div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ['full-width']
    },
    {
        name: "tip",
        type: "contextual",
        imageClass: "c4l-tip-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-tip\">" +
            "{{PLACEHOLDER}}</div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ['full-width']
    },
    {
        name: "reminder",
        type: "contextual",
        imageClass: "c4l-reminder-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-reminder\">" +
            "{{PLACEHOLDER}}</div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ['full-width']
    },
    {
        name: "quote",
        type: "contextual",
        imageClass: "c4l-quote-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-quote\">" +
            "<div class=\"c4l-quote-body\"><div class=\"c4l-quote-line\"></div><div class=\"c4l-quote-text\">" +
            "<p>{{PLACEHOLDER}}</p>" +
            "</div></div><div class=\"c4l-quote-caption\"><span>Marcus Tullius Cicero</span>" +
            "De Finibus Bonorum et Malorum</div></div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus.",
        variants: ['full-width', 'quote']
    },
    {
        name: "dodontcards",
        type: "contextual",
        imageClass: "c4l-dodontcards-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-dodontcards\">" +
            "<div class=\"c4l-dodontcards-do\">{{PLACEHOLDER}}</div>" +
            "<div class=\"c4l-dodontcards-dont\">Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
            " Phasellus a posuere nibh, eu mollis lacus. " +
            "Praesent dictum in velit sed dapibus. Orci varius natoque penatibus et magnis dis parturient montes," +
            " nascetur ridiculus mus.</div></div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus." +
            "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        variants: ['full-width', 'dont-card-only']
    },
    {
        name: "readingcontext",
        type: "contextual",
        imageClass: "c4l-readingcontext-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-readingcontext\">" +
            "<p>{{PLACEHOLDER}}</p>" +
            "<div class=\"c4l-readingcontext-caption\"><span>Marcus Tullius Cicero</span>" +
            "De Finibus Bonorum et Malorum</div></div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo, hendrerit ac sem vitae," +
            " posuere egestas nisi. Lorem ipsum dolor sit amet. " +
            "Phasellus leo, hendrerit ac sem vitae, posuere egestas nisi.",
        variants: ['full-width', 'comfort-reading']
    },
    {
        name: "example",
        type: "contextual",
        imageClass: "c4l-example-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-example\">" +
            "<h1>Lorem ipsum dolor sit amet</h1>" +
            "<p>{{PLACEHOLDER}}</p></div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
            " Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus. Orci varius natoque penatibus et magnis dis parturient montes," +
            " nascetur ridiculus mus.",
        variants: ['full-width', 'quote', 'caption']
    },
    {
        name: "figure",
        type: "contextual",
        imageClass: "c4l-figure-icon",
        code: "<p class=\"c4l-spacer\"></p><figure class=\"c4l-figure\">" +
            "<img src=\"https://source.unsplash.com/random/800x600\" alt=\"Lorem ipsum dolor sit amet\">" +
            "<figcaption><em class=\"c4l-figure-footer\">{{PLACEHOLDER}}</em><span class=\"c4l-figure-caption\">" +
            "<strong>Font: </strong>Phasellus a posuere nibh.</span>" +
            "</figcaption></figure><p><br></p>",
        text: "Consectetur adipiscing elit.",
        variants: ['full-width', 'quote', 'caption']
    },
    {
        name: "tag",
        type: "contextual",
        imageClass: "c4l-tag-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-display-left\"><div class=\"c4l-tag\">{{PLACEHOLDER}}</div></div>",
        text: "Lorem ipsum",
        variants: ['align-left', 'align-center', 'align-right']
    },
    {
        name: "inlinetag",
        type: "contextual",
        imageClass: "c4l-inlinetag-icon",
        code: "<span class=\"c4l-inlinetag\">{{PLACEHOLDER}}</span>",
        text: "Text",
        variants: ['align-left', 'align-center', 'align-right']
    },
    {
        name: "attention",
        type: "procedural",
        imageClass: "c4l-attention-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-attention\">" +
            "{{PLACEHOLDER}}</div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ['full-width']
    },
    {
        name: "estimatedtime",
        type: "procedural",
        imageClass: "c4l-estimatedtime-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-inline-group\"><div class=\"c4l-estimatedtime\">" +
            "{{PLACEHOLDER}} <span>min</span></div></div>",
        text: "15",
        variants: ['align-left', 'align-center', 'align-right']
    },
    {
        name: "duedate",
        type: "procedural",
        imageClass: "c4l-duedate-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-inline-group\"><div class=\"c4l-duedate\">{{PLACEHOLDER}}</div></div>",
        text: "November 17th",
        variants: ['align-left', 'align-center', 'align-right']
    },
    {
        name: "proceduralcontext",
        type: "procedural",
        imageClass: "c4l-proceduralcontext-icon",
        code: "<p class=\"c4l-spacer\"></p><p class=\"c4l-proceduralcontext\">" +
            "{{PLACEHOLDER}}</p><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus." +
            " Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla quis lorem aliquet," +
            " fermentum dolor ac, venenatis turpis.",
        variants: ['full-width']
    },
    {
        name: "learningoutcomes",
        type: "procedural",
        imageClass: "c4l-learningoutcomes-icon",
        code: "<p class=\"c4l-spacer\"></p>" +
            "<div class=\"c4l-learningoutcomes\"><h6 class=\"c4l-learningoutcomes-title\">Learning Outcomes</h6>" +
            "<ul class=\"c4l-learningoutcomes-list\"><li>{{PLACEHOLDER}}</li><li>Curabitur non nulla sit amet " +
            "nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</li>" +
            "<li>Nulla porttitor accumsan tincidunt. " +
            "Curabitur aliquet quam id dui posuere blandit. Curabitur non nulla sit amet nisl tempus convallis " +
            "quis ac lectus.</li></ul></div>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta, neque id feugiat consectetur, " +
            "enim ipsum tincidunt nunc, id suscipit mauris urna sit amet lectus.",
        variants: ['full-width', 'ordered-list']
    },
    {
        name: "gradingvalue",
        type: "evaluative",
        imageClass: "c4l-gradingvalue-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-inline-group\"><div class=\"c4l-gradingvalue\">" +
            "<span>Grading value: </span>{{PLACEHOLDER}}</div></div>",
        text: "33.3%",
        variants: ['align-left', 'align-center', 'align-right']
    },
    {
        name: "expectedfeedback",
        type: "evaluative",
        imageClass: "c4l-expectedfeedback-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-expectedfeedback\">" +
            "<p>{{PLACEHOLDER}}</p></div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus.",
        variants: ['full-width']
    },
    {
        name: "allpurposecard",
        type: "helper",
        imageClass: "c4l-allpurposecard-icon",
        code: "<p class=\"c4l-spacer\"></p><div class=\"c4l-allpurposecard\">" +
            "<p>{{PLACEHOLDER}}</p></div><p><br></p>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus." +
            " Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        variants: ['full-width']
    },
];

export default {
    components,
};