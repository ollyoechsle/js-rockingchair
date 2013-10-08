(function (ko) {

    ko.bindingHandlers.rockingChair = {

        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            if (element.ChairView) {
                element.ChairView.destroy();
            }
            element.ChairView = new ChairView(element, viewModel);
            element.ChairView.animate();
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        }
    };

    ko.bindingHandlers.degrees = {

        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var radians = ko.utils.unwrapObservable(valueAccessor()),
                degrees = radians * (180 / Math.PI);
            jQuery(element).html(degrees.toFixed(1) + "&deg;");
        }

    }

})(window.ko);
