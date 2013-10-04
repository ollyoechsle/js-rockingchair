(function (jQuery) {

    /**
     * @constructor Initialise the chair view context
     * @param {Element} element The canvas element
     * @param {RockingChairViewModel} The view model
     */
    function ChairView(element, viewModel) {
        this.jContainer = jQuery(element);
        this.ctx = this.createContext(element);
        this.viewModel = viewModel;
    }

    /**
     * The container of the explosion element
     * @private
     * @type {jQuery}
     */
    ChairView.prototype.jContainer = null;

    /**
     * The canvas context
     * @private
     * @type {CanvasRenderingContext2D}
     */
    ChairView.prototype.ctx = null;

    /**
     * A list of the animations
     * @type {RockingChairViewModel}
     */
    ChairView.prototype.viewModel = null;

    /**
     * The current id for the next animation frame
     * @param {Number}
     */
    ChairView.prototype.animationId = null;

    ChairView.prototype.createContext = function (element) {
        return element.getContext("2d");
    };

    /**
     * Performs the animation loop
     */
    ChairView.prototype.animate = function () {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.render();
    };

    ChairView.prototype.render = function () {
        var ctx = this.ctx,
            model = this.viewModel;

        this.clear();

        model.objects.forEach(function(object) {
            object.render(ctx);
        });

        model.update();

    };

    /**
     * Wipes the entire context
     */
    ChairView.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.jContainer.width(), this.jContainer.height());
    };

    /**
     * Destroys the canvas
     */
    ChairView.prototype.destroy = function () {
        window.cancelAnimationFrame(this.animationId);
        this.jContainer.remove();
    };

    window.ChairView = ChairView;

})(window.jQuery);
