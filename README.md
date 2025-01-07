<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->


# Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Morisabeau"><img src="https://avatars.githubusercontent.com/u/74872505?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Asta Ness</b></sub></a><br /><a href="#design-Morisabeau" title="Design">🎨</a> <a href="#content-Morisabeau" title="Content">🖋</a> <a href="#question-Morisabeau" title="Answering Questions">💬</a> <a href="#ideas-Morisabeau" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/AvroraPolnareff"><img src="https://avatars.githubusercontent.com/u/46288303?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AvroraPolnareff</b></sub></a><br /><a href="https://github.com/Avrora Polnareff/Warframe Color Picker/commits?author=AvroraPolnareff" title="Code">💻</a> <a href="#infra-AvroraPolnareff" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-AvroraPolnareff" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.ckylin.site/"><img src="https://avatars.githubusercontent.com/u/11648014?v=4?s=100" width="100px;" alt=""/><br /><sub><b>CKylinMC</b></sub></a><br /><a href="#translation-CKylinMC" title="Translation">🌍</a> <a href="https://github.com/Avrora Polnareff/Warframe Color Picker/commits?author=CKylinMC" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rokettu"><img src="https://avatars.githubusercontent.com/u/84252990?v=4?s=100" width="100px;" alt=""/><br /><sub><b>rokettu</b></sub></a><br /><a href="#translation-rokettu" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

# What is Warframe Color Picker?

Warframe Color Picker is an easy tool designed for helping with making precise adjustments to your in-game fashion. If you're a fashionframe enthusiast, this tool will be irreplaceable for you!

All models in Warframe tend to have non-standardized unique diffuse maps, speculars, normals, overlapping decals and other stuff that heavily affects the resulting color, sometimes changing it drastically. In order to counteract this, you'd want to look up a slightly brighter or less saturated variation of the color you wanted to achieve, or vice versa. Since there are over 3000 distinct colors in the game, manually grinding your eyes through all the available palettes would've been a nightmare.

Lucky for everyone, here's an app that lets you adjust your entire color scheme on the fly! Once you've adjusted the color, it'll give you a list of the available closest colors to the one you wanted to achieve, from all in-game palettes. Try it out!

We also now support import from screenshot, text export, link export, and several languages!

<video src='https://github.com/user-attachments/assets/7c9e1b94-1fa9-4bca-bcaf-2b37b741de39' width=180>tutorial</video>

# Warframe Color Picker Features
Here's the list of currently available features, divided into sections. Named accordingly.

### **COLOR PICKER**:

* Adjust the color selected in Target Scheme submenu
* Color Insertion
  * Insert your entire in-game palette via *manual uploading* / *using CTRL+V* from a screenshot;
  * Insert the HEX code of your color;
  * Insert the RGB or HSV values of your color
* Color Adjustment
  * Adjust your color using Color Wheel;
  * Adjust your color using R, G, B values;
  * Adjust your color using H, S, V values

### **TARGET SCHEME**:

* Adjust your selected color in the **COLOR PICKER** window!
* **LAYOUT** / **TABLE** MODE
  * **LAYOUT**: Adjust your color scheme the way it appears in the game!
  * **TABLE**: Use the expanded color scheme viewer; the present scheme from **LAYOUT** will take a selected horizontal row in the **TABLE** mode, highlighted by a special selector.
* Import
  * Upload the color scheme directly from clipboard via CTRL+V, it will occupy the scheme in the **LAYOUT** mode and the selected horizontal row in **TABLE** mode;
  * Upload the color scheme manually via the MANUAL UPLOAD feature (in case import from clipboard doesn't work for you)
* Text Export
  * Get your current color scheme in a convenient text format that follows the "slot/palette/color" pattern.
* Link Export
  * Get a link with all your colors (from both **LAYOUT** and **TABLE** modes) coded in. Sharing is caring!
* Click right mouse button on a color to clear the slot

### **SUGGESTIONS**:

* Find the closest color to the one selected in Target Scheme submenu
* **%** / **(D)**
  * Switch between a more user-friendly percent-based value or a raw (D)istance variable, if you want to deal with the raw numbers!
* Customize the list of palettes that are being displayed as suggestions (green = enabled; gray = disabled), disable the ones you don't want to be suggested, also features "**DISABLE ALL**" / "**ENABLE ALL**" features;
* See the palette preview on the right. If you hover your mouse over a color, it will display its coordinates instead of the palette's name.

### **SELECTED COLOR**:

* Find out where exactly the selected color from **TARGET SCHEME** / **SUGGESTIONS** is located
* (Palette Name)
  * Hover your mouse over a color to get its coordinates displayed in the palette name field (X, Y)

# **How to use**
Here's the list of all available tips & guides for the app!

### HOW TO IMPORT FROM SCREENSHOT:

<video src='https://github.com/user-attachments/assets/7c9e1b94-1fa9-4bca-bcaf-2b37b741de39' width=180>tutorial</video>

1. First make a screenshot of your in-game scheme using any software at your disposal (pro tip: using **Snip & Sketch** on Windows is pretty much enough), cropping it in the same way as shown in the picture. Please do not use your smartphone camera, that's cringe.

2. Once the screenshot is ready, use **CTRL+V** in the text field. If it doesn't work, please save it on your PC first, then use **MANUAL UPLOAD** button. Select the cropped screenshot and click the upload button.

3. BOOM, you're done!! If you did everything right, the scheme will appear in the app. 

Note: if your **TARGET SCHEME** is set to **MANUAL**, the scheme will take the horizontal row.

# Known issues

* [Sometimes Export feature doesn't work due to AdBlock extensions (such as uBlock Origin or AdBlockPlus)](https://github.com/AvroraPolnareff/warframe-color-picker/issues/15).
