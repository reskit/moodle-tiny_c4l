<?php
// This file is part of Moodle - https://moodle.org/
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
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Tiny C4L plugin settings.
 *
 * @package     tiny_c4l
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage('tiny_c4l_settings', new lang_string('pluginname', 'tiny_c4l'));

    if ($ADMIN->fulltree) {
        // Configure component preview.
        $name = get_string('enablepreview', 'tiny_c4l');
        $desc = get_string('enablepreview_desc', 'tiny_c4l');
        $default = 1;
        $setting = new admin_setting_configcheckbox('tiny_c4l/enablepreview', $name, $desc, $default);
        $settings->add($setting);

        // Configure available students' components.
        $components = [
            'keyconcept' => get_string('keyconcept', 'tiny_c4l'),
            'tip' => get_string('tip', 'tiny_c4l'),
            'reminder' => get_string('reminder', 'tiny_c4l'),
            'quote' => get_string('quote', 'tiny_c4l'),
            'dodontcards' => get_string('dodontcards', 'tiny_c4l'),
            'readingcontext' => get_string('readingcontext', 'tiny_c4l'),
            'example' => get_string('example', 'tiny_c4l'),
            'figure' => get_string('figure', 'tiny_c4l'),
            'tag' => get_string('tag', 'tiny_c4l'),
            'inlinetag' => get_string('inlinetag', 'tiny_c4l'),
            'attention' => get_string('attention', 'tiny_c4l'),
            'allpurposecard' => get_string('allpurposecard', 'tiny_c4l')
        ];
        $name = get_string('aimedatstudents', 'tiny_c4l');
        $desc = get_string('aimedatstudents_desc', 'tiny_c4l');
        $setting = new admin_setting_configmulticheckbox('tiny_c4l/aimedatstudents', $name, $desc, $components, $components);
        $settings->add($setting);


        // Configure not intended students' components.
        $components = [
            'estimatedtime' => get_string('estimatedtime', 'tiny_c4l'),
            'duedate' => get_string('duedate', 'tiny_c4l'),
            'proceduralcontext' => get_string('proceduralcontext', 'tiny_c4l'),
            'gradingvalue' => get_string('gradingvalue', 'tiny_c4l'),
            'expectedfeedback' => get_string('expectedfeedback', 'tiny_c4l'),
            'learningoutcomes' => get_string('learningoutcomes', 'tiny_c4l'),
        ];
        $name = get_string('notintendedforstudents', 'tiny_c4l');
        $desc = get_string('notintendedforstudents_desc', 'tiny_c4l');
        $setting = new admin_setting_configmulticheckbox('tiny_c4l/notintendedforstudents', $name, $desc, [], $components);
        $settings->add($setting);
    }
}
