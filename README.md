# ARIA TABS

jQuery plugin for **accessible** tab-widgets. **WAI ARIA 1.1** compliant.

* Easy to customize tanks to a small but usefull set of options.
* SASS/SCSS files for simple and quick UI customisations.
* Only 3KB (minified).
* Fully compatible with **t-css-framework**
* Runs in strict mode.

## Dependencies

**jQuery**

Developed and tested with jQuery 3.2.1

## Cross-browser tests

* Tested on **Google Chrome 57** / macOS Sierra 10.

## Options

Name | Default | Type | Description
-----|---------|------|-------------
tabGroupClass | tab-group | string | Class name of tab group elements.
tabUlClass | tab-group__tab-ul | string | Class name of tab navigational region.
tabLiClass | tab-group__tab-li | string | Class name of &lt;li&gt; elements of tab navigational region.
tabBtnClass | tab-group__tab-btn | string | Class name of tab buttons
tabPanelClass | tab-group__tabpanel | string | Class name of tabpanels
tabContentClass | tab-group__tab-content | string | Class name of tab content elements
tabContentRole | document | token | Role of tab content. Accepted values: document, application. For more information see [https://www.w3.org/TR/wai-aria-1.1/](https://www.w3.org/TR/wai-aria-1.1/).
tabBtnSelectedClass | tab-group__tab-btn_selected | string | Class added to the button of a selected tab.
tabPanelSelectedClass | tab-group__tabpanel_selected | string | Class added to the tab-panel of a selected tab.
tabPanelFadeSpeed | 300 | int (>= 0) | Duration of fade-in animations of a tabpanel.
justifyNav| false | bool | Make navigation take the full width of the tab-widget by automatically setting the width of each `<li>` in the nav.
*deepLinking | false | bool | Enable deep linking for tabs. **IMPORTANT:** This feature is not yet implemented, but is planned for future versions of the plugin.

## Usage

1. Include the JS script **aria-tabs.js** - or the minified production script **aria-tabs.min.js** - in the head or the body of your HTML file.
2. Include the CSS file  **aria-tabs.css** in the head of your HTML file or include the SCSS files in your project. Adapt the CSS rules to match your website's design. 
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
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industr
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.</p>
          <button type="button">Focus test</button>
        </div>
      </div>
      <!-- TABPANEL END -->
      
      <!-- TABPANEL BEGIN -->
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 2</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industr
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.</p>
        </div>
      </div>
      <!-- TABPANEL END -->
      
      <!-- TABPANEL BEGIN -->
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 3</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industr
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.</p>
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

The plugin supports following methods: select.

### Select

In order to select a tab call **ariaTabs** and pass **'select'** as parameter:

```javascript
$('#my-tab').ariaTabs('select');
```

## LICENSE

This project is licensed under the terms of the **MIT license**.

See [LICENSE.md]('license') for detailed informations.