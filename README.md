# ARIA TAB WIDGET

## About

**Aria Tab Widget** is a jQuery plugin. It is useful to implement accessible tabs in websites. It has basic configuration options and is fully accessible for screen-reader users and keyboard-only users.

## Dependencies

**jQuery** 2.x.x or higher

## Settings / Options

Name | Default | Type | Description
-----|---------|------|-------------
tabGroupClass | tab-group | string | Class name of tab group elements.
tabUlClass | tab-group__tab-ul | string | Class name of tab navigational region.
tabLiClass | tab-group__tab-li | string | Class name of &lt;li&gt; elements of tab navigational region.
tabBtnClass | tab-group__tab-btn | string | Class name of tab buttons
tabPanelClass | tab-group__tabpanel | string | Class name of tabpanels
tabContentClass | tab-group__tab-content | string | Class name of tab content elements
tabContentRole | document | token | Role of tab content. Accepted values: document, application. For more information see [https://www.w3.org/TR/wai-aria-1.1/](https://www.w3.org/TR/wai-aria-1.1/). If you are not sure which role you have to choose, then go for **document**.
tabBtnSelectedClass | tab-group__tab-btn_selected | string | Class added to the button of a selected tab.
tabPanelSelectedClass | tab-group__tabpanel_selected | string | Class added to the tab-panel of a selected tab.
tabPanelFadeSpeed | 300 | int (>= 0) | Duration of fade-in animations of a tabpanel.
deepLinking | false | bool | Enable deep linking for tabs. **IMPORTANT:** This feature is not yet implemented, but is planned for future versions of the plugin.

## Usage

Include the JS script _aria-tabs.js_ in the head or the body of your HTML file.

Include the CSS file  _aria-tabs.css_ in the head of your HTML file. Adapt the CSS rules to match your website's design.  

Use following HTML markup in your HTML file to generate a group of tabs:

```
  <div class="tab-group">
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
    <div class="tabs-group__tabs-cont">
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 1</h3>
          <p>1</p>
          <button type="button">Test</button>
        </div>
      </div>
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 2</h3>
          <p>2</p>
        </div>
      </div>
      <div class="tab-group__tabpanel">
        <div class="tab-group__tab-content">
          <h3>TAB 3</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  </div>
```

## Initialisation

Initialise the plugin as follows:
```
$('.tab-group').ariaTabs({
  option1: value1,
  option2: value2
});
```
