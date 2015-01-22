// this will show the info it in firebug console
var total = 0;
var values, canvas, context;



document.addEventListener("DOMContentLoaded", function () {
    //    var mydata = JSON.parse(segments);
    //    console.log(mydata.value);
    //set global vars for canvas and context
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    $.getJSON('js/cheese-3.json', function (data) {
        values = data.segments;
        console.log(values);
        showPie();
        showdoughnut();

    });
    //add listeners for the buttons

    //default action when it first loads
    //showPie();


});


function showPie() {
    //clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    //set the styles in case others have been set

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var radius = 100;
    var currentAngle = 0;
    //the difference for each wedge in the pie is arc along the circumference
    //we use the percentage to determine what percentage of the whole circle
    //the full circle is 2 * Math.PI radians long.
    //start at zero and travelling clockwise around the circle
    //start the center for each pie wedge
    //then draw a straight line out along the radius at the correct angle
    //then draw an arc from the current point along the circumference
    //stopping at the end of the percentage of the circumference
    //finally going back to the center point.
    for (var i = 0; i < values.length; i++) {
        total += values[i].value;
        //find min and max number

        var maxvalue = getMax(values, "value");
        var minvalue = getMin(values, "value");


    }
    for (var i = 0; i < values.length; i++) {
        var pct = values[i].value / total;

        var max = values[i].value
        console.log(max);


        var colour = values[i].color;
        var endAngle = currentAngle + (pct * (Math.PI * 2));
        //draw the arc



        context.moveTo(cx, cy);
        context.beginPath();
        context.fillStyle = colour;

        if (values[i] == maxvalue) {
            context.arc(cx, cy, radius * 0.9, currentAngle, endAngle, false);
        } else if (values[i] == minvalue) {
            context.arc(cx, cy, radius * 1.1, currentAngle, endAngle, false);
        } else {
            context.arc(cx, cy, radius, currentAngle, endAngle, false);
        }




        context.lineTo(cx, cy);

        context.fill();


        //Now draw the lines that will point to the values
        context.save();
        context.translate(cx, cy); //make the middle of the circle the (0,0) point
        context.strokeStyle = "#0CF";
        context.lineWidth = 1;
        context.beginPath();
        //angle to be used for the lines
        var midAngle = (currentAngle + endAngle) / 2; //middle of two angles
        context.moveTo(0, 0); //this value is to start at the middle of the circle
        //to start further out...
        var dx = Math.cos(midAngle) * (0.8 * radius);
        var dy = Math.sin(midAngle) * (0.8 * radius);
        context.moveTo(dx, dy);

        //ending points for the lines
        var dx = Math.cos(midAngle) * (radius + 30); //30px beyond radius
        var dy = Math.sin(midAngle) * (radius + 30);
        context.lineTo(dx, dy);
        var lx = 0,
            ly = 0;
        if (dx < 0) {
            lx = dx - 35;
        } else {
            lx = dx + 5;
        }
        if (dy < 0) {
            ly = dy;
        } else {
            ly = dy + 10;
        }

        context.fillText(values[i].label, lx, ly);
        context.stroke();
        //put the canvas back to the original position
        context.restore();
        //update the currentAngle
        currentAngle = endAngle;

        function getMax(arr, prop) {
            var max;
            for (var i = 0; i < arr.length; i++) {
                if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                    max = arr[i];
            }
            return max;
        }

        function getMin(arr, prop) {
            var min;
            for (var i = 0; i < arr.length; i++) {
                if (!min || parseInt(arr[i][prop]) < parseInt(min[prop]))
                    min = arr[i];
            }
            return min;
        }



    }
}

function showdoughnut() {
    for (var i = 0; i < values.length; i++) {

        var doughnutData = [
            {
                value: values[0].value,
                color: values[0].color,
                label: values[0].label
    },
            {
                value: values[1].value,
                color: values[1].color,
                label: values[1].label
     },
            {
                value: values[2].value,
                color: values[2].color,
                label: values[2].label
     },
            {
                value: values[3].value,
                color: values[3].color,
                label: values[3].label
     },
            {
                value: values[4].value,
                color: values[4].color,
                label: values[4].label
     },

            {
                value: values[5].value,
                color: values[5].color,
                label: values[5].label
     }

   ];


        var ctx = document.getElementById("chart-area").getContext("2d");
        window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {
            responsive: true
        });


    }
}