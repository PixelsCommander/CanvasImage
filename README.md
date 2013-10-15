CanvasImage
===========

Converts image to canvas with same look.

Useful for memory optimization in case of responsive images usage. Also is good for solving PhoneGap Android antialiasing issue.

Usage
-----

Simpliest way to use CanvasImage is by calling <code>new CanvasImage('selector')</code> or <code>new CanvasImage(DOMElement)</code>

There is also approach to convert all images on current page. For this use <code>CanvasImage.all()</code>
