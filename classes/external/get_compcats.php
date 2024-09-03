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

namespace tiny_c4l\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_multiple_structure;
use core_external\external_single_structure;
use core_external\external_value;

/**
 * Web service to retrieve the components.
 *
 * @package    tiny_c4l
 * @copyright  2024 ISB Bayern
 * @author     Philipp Memmel
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class get_compcats extends external_api {
    /**
     * Describes the parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        // TODO Refactor to accept the contextid of the tiny editor
        return new external_function_parameters ([]);
    }

    /**
     * Retrieve the components.
     *
     * @return array associative array containing the aggregated information for all the components
     */
    public static function execute(): array {
        // We usually need to call validate_parameters, but we do not have any (yet).
        $context = \context_system::instance();
        self::validate_context($context);
        // TODO Readd capability check based on the context id which should be submitted
        //require_capability('tiny/c4l:viewplugin', $context);

        return \tiny_c4l\local\utils::get_all_compcats();
    }

    /**
     * Describes the return structure of the service.
     *
     * @return external_multiple_structure the return structure
     */
    public static function execute_returns(): external_multiple_structure {
        return new external_multiple_structure(
                new external_single_structure([
                        'id' => new external_value(PARAM_INT, 'the id o the category'),
                        'name' => new external_value(PARAM_TEXT, 'the name of the category'),
                        'displayname' => new external_value(PARAM_TEXT, 'the display name of the category'),
                        'order' => new external_value(PARAM_INT, 'the component category the component belongs to'),
                ], 'a component category')
        );
    }
}
