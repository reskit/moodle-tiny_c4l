<?php
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

namespace tiny_c4l\local;

/**
 * Utility class for tiny_c4l.
 *
 * @package    tiny_c4l
 * @copyright  2024 ISB Bayern
 * @author     Philipp Memmel
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class utils {

    public static function get_all_components(): array {
        global $DB;
        $componentrecords = $DB->get_records('tiny_c4l_component');
        $flavorrecords = $DB->get_records('tiny_c4l_flavor');
        $components = [];
        foreach ($componentrecords as $record) {
            $availableflavors = empty($record->flavor) ? array_keys($flavorrecords) : explode(',', $record->flavors);
            foreach ($availableflavors as $flavorid) {
                if (in_array($flavorid, array_keys($flavorrecords))) {
                    $components[] = [
                            'id' => $record->id,
                            'name' => $record->name,
                            'displayname' => $record->displayname,
                            'compcat' => $record->compcat,
                            'imageclass' => $record->imageclass . '_' . $flavorrecords[$flavorid]->content,
                            'code' => $record->code,
                            'text' => $record->text,
                            'flavor' => $flavorrecords[$flavorid]->content,
                            'variants' => [
                                    // TODO Get variants.
                            ]
                    ];
                }
            }
        }
        return $components;
    }

    public static function get_all_compcats(): array {
        global $DB;
        $categories = $DB->get_records('tiny_c4l_compcat');
        return array_values($categories);
    }

    public static function get_all_flavors(): array {
        global $DB;
        $flavors = $DB->get_records('tiny_c4l_flavor');
        return array_values($flavors);
    }
}
