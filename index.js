var canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

var amount = 20;

var stars = [];




/*
COUNTDOWN STUFF
*/

var start = new Date('12/01/2021 4:40 PM');
var end = new Date('12/06/2021 12:00 PM');

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
    var hours = end.getHours();

    document.getElementById('mint_date').innerHTML = "Minting begins " + end.toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    var now = new Date();
    var distance = end - now;
    if (distance < 0) {

        // THIS MEANS WE CAN MINT!!!!
        clearInterval(timer);
        document.getElementById('countdown_text').innerHTML = 'MINT!!!';
        document.getElementById('countdown_width').style = "width: 100%";

        return;
    }

    var distanceWhole = end.getTime() - start.getTime();
    var distanceLeft = end.getTime() - now.getTime();


    var progress = Math.floor(((distanceWhole - distanceLeft) / distanceWhole) * 100);


    //alert(progress);
    document.getElementById('countdown_width').style = "width: " + progress + "%";


    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('countdown_text').innerHTML = days + 'D ' + hours + 'H ' + minutes + 'M ' + seconds + 'S';
}

timer = setInterval(showRemaining, 1000);


class Star {

    constructor(ow, oh) {
        this.x = Math.random() * ow;
        this.y = Math.random() * oh;
        this.w = 2 + Math.random() * 4;

        this.ow = ow;
        this.oh = oh;
        this.s = 1 + (Math.log(1 + (Math.random() * 0.5)));
    }
}

function onload() {
    loadEth();
    showRemaining();
    rs();

    window.onresize = rs;
    window.requestAnimationFrame(update);
}

function update() {
    for (var i = 0; i < amount; i++) {
        stars[i].y = stars[i].y - stars[i].s;
        if (stars[i].y < 0) stars[i].y = canvas.clientHeight;
    }

    draw();


    window.requestAnimationFrame(update);
}

function rs() { // response star or resize however you wanna look at it
    document.getElementById("modal").style.display = "none";
    canvas.height = document.getElementById('body').clientHeight;
    canvas.width = canvas.clientWidth;
    for (var i = 0; i < amount; i++) {
        responsiveStar(true, i);
    }

}

function responsiveStar(load, i) {
    var cw = canvas.clientWidth;
    var ch = canvas.clientHeight;
    if (load) {


        stars[i] = new Star(cw, ch);
    } else {
        var s = stars[i];
        s.x *= (cw / s.ow);
        s.y *= (ch / s.oh);
        alert("a");
        stars[i] = s;
    }

}

function toggleModal() {
    var value = document.getElementById("modal").style.display;
    var set = value != "flex" ? "flex" : "none";
    document.getElementById("modal").style.display = set;
}

function draw() {
    var grd = context.createLinearGradient(0, 0, 0, canvas.clientHeight);
    grd.addColorStop(0, "rgb(1, 69, 186)");
    grd.addColorStop(1, "white");

    // Fill with gradient
    context.fillStyle = grd;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.fillStyle = "white";

    for (var i = 0; i < amount; i++) {
        var s = stars[i];


        context.translate
        context.fillRect(s.x, s.y, s.w, s.w);
    }



}
window.onresize = rs;
document.onload = onload();