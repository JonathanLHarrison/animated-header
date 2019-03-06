/*
	Scripts for Animated Header
	Jonathan Harrison
	2019

	This is a modified version of the dark mode animated header for my website, jonathanharrison.us

	http://jonathanharrison.us
	https://github.com/JonathanLHarrison/animated-header.git

*/

/*
	Globals
*/
var $containerElement;
var $currentTimeline;
// avoid repeats of in animations
var $inAnimations = [0,1,2,3,4,5,6,7,8,9,10,11,12];
shuffle($inAnimations);
var $inAnimationIndex = 0;
// avoid repeats of out animations
var $lastAnimationOut;

// ready
$(document).ready(function() {

	// elements
	var animatedHeader = $("#animatedHeader");

	// setup SVG element and background/container
	var background = $("#headerBackground");
	var header = $("#header");
	$containerElement = document.getElementById("headerBackground");
	makeBackground($containerElement);
	centerElement(animatedHeader);

	// main timeline
	var tl = new TimelineMax();

	// remove starting background image
	tl.set(background, { backgroundImage: "none" });

	// reveal animation container
	tl.to(animatedHeader, 0.001, { autoAlpha: 1 });

});
// end ready

/*
	functions
*/

function makeBackground(container) {
    var newElement = document.createDocumentFragment();
    // top
    var top = document.createElement("div");
    top.place = "top";
    var size = { "width" : container.clientWidth, "height" : container.clientHeight / 2 };
    centerElement(top);
    top.className = "animated-header-scoreboard-background";
    top.style.width = size.width + "px";
    top.style.height = size.height + "px";
    newElement.appendChild(top);
    TweenLite.set(top, { y: "-=" + container.clientHeight / 4  });
    // bottom
    var bottom = document.createElement("div");
    bottom.place = "bottom";
    centerElement(bottom);
    bottom.className = "animated-header-scoreboard-background";
    bottom.style.width = size.width + "px";
    bottom.style.height = size.height + "px";
    newElement.appendChild(bottom);
    TweenLite.set(bottom, { y: "+=" + container.clientHeight / 4 });
    container.appendChild(newElement);

    // start animation loop
    animateOut(top, bottom, 1);
    
}

/*
	Animation Loop Functions
*/
// show the background to reveal the header's text
function animateIn(top, bottom) {

    // new timeline and update global
    var tl = new TimelineMax({ onComplete: animateOut, onCompleteParams: [top, bottom, 0], immediateRender: false });
    $currentTimeline = tl;

    // new animation
    var animation = $inAnimations[$inAnimationIndex];

    // incriment animation index
    $inAnimationIndex++;

    // completed cycle through animations, reset index, shuffle array
    if ($inAnimationIndex == $inAnimations.length) {
        $inAnimationIndex = 0;
        shuffle($inAnimations);
    }

    switch(animation) {
        // both together
        case 0: // in from left
            tl.add(inFromLeft(top), 0);
            tl.add(inFromLeft(bottom), 0);
        break;
        case 1: // in from left with overshoot
            tl.add(inFromLeftOvershootTop(top), 0);
            tl.add(inFromLeftOvershootBottom(bottom), 0);
        break;
        case 2: // in from right
            tl.add(inFromRight(top), 0);
            tl.add(inFromRight(bottom), 0);
        break;
        case 3: // in from right with overshoot
            tl.add(inFromRightOvershootTop(top), 0);
            tl.add(inFromRightOvershootBottom(bottom), 0);
        break;
        case 4: // in from top
            tl.add(inFromTopBoth(top, bottom));
        break;
        case 5: // in from bottom
            tl.add(inFromBottomBoth(top, bottom));
        break;
        case 6: // in from center X
            tl.add(scaleInFromCenterX(top), 0);
            tl.add(scaleInFromCenterX(bottom), 0);
        break;
        case 7: // in from center Y
            tl.add(scaleInFromCenterY(top), 0);
            tl.add(scaleInFromCenterY(bottom), 0);
        break;

        // different directions
        case 8: // in from left/right
            tl.add(inFromLeft(top), 0);
            tl.add(inFromRight(bottom), 0);
        break;
        case 9: // in from right/left
            tl.add(inFromRight(top), 0);
            tl.add(inFromLeft(bottom), 0);
        break;
        case 10: // in from left/right with overshoot
            tl.add(inFromLeftOvershootTop(top), 0);
            tl.add(inFromRightOvershootBottom(bottom), 0);
        break;
        case 11: // in from right/left with overshoot
            tl.add(inFromRightOvershootTop(top), 0);
            tl.add(inFromLeftOvershootBottom(bottom), 0);
        break;
        case 12: // in from top/bottom
            tl.add(inFromTop(top), 0);
            tl.add(inFromBottom(bottom), 0);
        break;

        default: // in from left
            tl.add(inFromLeft(top), 0);
            tl.add(inFromLeft(bottom), 0);
    }

}

// remove the background to hide the header's text
function animateOut(top, bottom, delay) {
    // new timeline and update global
    var tl = new TimelineMax({ onComplete: animateIn, onCompleteParams: [top, bottom], immediateRender: false, delay: delay });
    $currentTimeline = tl;

    // roll for animation
    var animation = randomInt(0, 6);

    // no repeats
    if ($lastAnimationOut == animation) {
        if (animation == 0) {
            animation++;
        }
        else {
            animation--;
        }
    }

    // update last animation
    $lastAnimationOut = animation;

    // switch on animation roll
    switch(animation) {
        // both together
        case 0: // to left
            tl.add(outToLeft(top), 0);
            tl.add(outToLeft(bottom), 0);
        break;
        case 1: // to right
            tl.add(outToRight(top), 0);
            tl.add(outToRight(bottom), 0);
        break;
        case 2: // scale x
            tl.add(scaleOutToCenterX(top), 0);
            tl.add(scaleOutToCenterX(bottom), 0);
        break;
        case 3: // scale y
            tl.add(scaleOutToCenterY(top), 0);
            tl.add(scaleOutToCenterY(bottom), 0);
        break;
        
        // different directions
        case 4: // to left/right
            tl.add(outToLeft(top), 0);
            tl.add(outToRight(bottom), 0);
        break;
        case 5: // to right/left
            tl.add(outToRight(top), 0);
            tl.add(outToLeft(bottom), 0);
        break;
        case 6: // to top/bottom
            tl.add(outToTop(top), 0);
            tl.add(outToBottom(bottom), 0);
        break;

        default: // to right
            tl.add(outToRight(top), 0);
            tl.add(outToRight(bottom), 0);
    }

}

/*
    IN animations
*/
var inDuration = 3;
var inDelay = 0.8;
function inFromLeft(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-150", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false" });
    return tl;
}
function inFromRight(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false" });
    return tl;
}
function inFromTop(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-50", yPercent: "-150", scaleX: 1, scaleY: 1 }, { yPercent: "-50", immediateRender: "false" });
    return tl;
}
function inFromBottom(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-50", yPercent: "50", scaleX: 1, scaleY: 1 }, { yPercent: "-50", immediateRender: "false" });
    return tl;
}
function scaleInTop(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 0 }, { scaleY: 1, immediateRender: "false", transformOrigin: "50% 0" });
    return tl;
}
function scaleInBottom(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 0 }, { scaleY: 1, immediateRender: "false", transformOrigin: "50% 100%" });
    return tl;
}
function stepsInFromLeft(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-150", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false", ease: SteppedEase.config(60) });
    return tl;
}
function stepsInFromRight(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false", ease: SteppedEase.config(60) });
    return tl;
}
function inFromLeftScale(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-150", yPercent: "-50", scale: 0.8 }, { xPercent: "-50", scale: 1, immediateRender: "false" });
    return tl;
}
function inFromRightScale(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "50", yPercent: "-50", scale: 1.1 }, { xPercent: "-50", scale: 1, immediateRender: "false" });
    return tl;
}
function scaleInFromCenterX(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-50", yPercent: "-50", scaleX: 0, scaleY: 1 }, { scaleX: 1, immediateRender: "false", transformOrigin: "50% 50%" });
    return tl;
}
function scaleInFromCenterY(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 0 }, { scaleY: 1, immediateRender: "false", transformOrigin: "50% 50%" });
    return tl;
}
function inFromLeftOvershootTop(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-150", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false", ease: Back.easeOut.config(4.95) });
    return tl;

}
function inFromRightOvershootTop(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false", ease: Back.easeOut.config(4.7) });
    return tl;

}
function inFromLeftOvershootBottom(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "-150", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false", ease: Back.easeOut.config(3.4) });
    return tl;

}
function inFromRightOvershootBottom(element) {
    var tl = new TimelineMax({ delay: inDelay });
    tl.fromTo(element, inDuration, { xPercent: "50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-50", immediateRender: "false", ease: Back.easeOut.config(6.2) });
    return tl;
}
function inFromTopBoth(top, bottom) {
    var tl = new TimelineMax({ delay: inDelay });
    var secondLine = "-=" + 0.25;
    tl.set(top, { zIndex: 10 });
    tl.set(bottom, { autoAlpha: 0, zIndex: 9 });
    tl.fromTo(top, inDuration/2, { xPercent: "-50", yPercent: "-150", scaleX: 1, scaleY: 1 }, { yPercent: "-50", immediateRender: "false" });
    tl.set(bottom, { autoAlpha: 1 }, secondLine);
    tl.fromTo(bottom, inDuration/2, { xPercent: "-50", yPercent: "-150", scaleX: 1, scaleY: 1 }, { yPercent: "-50", immediateRender: "false" }, secondLine);
    return tl;
}
function inFromBottomBoth(top, bottom) {
    var tl = new TimelineMax({ delay: inDelay });
    var secondLine = "-=" + 0.5;
    tl.set(top, { autoAlpha: 0, zIndex: 9 });
    tl.set(bottom, { zIndex: 10 });
    tl.fromTo(bottom, inDuration/2, { xPercent: "-50", yPercent: "50", scaleX: 1, scaleY: 1 }, { yPercent: "-50", immediateRender: "false" });
    tl.set(top, { autoAlpha: 1 }, secondLine);
    tl.fromTo(top, inDuration/2, { xPercent: "-50", yPercent: "50", scaleX: 1, scaleY: 1 }, { yPercent: "-50", immediateRender: "false" }, secondLine);
    return tl;
}

/* 
    OUT animations
*/
var outDuration = 1.3;
var outDelay = 2;
function outToRight(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50" }, { xPercent: "50", ease: Linear.easeNone, immediateRender: false });
    return tl;
}
function outToLeft(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50" }, { xPercent: "-150", ease: Linear.easeNone, immediateRender: false });
    return tl;
}
function outToBottom(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50" }, { yPercent: "50", ease: Linear.easeNone, immediateRender: false });
    return tl;
}
function outToTop(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50" }, { yPercent: "-150", ease: Linear.easeNone, immediateRender: false });
    return tl;
}
function scaleOutToCenterX(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1 }, { scaleX: 0, immediateRender: "false", transformOrigin: "50% 50%" });
    return tl;
}
function scaleOutToCenterY(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { scaleY: 0, immediateRender: "false", transformOrigin: "50% 50%" });
    return tl;
}
function outToRightOvershootTop(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "50", immediateRender: "false", ease: Back.easeIn.config(4.85) });
    return tl;

}
function outToRightOvershootBottom(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "50", immediateRender: "false", ease: Back.easeIn.config(6.5) });
    return tl;

}
function outToLeftOvershootTop(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-150", immediateRender: "false", ease: Back.easeIn.config(5) });
    return tl;

}
function outToLeftOvershootBottom(element) {
    var tl = new TimelineMax({ delay: outDelay });
    tl.fromTo(element, outDuration, { xPercent: "-50", yPercent: "-50", scaleX: 1, scaleY: 1 }, { xPercent: "-150", immediateRender: "false", ease: Back.easeIn.config(3.5) });
    return tl;

}


/*
    utlities
*/
// place an element at the center of its parent
function centerElement(element, xAxisOnly) {
    if (xAxisOnly) {
        TweenLite.set(element, { left:'50%', xPercent:'-50' });
    }
    else {
        TweenLite.set(element, { left:'50%',top:'50%', xPercent:'-50',yPercent:'-50'});
    }
}
// return a random float between 2 given floats
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
// return a random integer between 2 given ints
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// shuffle and return an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}







