(function (ko, jQuery) {

    function PointViewModel(x, y) {
        var self = this;
        self.x = ko.observable(x);
        self.y = ko.observable(y);

        self.render = function(ctx) {
            ctx.fillRect(self.x(), self.y(), 5, 5);
        }
    }

    function RockingChairViewModel() {
        var self = this;

        self.point1A = new PointViewModel(10, 10);
        self.point1B = new PointViewModel(10, 10);

        self.objects = [self.point1A, self.point1B];

    }

    jQuery(function () {
        ko.applyBindings(new RockingChairViewModel())
    });

})(ko, jQuery);