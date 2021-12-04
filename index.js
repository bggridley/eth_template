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


var r = true;
function onload() {

    duplicateChildNodes("marquee_img");

    loadEth();
    showRemaining();
    rs();

 
    r = false;

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

// this is a bit of a hack, but it allows us to make the marquee work

function duplicateChildNodes (parentId){
    var parent = document.getElementById(parentId);
    NodeList.prototype.forEach = Array.prototype.forEach;
    var children = parent.childNodes;
    children.forEach(function(item){
      var cln = item.cloneNode(true);
      parent.appendChild(cln);
    });
  };


function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("navbar").style.position = "sticky";
}

function rs() { // response star or resize however you wanna look at it
    //document.getElementById("marquee").style.height = document.getElementById("marquee_img").clientHeight;
    closeModal();
    canvas.height = document.getElementById('body').clientHeight;
    canvas.width = canvas.clientWidth;
    for (var i = 0; i < amount; i++) {
        responsiveStar(r, i);
    }

}

function responsiveStar(load, i) {
    var cw = canvas.clientWidth;
    var ch = canvas.clientHeight;
    if (load) {
        stars[i] = new Star(cw, ch);
    }
}

function toggleModal() {
    var value = document.getElementById("modal").style.display;
    var set = value != "flex" ? "flex" : "none";
    document.getElementById("modal").style.display = set;

    var value2 = document.getElementById("navbar").style.position;
    var set2 =  value2 != "sticky" ? "sticky" : "fixed";

    document.getElementById("navbar").style.position = set2;
}

function toRGBString(v) {
    return "rgb(" + v[0] + ", " + v[1] + ", " + v[2] + ")"; 
}

function draw() {
    var grd = context.createLinearGradient(0, 0, 0, canvas.clientHeight);
    color1 = [1, 69, 186];
    color2 = [255, 117, 198];




    var sy = window.scrollY;
    if(sy < 1400) {
        grd.addColorStop(0, toRGBString(color1));
    } else if (sy < 1800) {
        var interp = (sy - 1400) / 400.0; // interpolation as a percent'

        var r = color2[0] - color1[0];
        var g = color2[1] - color1[1];
        var b = color2[1] - color1[1];
        var color = [color1[0] + r * interp, color1[1] + g * interp, color1[2] + b * interp];
        grd.addColorStop(0, toRGBString(color));
    } else {
        grd.addColorStop(0, toRGBString(color2));
    }

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