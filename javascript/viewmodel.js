(function (ko, jQuery) {

    function PointViewModel(x, y) {
        var self = this;
        self.x = ko.observable(x);
        self.y = ko.observable(y);

        self.render = function (ctx) {
            ctx.fillRect(self.x() - 3, self.y() - 3, 6, 6);
        }
    }

    function BracketViewModel(hangingPoint, length) {
        var self = this;

        self.angle = Math.PI / 2;
        self.delta = 1;

        self.endPoint = {
            x: function () {
                return hangingPoint.x() + (Math.cos(self.angle) * length);
            },
            y: function () {
                return hangingPoint.y() + (Math.sin(self.angle) * length);
            }
        };

        self.render = function (ctx) {

            ctx.beginPath();
            ctx.moveTo(hangingPoint.x(), hangingPoint.y());
            ctx.lineTo(self.endPoint.x(), self.endPoint.y());
            ctx.stroke();

        }
    }

    function BarViewModel(bracket1, bracket2) {
        var self = this;

        self.render = function (ctx) {

            ctx.beginPath();
            ctx.moveTo(bracket1.endPoint.x(), bracket1.endPoint.y());
            ctx.lineTo(bracket2.endPoint.x(), bracket2.endPoint.y());
            ctx.stroke();

        }

    }

    function RockingChairViewModel() {
        var self = this;

        self.hangingPoint1 = new PointViewModel(50, 50);
        self.hangingPoint2 = new PointViewModel(100, 50);

        self.bracket1 = new BracketViewModel(self.hangingPoint1, 20);
        self.bracket2 = new BracketViewModel(self.hangingPoint2, 20);

        self.bar1 = new BarViewModel(self.bracket1, self.bracket2);

        self.objects = [self.hangingPoint1, self.hangingPoint2, self.bracket1, self.bracket2, self.bar1];

        self.update = function() {
            var delta = self.bracket1.delta;
            self.bracket1.angle += delta / 10;
        }

    }

    jQuery(function () {
        ko.applyBindings(new RockingChairViewModel())
    });

})(ko, jQuery);