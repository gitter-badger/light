/**
 * Created by steve on 7/31/2015.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _menus = [];
var _menuItems = [];

var MenuAdminStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getMenus: function() {
        return _menus;
    },

    getMenuItems: function() {
        return _menuItems;
    }
});

MenuAdminStore.dispatchToken = AppDispatcher.register(function(payload) {
    var type = payload.type;
    switch(type) {
        case ActionTypes.GET_ALL_MENU_RESPONSE:
            _menus = payload.json.menus;
            _menuItems = payload.json.menuItems;
            MenuAdminStore.emitChange();
            break;
    }

    return true;
});

module.exports = MenuAdminStore;
