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
    }
}
