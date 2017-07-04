/*
MIT License

Copyright (c) 2017 Davide Trisolini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
(function ($, window, document) {
  'use strict';
  var pluginName = 'ariaTabs', // the name of the plugin
    a = {
      aHi: 'aria-hidden',
      aSe: 'aria-selected',
      aCs: 'aria-controls',
      aLab: 'aria-labelledby',
      tbI: 'tabindex',
      r: 'role',

      t: 'true',
      f: 'false'
    },
    count = 0;




  function AriaTabs(element, userSettings) {
    var self = this;
    self.settings = $.extend({}, $.fn[pluginName].defaultSettings, userSettings);
    self.element = $(element); //the tabs group element
    self.nav = self.element.find('.' + self.settings.navClass); //the nav, container of the tablist
    self.list = self.element.find('.' + self.settings.listClass); //the list
    self.panelsContainer = self.element.find('.' + self.settings.panelsContainerClass); //the container of all tabpanels
    self.elements = {
      listItems: self.list.find('.' + self.settings.listItemClass), // the list items
      tabBtns: self.list.find('.' + self.settings.btnClass), //the tab buttons
      panel: self.panelsContainer.find('.' + self.settings.tabpanelClass),
      content: self.panelsContainer.find('.' + self.settings.contentClass)
    }

    //call init
    self.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(AriaTabs.prototype, {
    init: function () {
      var self = this,
          settings = self.settings,
          elements = self.elements;
      
      //
      
    },
    select: function () {

    },
    deselect: function () {

    },
    methodCaller: function () {

    }
  });




  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (userSettings) {
    return this.each(function () {
      var self = this;
      /*
       * If following conditions matches, then the plugin must be initialsied:
       * Check if the plugin is instantiated for the first time
       * Check if the argument passed is an object or undefined (no arguments)
       */
      if (!$.data(self, 'plugin_' + pluginName) && (typeof userSettings === 'object' || typeof userSettings === 'undefined')) {
        $.data(self, 'plugin_' + pluginName, new AriaTabs(self, userSettings));
      } else if (typeof userSettings === 'string') {
        $.data(self, 'plugin_' + pluginName).methodCaller(userSettings);
      }
    });
  };


  //Define default settings
  $.fn[pluginName].defaultSettings = {
    navClass: 'tab-group__tab-nav',
    listClass: 'tab-group__tab-ul',
    listItemClass: 'tab-group__tab-li',
    btnClass: 'tab-group__tab-btn',
    panelsContainerClass: 'tab-group__tabs-cont',
    tabpanelClass: 'tab-group__tabpanel',
    contentClass: 'tab-group__tab-content',
    contentRole: 'document',
    btnSelectedClass: 'tab-group__tab-btn_selected',
    panelSelectedClass: 'tab-group__tabpanel_selected',
    fadeSpeed: 300,
    cssTransitions: false
  };
}(jQuery, window, document));

$(document).ready(function () {
  $('tab-group').ariaTabs({
    contentRole: ['document', 'application', 'document']
  });

});
