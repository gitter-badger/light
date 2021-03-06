/**
 * Created by steve on 12/08/15.
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    addToCart: function(product) {
        AppDispatcher.dispatch({
            type: ActionTypes.ADD_PRODUCT_TO_CART,
            product: product
        });
    },

    setQty: function(cartItem, qty) {
        AppDispatcher.dispatch({
            type: ActionTypes.SET_QTY,
            cartItem: cartItem,
            qty: qty
        });
    },

    remove: function(cartItem) {
        AppDispatcher.dispatch({
            type: ActionTypes.REMOVE_CART_ITEM,
            cartItem: cartItem
        });
    },

    reset: function () {
        AppDispatcher.dispatch({
            type: ActionTypes.RESET_CART_ITEM
        });
    },

    toggleCart: function(isOpen) {
        AppDispatcher.dispatch({
            type: ActionTypes.TOGGLE_CART
        });
    }

};
