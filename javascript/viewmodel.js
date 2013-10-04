(function (ko, jQuery) {

    function RockingChairViewModel() {
        var self = this;

        self.coordinates = ko.observable("foo");

    }

    jQuery(function () {
        ko.applyBindings(new RockingChairViewModel())
    });

})(ko, jQuery);