(function (ko, jQuery) {

    // gets the intersection of two circles
    function intersection(point0, r0, point1, r1) {
        var x0 = point0.x(), y0 = point0.y();
        var x1 = point1.x(), y1 = point1.y();
        var a, dx, dy, d, h, rx, ry;
        var x2, y2;

        /* dx and dy are the vertical and horizontal distances between
         * the circle centers.
         */
        dx = x1 - x0;
        dy = y1 - y0;

        /* Determine the straight-line distance between the centers. */
        d = Math.sqrt((dy * dy) + (dx * dx));

        /* Check for solvability. */
        if (d > (r0 + r1)) {
            /* no solution. circles do not intersect. */
            return false;
        }
        if (d < Math.abs(r0 - r1)) {
            /* no solution. one circle is contained in the other */
            return false;
        }

        /* 'point 2' is the point where the line through the circle
         * intersection points crosses the line between the circle
         * centers.
         */

        /* Determine the distance from point 0 to point 2. */
        a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

        /* Determine the coordinates of point 2. */
        x2 = x0 + (dx * a / d);
        y2 = y0 + (dy * a / d);

        /* Determine the distance from point 2 to either of the
         * intersection points.
         */
        h = Math.sqrt((r0 * r0) - (a * a));

        /* Now determine the offsets of the intersection points from
         * point 2.
         */
        rx = -dy * (h / d);
        ry = dx * (h / d);

        /* Determine the absolute intersection points. */
        var xi = x2 + rx;
        var xi_prime = x2 - rx;
        var yi = y2 + ry;
        var yi_prime = y2 - ry;

        return [xi, xi_prime, yi, yi_prime];
    }

    function FixedPointViewModel(x, y) {
        var self = this;

        self.x = ko.observable(x);
        self.y = ko.observable(y);

        self.render = function (ctx) {
            ctx.fillStyle = '#555555';
            ctx.fillRect(self.x() - 3, self.y() - 3, 6, 6);
        }
    }

    function DynamicPointViewModel(fn) {
        var self = this;

        self.x = function () {
            return fn().x;
        };

        self.y = function () {
            return fn().y;
        };

        self.render = function (ctx) {
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(self.x() - 3, self.y() - 3, 6, 6);
        }

    }

    function BracketViewModel(fixedPoint, endPoint) {
        var self = this;

        self.render = function (ctx) {

            fixedPoint.render(ctx);
            endPoint.render(ctx);

            ctx.beginPath();
            ctx.moveTo(fixedPoint.x(), fixedPoint.y());
            ctx.lineTo(endPoint.x(), endPoint.y());
            ctx.stroke();

        }
    }

    function BarViewModel(point0, point1) {
        var self = this;

        self.render = function (ctx) {

            ctx.beginPath();
            ctx.moveTo(point0.x(), point0.y());
            ctx.lineTo(point1.x(), point1.y());
            ctx.stroke();

        };

    }

    function RockingChairViewModel() {
        var self = this;

        // the bracket on the right
        self.rightHangingPoint = new FixedPointViewModel(100, 50);
        self.rightBracketLength = ko.observable(20);

        var angle = 0,
            delta = -1;

        var rightBracketEndPoint = new DynamicPointViewModel(
            function () {
                return {
                    x: self.rightHangingPoint.x() + (Math.cos(angle)
                        * self.rightBracketLength()),
                    y: self.rightHangingPoint.y() + (Math.sin(angle)
                        * self.rightBracketLength())
                };
            });

        self.rightBracket = new BracketViewModel(self.rightHangingPoint, rightBracketEndPoint);

        var barLength = ko.observable(50);

        // the bracket on the left
        self.leftHangingPoint = new FixedPointViewModel(50, 50);
        self.leftBracketLength = ko.observable(20);
        var leftBracketEndPoint = new DynamicPointViewModel(
            function () {

                var intersectionPoints = intersection(rightBracketEndPoint, barLength(),
                                                      self.leftHangingPoint,
                                                      self.leftBracketLength());

                return {
                    x: intersectionPoints[1],
                    y: intersectionPoints[3]
                }
            }
        );

        // the bar between the two
        self.bar1 = new BarViewModel(leftBracketEndPoint, rightBracketEndPoint);

        self.leftBracket = new BracketViewModel(self.leftHangingPoint, leftBracketEndPoint);

        self.objects = [self.leftBracket, self.rightBracket, self.bar1];

        var minAngle = 0,
            maxAngle = +Math.PI;

        angle = (maxAngle + minAngle) / 2;
        delta = +1;

        self.update = function () {
            if (angle > maxAngle || angle < minAngle) {
                delta *= -1;
            }
            angle += delta / 10;
        }

    }

    jQuery(function () {
        ko.applyBindings(new RockingChairViewModel())
    });

})(ko, jQuery);