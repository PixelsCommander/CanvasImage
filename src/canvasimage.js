window.CanvasImage = (function (w) {
    var CanvasImage = function (selector) {
        this.container = typeof selector == 'string' ? document.querySelector(selector) : selector;
        this.sourceURL = this.container.getAttribute('src');
        this.loadImage(this.sourceURL, this.initializeCanvas);
    }

    var p = CanvasImage.prototype;

    p.loadImage = function (URL, callback) {
        this.imageObject = this.container;

        if (this.container.tagName.toLowerCase() !== 'img') {
            this.imageObject = document.createElement('img');
        }

        if (this.imageObject.complete){
            callback.bind(this)();
        } else {
            this.imageObject.onload = callback.bind(this);

            if (this.container.tagName.toLowerCase() !== 'img') {
                this.imageObject.src = URL;
            }
        }
    }

    p.initializeCanvas = function () {
        this.imageObject.onload = null;

        this.canvas = document.createElement('canvas');

        this.containerParent = this.container.parentNode;
        this.containerWidth = this.container.offsetWidth;
        this.containerHeight = this.container.offsetHeight;

        insertAfter(this.container, this.canvas);

        this.context = this.canvas.getContext('2d');

        this.canvas.width = this.containerWidth;
        this.canvas.style.width = this.container.style.width;

        this.canvas.height = this.containerHeight;
        this.canvas.style.height = this.container.style.height;

        this.canvas.style.top = this.container.style.top;
        this.canvas.style.left = this.container.style.left;

        this.canvas.style.maxWidth = this.container.style.maxWidth;
        this.canvas.style.maxHeight = this.container.style.maxHeight;

        this.drawImage();
    }

    p.drawImage = function () {
        var imageWidth = this.imageObject.width;
        var imageHeight = this.imageObject.height;

        var affectedRectangle = this.getAffectedRectangle(this.imageObject);
        this.context.drawImage(this.imageObject, 0, 0, affectedRectangle.width, affectedRectangle.height);

        this.cleanMemory();
    }

    p.getAffectedRectangle = function (imageObject) {
        var rectangle = {};

        rectangle.width = this.containerWidth;
        rectangle.height = this.containerHeight;

        return rectangle;
    }

    p.cleanMemory = function () {
        this.imageObject.src = '';
        this.containerParent.removeChild(this.container);

        delete this.container;
        if (this.container !== this.imageObject) {
            delete this.imageObject;
        }
        delete this.context;

        this.container = null;
        this.canvas = null;
        this.context = null;
        this.containerParent = null;
        this.imageObject = null;
        this.containerWidth = null;
        this.containerHeight = null;
        this.sourceURL = null;
    }

    CanvasImage.all = function () {
        var images = document.getElementsByTagName('img');

        for (var i = 0; i < images.length; i++) {
            new CanvasImage(images[i]);
            i--;
        }
    }

    return CanvasImage;
})(window);

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}