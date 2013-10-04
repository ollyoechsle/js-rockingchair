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

})(window.ko);
