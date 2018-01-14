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


(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  }
}(function ($, window, document) {
  'use strict';
  var pluginName = 'ariaTabs', // the name of the plugin
    a = {
      aHi: 'aria-hidden',
      aSe: 'aria-selected',
      aCs: 'aria-controls',
      aLab: 'aria-labelledby',
      aOr: 'aria-orientation',
      tbI: 'tabindex',
      r: 'role',
      t: 'true',
      f: 'false'
    },
    count = 0,
    win = $(window);


  //-----------------------------------------
  //Private functions
  /*
   * set id of the element passed along
   * if the element does not have one
   * and return the id of the element
   * If no suffix is passed, then do not set it
   */
  function setId(element, idPrefix, idSuffix) {
    idSuffix = idSuffix !== undefined ? idSuffix : '';

    if (!element.is('[id]')) {
      element.attr('id', idPrefix + idSuffix);
    }
    return element.attr('id');
  }


  /*
   * Check if any of the four modifiers keys are pressed.
   */
  function checkForModifierKeys(event) {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      //none is pressed
      return true;
    }
    return false;
  }


  /*
   *
   */
  function checkBreakpoint(win, breakpoint) {
    if (win.width() >= breakpoint) {
      return true;
    }
    return false;
  }


  //-----------------------------------------
  // The actual plugin constructor
  function AriaTabs(element, userSettings) {
    var self = this;

    self.element = $(element); //the tabs group element
    self.settings = $.extend({}, $.fn[pluginName].defaultSettings, userSettings);
    self.elementId = setId(self.element, self.settings.tabGroupIdPrefix, count); // the id of the element
    self.nav = self.element.find('.' + self.settings.navClass); //the nav, container of the tablist
    self.list = self.element.find('.' + self.settings.listClass); //the list
    self.panelsContainer = self.element.find('.' + self.settings.panelsContainerClass); //the container of all tabpanels
    self.elements = {
      listItems: self.list.find('.' + self.settings.listItemClass), // the list items
      btn: self.list.find('.' + self.settings.btnClass), //the tab buttons
      panel: self.panelsContainer.find('.' + self.settings.panelClass),
      content: self.panelsContainer.find('.' + self.settings.contentClass)
    };
    self.elementsLenght = self.elements.panel.length; // the number of tabpanels in the tab group
    self.selectedTab = 0; //save the index of the selected tab


    //call init
    self.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(AriaTabs.prototype, {
    init: function () {
      var self = this,
        settings = self.settings,
        elements = self.elements,
        btn = elements.btn,
        panel = elements.panel;

      //Add roles and attributes to the groups elements
      self.nav.attr(a.r, 'tablist');
      btn.attr(a.r, 'tab');
      self.list.attr(a.r, 'none presentation');
      elements.listItems.attr(a.r, 'none presentation');

      /*
       * Check value of option verticalMode and
       * set aria-orientation to vertical, if verticalMode is enabled
       */
      if (settings.verticalMode) {
        self.nav.attr(a.aOr, 'vertical');
      }

      /*
       * We need to check if each tab and each tabpanel has an id,
       * if not we have to set it with scripting.
       * The ids of this elements are necessary to expose relationship between this elements
       * by referencing this in aria-labelledby and aria-controls
       */
      btn.each(function (index) {
        setId(btn.eq(index), self.elementId + '__btn--', count);
        setId(panel.eq(index), self.elementId + '__panel--', count);

        //reference the tab and tabpanel elements to expose relationship
        btn.eq(index).attr(a.aCs, panel.eq(index).attr('id'));
        panel.eq(index).attr(a.aLab, btn.eq(index).attr('id'));
      });


      /*
       * Set the role of the content of each panel:
       * More informations about the roles model here: https://www.w3.org/TR/wai-aria-1.1/
       * Because each panel can have a different role,
       * the option contentRole accepts both a string or an array of strings,
       * wich is used to map the role to each panel.
       * We need to check if an array or a string is passed,
       * and then set the roles accordingly.
       */
      if (typeof settings.contentRole === 'string') {
        elements.content.attr(a.r, settings.contentRole);
      } else if (Array.isArray(settings.contentRole)) {
        elements.content.each(function (index) {
          $(this).attr(a.r, settings.contentRole[index]);
        });
      }


      /*
       * Now we have to init the widget by hiding all panels except one.
       * We do this by performing a direct call to the hide and show methods.
       */
      btn.each(function (index) {
        if (index > 0) {
          self.hide(index);
        } else {
          self.show(index, false);
        }
      });


      /*
       * Bind event handlers on widget buttons.
       * We use delegated events to improve code performance
       */
      self.element.on('click.' + pluginName + '.count', '.' + settings.btnClass, function () {
        var tabIndex = btn.index($(this));

        //Select the new tab, only if not yet selected
        if (tabIndex !== self.selectedTab) {
          self.toggle(tabIndex, true);
        }
      });


      /*
       * Bind keydown event for keyboard navigation.
       * As before, we use delegated events and namespaces
       * for the implemantation of keys navigation
       */
      self.element.on('keydown.' + pluginName + '.' + count, '.' + settings.btnClass, function (event) {
        self.keyboardNavigation(event);
      });


      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.initialised', [self]);


      //increment count by 1
      count = count + 1;
    },
    toggle: function (tabIndex, animate) {
      var self = this;

      self.hide(self.selectedTab);

      self.show(tabIndex, animate);
    },
    keyboardNavigation: function (event) {
      var self = this,
        elementsLenght = self.elementsLenght,
        focussedElementIndex = self.selectedTab, //placeholder variable for the index of the tab button
        pressedKey = event.keyCode, // the code of the pressed key
        newTab = 0, // a placeholder for the index of the tab to select
        vertical = self.settings.verticalMode;

      /*
       * Before performing any action we check if any of the four modifier keys
       * has been pressed during the keydown event.
       * If any modifiers keys was pressed, then we interrupt the functions execution.
       */
      if (!checkForModifierKeys(event)) {
        return false;
      }
      /*
       * If no modifeier key was pressed, we can proceed and  retrive
       8 the index of the new tab to select
       * by checking the pressed key and the index of the currenty selected tab
       */
      switch (pressedKey) {
      case 37: //left
        if (focussedElementIndex === 0) {
          newTab = elementsLenght - 1;
        } else {
          newTab = focussedElementIndex - 1;
        }
        break;
      case 39: //right
        if (focussedElementIndex === (elementsLenght - 1)) {
          newTab = 0;
        } else {
          newTab = focussedElementIndex + 1;
        }
        break;
      case 36: //home
        newTab = 0;
        break;
      case 35: //end
        newTab = elementsLenght;
        break;
      case 38: //top
        if (vertical) { //only if acting in vertical mode
          if (focussedElementIndex === 0) {
            newTab = elementsLenght - 1;
          } else {
            newTab = focussedElementIndex - 1;
          }
        } else {
          newTab = false;
        }
        break;
      case 40: //bottom
        if (vertical) { //only if acting in vertical mode
          if (focussedElementIndex === (elementsLenght - 1)) {
            newTab = 0;
          } else {
            newTab = focussedElementIndex + 1;
          }
        } else {
          newTab = false;
        }
        break;
      default:
        newTab = false;
        break;
      }

      /*
       * If the pressed key is one of the navigational key,
       * then we move focus to the new tab and select it.
       */
      if (newTab !== false) {
        event.preventDefault();
        self.elements.btn.eq(newTab).focus();
        self.toggle(newTab, true);
      }
    },
    select: function (tabIndex) {
      var self = this,
        setting = self.settings,
        elements = self.elements;

      //update classes and attributes on button
      elements.btn.eq(tabIndex)
        .addClass(setting.btnSelectedClass)
        .attr(a.tbI, '0')
        .attr(a.aSe, a.t);

      //Update classes and attributes on tabpanel
      elements.panel.eq(tabIndex)
        .addClass(setting.panelSelectedClass)
        .attr(a.aHi, a.f);

      //Update selected tab object
      self.selectedTab = tabIndex;
    },
    deselect: function (tabIndex) {
      var self = this,
        setting = self.settings,
        elements = self.elements;


      //update classes and attributes on button
      elements.btn.eq(tabIndex)
        .removeClass(setting.btnSelectedClass)
        .attr(a.tbI, '-1')
        .attr(a.aSe, a.f);

      //Update classes and attributes on tabpanel
      elements.panel.eq(tabIndex)
        .removeClass(setting.panelSelectedClass)
        .attr(a.aHi, a.t);
    },
    show: function (tabIndex, animate) {
      var self = this,
        fadeSpeed = animate ? self.settings.fadeSpeed : 0;

      //Fade in panel with js, if css transitions are disabled
      if (!self.settings.cssTransitions) {
        self.elements.panel.eq(tabIndex)
          .fadeIn(fadeSpeed);
      }

      //call select to update classes and attributes
      self.select(tabIndex);

      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.select', [self, tabIndex]);
    },
    hide: function (tabIndex) {
      var self = this;

      //Hide tabpanel if css transitions are disabled
      if (!self.settings.cssTransitions) {
        self.elements.panel.eq(tabIndex).hide();
      }

      //call deselect to update classes and attributes
      self.deselect(tabIndex);


      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.deselect', [self, tabIndex]);
    },
    methodCaller: function (methodName, methodArg) {
      /*
       * This function is the control center for any method call implemented in the plugin.
       * Because the methods accepts different arguments, the function checks the type of
       * the passed arguments and performs the needed operations in order to make a function call
       */

      var self = this;

      if (typeof methodArg !== 'number') {
        if (typeof methodArg === 'string') {
          /*
           * If the user passes a string we assum this is a jQuery selector.
           * We perform a call to the jQuery function and get the element
           */
          methodArg = $(methodArg);
        }

        if (typeof methodArg === 'object') {
          /*
           * If the user passes an object we assum this is a jQuery obejct.
           * In order to perform a method call,
           * we need to retrive the index of the passed accordion object.
           * The passed element must:
           * - be a single jQuery element object (no collection and non empty),
           * - be a tab (it must have the tab class),
           * - must be a child element of the tablist element,
           */
          if (methodArg.length === 1 &&
            methodArg.hasClass(self.settings.btnClass) &&
            methodArg.closest(self.element).length === 1) {
            methodArg = self.nav.index(methodArg);
          }
        }
      }

      /*
       * Now we have the index of the element and can perform the method call:
       * Currently only toggle can be called as external method.
       * The only accepted value for methodName is 'select'
       * We do not use toggle as method name, because this could be confusing for the author
       */
      if (methodName === 'select') {
        self.toggle(methodArg, true);
      }
    }
  });




  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (userSettings, methodArg) {
    return this.each(function () {
      var self = this;
      /*
       * If following conditions matches, then the plugin must be initialsied:
       * Check if the plugin is instantiated for the first time
       * Check if the argument passed is an object or undefined (no arguments)
       */
      if (!$.data(self, 'plugin_' + pluginName) && (typeof userSettings === 'object' || typeof userSettings === 'undefined')) {
        $.data(self, 'plugin_' + pluginName, new AriaTabs(self, userSettings));
      } else if (typeof userSettings === 'string' && typeof methodArg !== 'undefined') {
        $.data(self, 'plugin_' + pluginName).methodCaller(userSettings, methodArg);
      }
    });
  };


  //Define default settings
  $.fn[pluginName].defaultSettings = {
    tabGroupIdPrefix: 'tab-group--',
    navClass: 'tab-group__tab-nav',
    listClass: 'tab-group__tab-ul',
    listItemClass: 'tab-group__tab-li',
    btnClass: 'tab-group__tab-btn',
    panelsContainerClass: 'tab-group__tabs-cont',
    panelClass: 'tab-group__tabpanel',
    contentClass: 'tab-group__tab-content',
    contentRole: 'document',
    btnSelectedClass: 'tab-group__tab-btn_selected',
    panelSelectedClass: 'tab-group__tabpanel_selected',
    verticalMode: false,
    fadeSpeed: 300,
    cssTransitions: false
  };
}(jQuery, window, document)));