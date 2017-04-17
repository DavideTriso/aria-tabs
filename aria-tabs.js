(function ($) {
  'use strict';
  var tabsGroupsArray = [],
    methods = {},
    count = 0,
    a = {
      aCs: 'aria-controls',
      aHi: 'aria-hidden',
      aSe: 'aria-selected',
      aLab: 'aria-labelledby',
      r: 'role',
      tbI: 'tabindex',
      t: 'true',
      f: 'false'
    };

  //PRIVATE FUNCTIONS
  //-----------------------------------------------
  //set id if element does not have one
  function setId(element, id, i) {
    if (element.id === undefined || element.id === '' || element.id === null) {
      element.id = id + (i + 1);
    }
  }
  //set class if element does not have it yet
  function setClass(element, className) {
    if (!element.hasClass(className)) {
      element.addClass(className);
    }
  }

  function getTabsIndexes(tabBtn) {
    var i = 0,
      l = tabsGroupsArray.length,
      tabBtnId = tabBtn.attr('id'),
      indexes = {},
      indexTab = 0;

    for (i; i < l; i = i + 1) {
      indexTab = tabsGroupsArray[i][3].indexOf(tabBtnId);
      if (indexTab !== -1) {
        indexes.indexTabsGroup = i;
        indexes.indexTab = indexTab;
        indexes.tabsLenght = tabsGroupsArray[i][3].length;
        return indexes;
      }
    }
  }

  function selectTab(indexes, animation) {
    var elements = tabsGroupsArray[indexes.indexTabsGroup][1],
      settings = tabsGroupsArray[indexes.indexTabsGroup][2],
      tabPanel = $(elements.tabPanel[indexes.indexTab]);

    //Select tab
    $(elements.tabBtn[indexes.indexTab])
      .addClass(settings.tabBtnSelectedClass)
      .attr(a.aSe, a.t)
      .attr(a.tbI, '0');

    tabPanel.addClass(settings.tabPanelSelectedClass)
      .attr(a.aHi, a.f)
      .attr(a.tbI, '0');

    if (animation) {
      tabPanel.fadeIn(settings.tabPanelFadeSpeed);
    } else {
      tabPanel.show();
    }
  }



  function deselectTab(indexes) {
    var elements = tabsGroupsArray[indexes.indexTabsGroup][1],
      settings = tabsGroupsArray[indexes.indexTabsGroup][2],
      tabPanel = $(elements.tabPanel[indexes.indexTab]);

    //Hide tab
    $(elements.tabBtn[indexes.indexTab])
      .removeClass(settings.tabBtnSelectedClass)
      .attr(a.aSe, a.f)
      .attr(a.tbI, '-1');

    tabPanel.addClass(settings.tabPanelSelectedClass)
      .attr(a.aHi, a.t)
      .attr(a.tbI, '-1')
      .hide();
  }

  //-----------------------------------------------


  //PLUGIN METHODS
  //INIT TABS GROUPS
  //-----------------------------------------------
  methods.init = function (userSettings, tabsGroup) {
    var settings = $.extend({
        tabGroupClass: 'tab-group',
        tabUlClass: 'tab-group__tab-ul',
        tabLiClass: 'tab-group__tab-li',
        tabBtnClass: 'tab-group__tab-btn',
        tabPanelClass: 'tab-group__tabpanel',
        tabContentClass: 'tab-group__tab-content',
        tabContentRole: 'document',
        tabBtnSelectedClass: 'tab-group__tab-btn_selected',
        tabPanelSelectedClass: 'tab-group__tabpanel_selected',
        tabPanelFadeSpeed: 300,
        deepLinking: false
      }, userSettings),
      elements = {
        group: tabsGroup,
        tabUl: tabsGroup.find('.' + settings.tabUlClass),
        tabLi: tabsGroup.find('.' + settings.tabLiClass),
        tabBtn: tabsGroup.find('.' + settings.tabBtnClass),
        tabPanel: tabsGroup.find('.' + settings.tabPanelClass),
        tabContent: tabsGroup.find('.' + settings.tabContentClass)
      },
      tabsGroupId = '',
      tabBtnsIds = [],
      tabsArray = [],
      //hash = getUrlHash(),
      i = 0,
      l = 0;


    //set id to tabs group if not set and save id into variable tabsGroupId
    setId(elements.group[0], 'tabs-group-', count);
    tabsGroupId = elements.group.attr('id');

    //set class to tab group if not set
    setClass(elements.group, settings.tabGroupClass);

    //init tabs by setting ids and attributes
    l = elements.tabBtn.length;
    for (i; i < l; i = i + 1) {
      setId(elements.tabBtn[i], tabsGroupId + '__tab-btn-', i);
      setId(elements.tabPanel[i], tabsGroupId + '__tabpanel-', i);
      elements.tabBtn[i].setAttribute(a.aCs, elements.tabPanel[i].id);
      elements.tabPanel[i].setAttribute(a.aLab, elements.tabBtn[i].id);
      elements.tabUl.attr(a.r, 'tablist');
      elements.tabLi[i].setAttribute(a.r, 'presentation');
      elements.tabBtn[i].setAttribute(a.r, 'tab');
      elements.tabPanel[i].setAttribute(a.r, 'tabpanel');
      elements.tabContent[i].setAttribute(a.r, settings.tabContentRole);

      //push each id of tab btns into array
      tabBtnsIds.push(elements.tabBtn[i].id);
    }

    //save all tabs data into array
    tabsArray.push(tabsGroupId, elements, settings, tabBtnsIds);

    //push array to 1st. level array - tabsGroupsArray
    tabsGroupsArray.push(tabsArray);

    //TABS GROUPS ARRAY ARCHITECTURE:
    /*
    tabsGroupsArray ---> [i] ---> [0] Id of tab group
                             ---> [1] Object wih elements
                             ---> [2] Object with settings
                             ---> [3] Array with tab-buttons's ids
    */

    //select one tab and hide other on load
    elements.tabBtn.each(function (index) {
      if (index === 0) {
        selectTab(getTabsIndexes($(this)), false);
      } else {
        deselectTab(getTabsIndexes($(this)));
      }
    });

    //bind event handlers
    elements.tabBtn.on('tab:select click', function () {
      methods.select($(this));
    });

    //arrow keys navigation
    $(window).unbind('keyup').on('keyup', function (event) {
      var key = event.keyCode,
        activEl = $(':focus'),
        indexes = {},
        elements = {},
        tabToSelect = '';

      if (!event.shiftKey && !event.ctrlKey && activEl.hasClass(settings.tabBtnClass)) {
        indexes = getTabsIndexes(activEl);
        elements = tabsGroupsArray[indexes.indexTabsGroup][1];
        switch (key) {
          case 37: //left
            if (indexes.indexTab === 0) {
              tabToSelect = $(elements.tabBtn[(indexes.tabsLenght - 1)]);
            } else {
              tabToSelect = $(elements.tabBtn[(indexes.indexTab - 1)]);
            }
            tabToSelect.focus();
            methods.select(tabToSelect);
            break;
          case 39: //right
            if (indexes.indexTab === (indexes.tabsLenght - 1)) {
              tabToSelect = $(elements.tabBtn[0]);
            } else {
              tabToSelect = $(elements.tabBtn[(indexes.indexTab + 1)]);
            }
            tabToSelect.focus();
            methods.select(tabToSelect);
            break;
          case 36: //home
            tabToSelect = $(elements.tabBtn[0]);
            tabToSelect.focus();
            methods.select(tabToSelect);
            break;
          case 35: //end
            tabToSelect = $(elements.tabBtn[(indexes.tabsLenght - 1)]);
            tabToSelect.focus();
            methods.select(tabToSelect);
            break;
        }
      }
    });

    //increment count after every initalisation
    count = count + 1;
  };



  //SELECT TAB
  methods.select = function (tabBtn) {
    var tabToSelectIndexes = getTabsIndexes(tabBtn),
      settings = tabsGroupsArray[tabToSelectIndexes.indexTabsGroup][2],
      selectedTabIndexes = getTabsIndexes(tabBtn
        .closest('.' + settings.tabGroupClass)
        .find('.' + settings.tabBtnSelectedClass));

    deselectTab(selectedTabIndexes);
    selectTab(tabToSelectIndexes, true);
  };


  /*
  methods.destroy = function (tabGroup) {
  
  }; 
  
  methods.remove = function (tabGroup) {
  
  };
  */

  //PLUGIN
  //-----------------------------------------------
  $.fn.ariaTabs = function (userSettings) {
    if (typeof userSettings === 'object' || typeof userSettings === 'undefined') {
      this.each(function () {
        methods.init(userSettings, $(this));
      });
    }

    if (userSettings === 'select') {
      methods.select($(this));
    }

    /*
    if (userSettings === 'destroy') {
      methods.destroy($(this));
    }
    if (userSettings === 'remove') {
      methods.remove($(this));
    }*/
  };

}(jQuery));
