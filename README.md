# ARIA TABS

jQuery plugin for **accessible** tab-widgets. **WAI ARIA 1.1** compliant.

* Only 3KB (minified).
* Fully compatible with [**t** css-framework](https://github.com/DavideTriso/t-css-framework)
* Runs in strict mode.
* SASS/SCSS files for quick UI customisations.

## Dependencies

**jQuery**

Developed and tested with jQuery 3.2.1

## Cross-browser tests

* Tested on **Google Chrome 57** / macOS Sierra 10.
* Tested on **Safari for iOS 10.3.x** / iPhone 5s.

## Options

Name | Default | Type | Description 
-----|---------|------|-------------
tabGroupIdPrefix | tab-group-- | string | Prefix used to generate the IDs of tab groups
navClass | tab-group__tab-nav | string | Class of a the tab nav element (the class is used from the plugin to select the element)
listClass | tab-group__tab-ul | string | Class of a the tablist `<ul>` element (the class is used from the plugin to select the element)
listItemClass | tab-group__tab-li | string | Class of a tab `<li>` element (the class is used from the plugin to select the elements)
btnClass | tab-group__tab-btn | string | Class of a button acting as a tab (the class is used from the plugin to select the elements)
panelsContainerClass | tab-group__tabs-cont | string | Class of the element acting as the tabpanel's contianer (the class is used from the plugin to select the elements)
panelClass | tab-group__tabpanel | string | Class of the tabpanels (the class is used from the plugin to select the elements)
contentClass | tab-group__tab-content | string | Class of the direct child of each tabpane, wrapper of the tabpanel content (the class is used from the plugin to select the elements)
btnSelectedClass | tab-group__tab-btn_selected | string | Class added to a tab when selected
panelSelectedClass | tab-group__tabpanel_selected | string | Class added to a tabpanel when selected
contentRole | document | token, array of tokens | Role of tabpanels's content. Accepted values: document, application. For more information see [https://www.w3.org/TR/wai-aria-1.1/](https://www.w3.org/TR/wai-aria-1.1/). To set different roles on each tabpanel's content element, pass an array of tokens. 
fadeSpeed | 300 | int (>= 0) | Speed of the fade-in animation of a tabpanel.
cssTransitions | false | bool | Use css transitions to show and hide a tabpanel instead of jQuery fade animations. Read section 'Using CSS transitions' for more informations.
verticalMode | false | bool | Enable vertial mode for tablist: set `aria-orientation` to `vertical`and enable navigation with up and down arrow keys. (Use css to vertically stack tabs).


## Usage

1. Include the JS script **aria-tabs.js** - or the minified production script **aria-tabs.min.js** - in the head or the body of your HTML file.
2. Include the CSS file  **aria-tabs.css** in the head of your HTML file or include the SCSS files in your project. 
3. Initialise the widget within an inline script tag, or in an external JS file.


### HTML

Use following HTML markup to implement a tab widget:


```html
  <div class="tab-group">
  
    <!-- TAB NAVIGATION -->
    <nav class="tab-group__tab-nav">
      <ul class="tab-group__tab-ul">
        <li class="tab-group__tab-li">
          <button type="button" class="tab-group__tab-btn">tab 1</button>
        </li>
        <li class="tab-group__tab-li">
          <button type="button" class="tab-group__tab-btn">tab 2</button>
        </li>
        <li class="tab-group__tab-li">
          <button type="button" class="tab-group__tab-btn">tab 3</button>
        </li>
      </ul>
    </nav>
    
    <!-- TABPANEL CONTAINER -->
    <div class="tabs-group__tabs-cont">
    
      <!-- TABPANEL BEGIN -->
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <button type="button">Focus test</button>
        </div>
      </div>
      <!-- TABPANEL END -->
      
      <!-- TABPANEL BEGIN -->
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
      <!-- TABPANEL END -->
      
      <!-- TABPANEL BEGIN -->
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 3</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
      <!-- TABPANEL END -->
      
    </div>
  </div>
```

### JS: Initialisation

Initialise the plugin as follows:

```javascript
$('.tab-group').ariaTabs({
  option1: value1,
  option2: value2
});
```

## Methods:

Methods can be called on an initialised tabs widget with following syntax:

```javascript
$('#my-tab-widget').ariaTabs('methodName', methodArgument);
```
The plugin supports foloowing methods: select.


### Select

In order to select a tab call **ariaTabs** and pass **'select'** as first argument. The second argument of the function can be the index (starting from 0) of a tab, a jQuery selector, or a jQuery element.


```javascript

//The following are all valid method's call and lead to the same result

$('#my-tab-widget').ariaTabs('select', 1);
$('#my-tab-widget').ariaTabs('select', '#my-tab-1');
$('#my-tab-widget').ariaTabs('select', $('#my-tab-1'));

```


## Custom events

The plugin triggers following events:

* **ariaTabs.initialised** after a tab's group is initialised
* **ariaTabs.select** when a tab get selected
* **ariaTabs.deselect** when a tab is deselected


### ariaTabs.initialised

This event is triggered on window and returns the tabs's group object as arguments.

```javascript

//listen for ariaTabs.initialised
$(window).on('ariaTabs.initialised', function(event, tabsGroup){
  //When a tab's group is initialised, perform an action
  tabsGroup.addClass('aria-tabs_initialised');
});

//Initialise the tab's groups
$('.tabs-group').ariaTabs();

```


### ariaTabs.select and ariaTabs.deselect

This events are also triggered on window and returns the tabs's group object and the index o the selected/deselected tab as arguments.

```javascript

//listen for ariaTabs.select
$(window).on('ariaTabs.select', function(event, tabsGroup, index){
  //perform an action
  console.log(tabsGroup + ' ' + index);
});

```
## css

## LICENSE

This project is licensed under the terms of the **MIT license**.

See [LICENSE.md](LICENSE.md) for detailed informations.