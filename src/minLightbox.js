/** Class representing a minLightbox */
class minLightbox {

	/**
     * Create the minLightbox
     */
	constructor() {
		this.startX = null;
		this.startY = null;
		this.currentGallery = null;
		this.currentIndex = null;
		this.box = null;
		this.wrapper = null;

		this.init();
	}

	/**
     * Initialise the slider by getting and
     * sorting the images into galleries &
     * applying their click eventListeners.
     *
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
	init() {
		this.images = document.querySelectorAll("a[data-gallery]");
		this.galleries = this.sortImages();

		for (var i = 0; i < this.images.length; i++) {
			this.images[i].addEventListener("click", this.openBox.bind(this), false);
		}
	}

	/**
     * Sort the images.
     */
	sortImages() {
		var galleries = {};
		for (var i = 0; i < this.images.length; i++) {
			var attr = this.images[i].dataset.gallery;
			if (!(attr in galleries)) {
				galleries[attr] = Array();
			}
			galleries[attr].push(this.images[i]);
		}
		return galleries;
	}

	/**
     * Opens the minLightbox
     *
     * @param {object} 2 - The click event.
     */
	openBox(e) {
		e.preventDefault();
		var link = e.target.closest("a[data-gallery]");
		this.currentGallery = link.getAttribute("data-gallery");
		this.currentIndex = this.findImageIndex(link);
		this.constructBox();
	}

	/**
     * Constructs and inserts the box HTML.
     * Intialises the class variables,
     * triggers adding the necessary
     * event listeners & focuses on the box.
     */
	constructBox() {
		var div = document.createElement("div");
		div.classList.add("minBox");
		document.querySelector("body").append(div);

		var gallery = `
		<div class="minBoxSlider">
			<div class="slides">
			`;
			for (var i = 0; i < this.galleries[this.currentGallery].length; i++) {
				if (i === this.currentIndex) {
					gallery += `<img src="${this.galleries[this.currentGallery][i]}" class="current"/>`;
				} else {
					gallery += `<img src="${this.galleries[this.currentGallery][i]}"/>`;
				}
			}
			gallery += `
			</div>
			<span class="button prev"></span>
			<span class="button next"></span>
		</div>
		`;

		div.innerHTML = gallery;

		// Initialise class variables for later use
		this.wrapper = document.querySelector(".minBox");
		this.slidesContainer = this.wrapper.querySelector(".slides");
		this.boxImages = this.wrapper.querySelectorAll(".slides img");

		// Add listeners to the newly created box
		this.attachListeners();

		// Shift the focus to the slider
		this.wrapper.focus();
	}

	/**
     * Attaches the box listeners
     */
	attachListeners() {
		// Close on click outside of images & buttons
		this.wrapper.addEventListener("click", this.closeBox.bind(this));

		// Prev & Next buttons
		this.wrapper.querySelector(".button.prev").addEventListener("click", this.prev.bind(this));
		this.wrapper.querySelector(".button.next").addEventListener("click", this.next.bind(this));

		// Keyboard navigation
		this.k = this.doKeyboard.bind(this);
		document.addEventListener("keydown", this.k);

		// Touch navigation
		this.slidesContainer.addEventListener("touchstart", this.doTouchStart.bind(this));
		this.slidesContainer.addEventListener("touchmove", this.doTouchMove.bind(this));
	}

	/**
     * Start point for closing the minLightbox
     *
     * @param {object} e - The click event.
     */
	closeBox(e) {
		if ((e.target.classList.contains("slides")) || (e.target.classList.contains("minBoxSlider"))) {
			this.wrapper.classList.add("closing");
			setTimeout(() => this.removeBox(), 300);
		}
	}

	/**
     * Destroys the minLightbox, resets
     * the associated class variables,
     * and removes eventListeners.
     */
	removeBox() {
		this.wrapper.remove();
		this.currentGallery = null;
		this.currentIndex = null;
		this.box = null;
		this.wrapper = null;
		this.boxImages = null;
		this.slidesContainer = null;
		document.removeEventListener("keydown", this.k);
	}

	/**
     * Searches a gallery for a matching
     * image src to get the image index.
     *
     * @param {object} link - The clicked <a> element.
     */
	findImageIndex(link) {
		for (var i = 0; i < this.galleries[this.currentGallery].length; i++) {
			if (this.galleries[this.currentGallery][i].attributes.href.value === link.attributes.href.value) {
				return i;
			}
		}
	}

	/**
     * Checks if the left/right arrow
     * keys were pressed and fires the
     * appropriate function.
     *
     * @param {object} e - The keypress event.
     */
	doKeyboard(e) {
		if (e.key === "ArrowRight") {
			this.next();
		} else if (e.key === "ArrowLeft") {
			this.prev();
		}
	}

	/**
     * Records the start touch point
     *
     * @param {object} e - The touch event.
     */
	doTouchStart(e) {
		this.xDown = e.touches[0].clientX;
		this.yDown = e.touches[0].clientY;
	}

	/**
     * Calculates which direction the
     * user swiped (left/right).
     *
     * @param {object} e - The touch event.
     */
	doTouchMove(e) {
	    if ( ! this.xDown || ! this.yDown ) {
	        return;
	    }

	    var xUp = e.touches[0].clientX;
	    var yUp = e.touches[0].clientY;

	    var xDiff = this.xDown - xUp;
	    var yDiff = this.yDown - yUp;

	    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
	        if ( xDiff > 0 ) {
	            this.next();
	        } else {
	            this.prev();
	        }
	    }

	    this.xDown = null;
	    this.yDown = null;
	}

	/**
     * Change to the next slide by
     * altering which image is .current
     *
     * @param {number} prevIndex - The index of the image
     								to lose .current status.
     */
	changeSlide(prevIndex) {
		this.boxImages[this.currentIndex].classList.add("current");
		this.boxImages[prevIndex].classList.remove("current");
	}

	/**
     * Move the index to the next slide
     */
	next() {
		if (!(this.currentIndex === this.boxImages.length - 1)) {
			this.currentIndex ++;
			this.changeSlide(this.currentIndex - 1);
		}
	}

	/**
     * Move the index to the previous slide
     */
	prev() {
		if (!(this.currentIndex === 0)) {
			this.currentIndex --;
			this.changeSlide(this.currentIndex + 1);
		}
	}
}

/**
 * Initialise the class automatically
 * so the user doesn't have to do 
 * anything except load this file.
 */
document.addEventListener("DOMContentLoaded", function() {
	new minLightbox();
});