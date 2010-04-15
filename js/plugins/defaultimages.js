/**
 * Licensed under a Creative Commons Attribution 3.0 License
 * Rozario Chivers January 2008
 * version 0.5
 * addDefaultImages 
 * Released under a creative commons Attribution-ShareAlike 2.5 license (http://creativecommons.org/licenses/by-sa/2.5/)
 *
 * Replace broken images specified with a JQuery selector with a default image
 * @param imagesContainer {string} CSS selector to parent container of images
 * @param selectorToImage {string} CSS selector to images that require default images
 * @param defaultImagePath {string} image path to default image, used on broken images
 * @dependency onelementready plugin
 * @return nothing returned
 */		 

/* 
 *  onElementReady must be used on the parent container of the images required
 *  so that script only executes when elements are created by the browser and 
 *  not before causing errors
 */
jQuery.extend({
	// CSS selector of images to provide default images for		
	addDefaultImages : function(imagesContainer, selectorToImage, defaultImagePath){
		function setDefaultImages() {
			var domImages = document.images;
			var domImagesLen = domImages.length;
			
			// replace src with default for all specified images
			$(selectorToImage).each(
				function(i){
					this.onerror = function() {
					this.src = defaultImagePath;
				};
			});
		}
		$.onElementReady(imagesContainer, setDefaultImages);
	} // end addDefaultImages()
});
