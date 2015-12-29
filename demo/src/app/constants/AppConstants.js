/*
 * Copyright 2015 Network New Technologies Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var keyMirror = require('fbjs/lib/keyMirror');

module.exports = {
    Host: 'example',

    APIRoot:  '/api/rs',

    ClientId: 'example@Browser',

    ActionTypes: keyMirror({
        // Auth
        LOGIN_REQUEST: null,
        LOGIN_RESPONSE: null,
        REFRESH: null,
        LOGOUT: null,
        INIT: null,
        SIGNUP_REQUEST: null,

        // Menu
        LOAD_MENU: null,
        RECEIVE_MENU: null,
        // Routes
        REDIRECT: null,

        // Blog
        LOAD_BLOGS: null,
        RECEIVE_BLOGS: null,
        LOAD_BLOG: null,
        RECEIVE_BLOG: null,
        CREATE_BLOG: null,
        RECEIVE_CREATED_BLOG: null,

        // Commerce
        RECEIVE_CATALOG: null,
        RECEIVE_PRODUCTS: null,
        ADD_PRODUCT_TO_CART: null,
        SET_PRODUCT_VARIANT: null, // set product variation
        SET_QTY: null,
        REMOVE_CART_ITEM: null,
        SET_PRODUCT_INVENTORY: null,
        REMOVE_ONE_FROM_INVENTORY: null,
        TOGGLE_CART: null, // Open/close cart
        LOAD_CATALOG: null,
        SELECT_CATALOG: null,
        LOAD_PRODUCTS: null,
        RECEIVE_USER: null,

        // Form
        GET_FORM: null,
        RECEIVE_FORM: null,
        SUBMIT_FORM_RESPONSE: null,

        // Address
        UPDATE_SHIPPING_ADDRESS: null,
        UPD_SHIPPING_ADDRESS_RESPONSE: null,
        CONFIRM_SHIPPING_ADDRESS_REQUEST: null,
        CONFIRM_SHIPPING_ADDRESS_RESPONSE: null,

        // Payment
        GET_CLIENT_TOKEN: null,
        RECEIVE_CLIENT_TOKEN: null,
        ADD_TRANSACTION: null,
        RECEIVE_ADD_TRANSACTION: null,

        // Order
        ADD_ORDER: null,
        RECEIVE_ADD_ORDER: null

    }),

    monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

};