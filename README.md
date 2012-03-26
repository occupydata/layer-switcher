# MapBox Boilerplate

### Built on Wax.js and Leaflet.js
* This is boilerplate code that is intended as a starting point for new projects. Fork it and customize to your needs.
* Wax and Leaflet libraries are included as submodules for easy maintenance/updates.
* After forking and cloning the source, navigate to the root of the project and run the following lines to clone the submodules.

```
    git submodule init  
    git submodule update
```

### Layer Switcher
* Switchable layers defined in `ul.layers` in index.html
* Inital layer `li a` should match `var activelayer` in app.js and have the attribute `class="active"`
* Base layers, initial active layer, and static overlay layers are all defined in app.js

### Tooltips
* Tooltips appear on hover and display data from the MBTiles source through the Leaflet.js API

### GeoJSON
* Pulling GeoJSON data from js/museums.js, can be replaced with an AJAX call for live JSON data.
* A custom marker icon is defined in js/app.js and uses img/museum-24.png
* Markers are clickable, and display popups with descriptions from the GeoJSON source
