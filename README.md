# minLightbox
A very lightweight and simple JS lightbox.

## Quick Start
minBox in initialised with vanilla JS like so:
```
<link href="/path/to/minSlider.css" rel="stylesheet">
<script src="/path/to/minSlider.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  new minSlider({
    "transitionSpeed": 300,
    "slideDuration": 2000,
    "autoplay": false,
    "pauseOnHover": true,
    "manualControls": true,
  });
});
</script>
```
and HTML like this:
```
<div class="slider">
  <div class="slides">
    <img src="cover.jpg" class="cover"/>
    <img src="slide-1.jpg"/>
    <img src="slide-2.jpg"/>
    <img src="slide-3.jpg"/>
  </div>
  <span class="button prev"></span>
  <span class="button next"></span>
</div>
```
