(function (ko, jQuery) {

    function PointViewModel(x, y) {
        var self = this;
        self.x = ko.observable(x);
        self.y = ko.observable(y);

        self.render = function(ctx) {
            ctx.fillRect(self.x(), self.y(), 5, 5);
        }
    }

    function BracketViewModel(hangingPoint, length) {
        var self = this;

        self.angle = 0;

        var endPoint = {
            x: function() {
                return hangingPoint.x() + (Math.cos(self.angle) * length);
            },
            y: function() {
                return hangingPoint.y() + (Math.sin(self.angle) * length);
            }
        };

        self.render = function(ctx) {

            ctx.beginPath();
            ctx.moveTo(hangingPoint.x(), hangingPoint.y());
            ctx.lineTo(endPoint.x(), endPoint.y());
            ctx.stroke();

            self.angle++;

        }
    }

    function RockingChairViewModel() {
        var self = this;

        self.hangingPoint1 = new PointViewModel(10, 10);
        self.hangingPoint2 = new PointViewModel(50, 10);

        self.bar1 = new BracketViewModel(self.hangingPoint1, 20);
        self.bar2 = new BracketViewModel(self.hangingPoint2, 20);

        self.objects = [self.hangingPoint1, self.hangingPoint2, self.bar1, self.bar2];

    }

    jQuery(function () {
        ko.applyBindings(new RockingChairViewModel())
    });

})(ko, jQuery);