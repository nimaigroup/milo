/**
 * Created by RA on 5/19/2017.
 */

var $debug = true;

var $bgImage = document.getElementById("bgImage");
var $bgImg_1 = "images/bg/bg_1.jpg";
var $bgImg_2 = "images/bg/bg_2.jpg";
var $bgImg_3 = "images/bg/bg_3.jpg";

var $jsLinks = [
    'js/TweenMax.min.js'
    // ,'js/twitter
    // Fetcher_min.js'
    // ,'js/scrollreveal.min.js'
];

// trace for consistent console logging
function trace(value) {
    if ($debug === true) {
        console.log('<<< ', value, ' >>>')
    }
}

function init() {
    trace('init');
    loadJS($jsLinks);
}

function start() {
    trace('start');
    // document.documentElement.requestFullscreen();
    // loadBackVid();
    slideShow("intro-bg",15,2,1.0,0);
}

function loadBackVid() {
    TweenMax.to("#bgvid", 1.7, {
        y : 0,
        opacity : 1,
        scale : 1,
        ease : Power2.easeOut
    }, 0.7);
    return "BackVid LOADED";
}



// ====================================
//     FULL BACKGROUND SLIDE SHOW
//     VANILLA JS & GSAP
//     Example Call:
//     slideShow("intro-bg",10,1.3,0.5,0);
// ====================================


var $slides;
// var $slides = document.getElementsByClassName("intro-bg"); //slides
var stayTime; //time the slide stays
var slideTime; //fade in / fade out time
var alphaSet;
var currentSlide = 0; //keep track on the current slide

function slideShow(slideClass,sTime,tTime,alpha,current) {
    $slides = document.getElementsByClassName(slideClass); //slides
    currentSlide = current; //keep track on the current slide
    stayTime = sTime; //time the slide stays
    slideTime = tTime; //fade in / fade out time
    alphaSet = alpha;

    TweenLite.set($slides, {autoAlpha:0, onComplete: function(){
        TweenLite.to($slides[currentSlide],(slideTime*2), {autoAlpha:alphaSet});	//show first image
        TweenLite.delayedCall(stayTime, nextSlide); //start the slideshow
    }});	//hide all images

}
function nextSlide() {
    TweenLite.to($slides[currentSlide], slideTime, {
        autoAlpha: 0,
        className: "-=bg-active"
    }); //fade out the old slide
    currentSlide = ++currentSlide % $slides.length; //find out which is the next slide
    TweenLite.to($slides[currentSlide], slideTime, {
        autoAlpha: alphaSet,
        className: "+=bg-active"
    }); //fade in the next slide
    TweenLite.delayedCall(stayTime, nextSlide); //wait a couple of seconds before next slide
}


//======================================
//========= CUSTOM FUNCTIONS =============
//======================================

function loadJS(link) {
    loadScripts(link,function(){
        trace('Scripts loaded');
        start();
    });
}

function loadScripts(array,callback){
    var loader = function(src,handler){
        var script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = function(){
            script.onreadystatechange = script.onload = null;
            handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function run(){
        if(array.length!=0){
            loader(array.shift(), run);
        }else{
            callback && callback();
        }
    })();
}

function once(fn, context) {
    var result;

    return function() {
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
}

// Usage
var canOnlyFireOnce = once(function() {
    console.log('Fired!');
});

// canOnlyFireOnce(); // "Fired!"
// canOnlyFireOnce(); // nada


// ======================================





window.addEventListener('load', init);
