/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, DefaultRoute, RouteHandler, Link} = Router;

require('css/side-navbar.css');

const navItems = [
    [
        {'about': 'About'},
        //{'quick-start': 'Quick Start'},
        {'installation': 'Installation'},
       // {'examples': 'Examples'}
    ],
    [
        {'dispatcher': 'Dispatcher'},
        {'controller-views': 'Controller Views'},
        {'stores': 'Immutable Stores'},
        {'action-creators': 'Action Creators'},
        {'constant-collections': 'Constant Collections'}
    ],
    [
        {'debugging': 'Debugging'},
        {'testing': 'Test Utilities'},
        {'invariants': 'Common Errors'}
    ],
    [
        {'development': 'Development'}
    ]
];

export default React.createClass({
    displayName: 'DocsNav',
    mixins: [Router.State],
    getRouteLinks() {
        let result = [];
        let path = this.getPath();
        let currentRoute = path.substring(path.lastIndexOf('/') + 1);

        for (var navBlockIndex in navItems) {
            let navBlock = navItems[navBlockIndex];

            if (+navBlockIndex !== 0 &&
                +navBlockIndex !== navItems.length - 1) {

                result.push(
                    <li className="divider"></li>
                );
            }
            for (var navItemIndex in navBlock) {
                let navItem = navBlock[navItemIndex];
                let route = Object.keys(navItem)[0];

                result.push(
                    <li>
                        <Link
                            className={currentRoute === route ? 'active': ''}
                            to={route}
                        >
                            {navItem[route]}
                        </Link>
                    </li>
                );
            }
        }
        return result;
    },
    render() {

        return (
            <div className='row docs-container'>
                <div className='col-sm-1'/>
                <div className='col-sm-2'>
                    <ul id='sidebar' className='nav nav-stacked'>
                        {this.getRouteLinks()}
                    </ul>
                </div>
                <div className='col-sm-6'>
                    <RouteHandler {...this.props} />
                </div>
                <div className='col-sm-3'/>
            </div>
        );
    }
});