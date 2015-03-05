var prevdirection = "";

var wwaanim;
var lastslide = 0;
var abtl;
var stage2played = false;
var stagefl3played = false;
var stagesrv01 = false;
var stagesrv02 = false;
var stagesrv03 = false;
var stagesrv04 = false;
var pagehomeplayed = false;
var failurelabEngagementPlayed = false;
var pagegooddesignplayed = false;
var stageaniauto01played = false;
var _allowFSVideo, _isMobile;

function allowFSVideo() {
  if (_allowFSVideo == undefined){ _allowFSVideo = (navigator.platform.indexOf("iPhone") == -1) && (navigator.platform.indexOf("iPod") == -1) && (navigator.userAgent.match(/iPad/i) == null) && Modernizr.testProp('objectFit'); }
	return _allowFSVideo;
}
function isMobile() {
  if (_isMobile == undefined){ _isMobile = (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.userAgent.match(/iPad/i) != null); }
	return _isMobile;
}

jQuery(document).ready(function ($) {
  	$("#pageloading").css({"opacity":"0","visibility":"hidden"});
  	
  	removeformobile();
    setTimeout(openKnife, 1750);
  
    if ($('#homepage').length > 0) {
        $('#homepage').fullpage({
            scrollOverflow: true,
          	anchors: ['page-home', 'page-about', 'page-good-design', 'page-who-we-are', 'page-failure-lab', 'page-automation', 'page-clients'],
            sectionsColor: ['#00a8e1','#00a8e1','#ffffff','#ffffff','#ffffff', '#ffffff', '#ffffff'],
            navigation: true,
            navigationPosition: 'left',
          	onLeave: function(index, nextIndex, direction){
              //console.log(index);
                if(index ==  1) {
                  closeKnife();
                }
                if(index == 4) {
                  resetWWA();
                }
               if (index == 6){
                 resetSwipe();
								}
            },
            afterLoad: function (anchorLink, index) {
              	//console.log("afterLoad:" + anchorLink + ", " + index);
              	if (allowFSVideo()){
              		$('video').get(2).pause();
                }else{
                  $('video').eq(2).hide();
                }
              	if (!isMobile()){
                  $('video').get(0).play();
                  $('video').get(1).play();
                }else{
                  $('video').eq(0).hide();
                  $('video').eq(1).hide();
                  setTimeout(function(){ jQuery("#wwa p").css("opacity", "1"); }, 500);                  
                  $("#failure-lab03").css({"background":"url(/wp-content/uploads/2015/02/failurelab-video.jpg) no-repeat", "background-size":"cover", "background-position":"center"});
                  $("#ani-stage-fl03").hide();
                }
              
              	if (loadedEdgeComps['ani-auto02']) { loadedEdgeComps['ani-auto02'].getStage().stop(0); }
              
              	$("#fp-nav").show();
                if (index > 2 && anchorLink != "page-failure-lab" && anchorLink != "page-clients") {
                  $(".top-nav").removeClass("light").removeClass("black").addClass("dark");
                  $("#fp-nav").removeClass("light").removeClass("black").addClass("dark");
                  $("#menuToggle").removeClass("black").addClass("dark");
                }else if (anchorLink != "page-clients"){
                  $(".top-nav").removeClass("dark").removeClass("black").addClass("light");
                  $("#fp-nav").removeClass("dark").removeClass("black").addClass("light");
                  $("#menuToggle").removeClass("black").removeClass("dark");
                }else {
                  $(".top-nav").removeClass("dark").removeClass("light").addClass("black");
                  $("#fp-nav").removeClass("dark").removeClass("light").addClass("black");
                  $("#menuToggle").removeClass("dark").addClass("black");                  
                }
              
              	if (anchorLink == 'page-home'){
                  openKnife();
                }
                else if (anchorLink == "page-good-design" && !pagegooddesignplayed){
                  //$("#good-design-state01").css("display", "block");
                  //$("#good-design-state01").css("top", "-"+$("#good-design-state01").css("height"));
                  $("#good-design-state01").css("transform", "translateY(-"+$("#good-design-state01").css("height")+")");
                  $("#good-design-state03").css("display", "block");
                  $("#good-design-state02").css("display", "none");
                  setTimeout(function(){ $("#good-design-state01").hide(); }, 3500);
                  pagegooddesignplayed = true;
                }
              	else if(anchorLink == 'page-who-we-are'){
                  if (!isMobile())
                  { 
                   runWWA();
                  	setTimeout(function(){ jQuery("#wwa p").css("opacity", "1"); }, 1500);
                  }
                }              
                else if (anchorLink == "page-automation"){
                  startSwipe();
                }

              
              	if (anchorLink == "page-automation") {
              		$.fn.fullpage.moveTo("page-automation", 0);
              	}
              	if (anchorLink == "page-failure-lab") {
              		$.fn.fullpage.moveTo("page-failure-lab", 0);
              	}
              
              
            },
            afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
              //console.log("afterSlideLoad:" + anchorLink + ", " + slideAnchor);
              if (slideIndex > 0){
                $("#fp-nav").hide();
              }else{
                $("#fp-nav").show();
              }

              	restartfl05();  
              	$(".photography, .messaging, .experience").removeClass('active-description');
                $(".photo-panel").removeClass('active-photo-panel');
                $(".how-panel").removeClass('active-how-panel');

              
              if (anchorLink == "page-failure-lab" && slideAnchor == "failurelab-engagement" && !failurelabEngagementPlayed){
                window.startCircles();
                failurelabEngagementPlayed = true;
              }
              if (slideAnchor == "failurelab-video"){
                setTimeout(showfl05, 500);
              }              
              else if (slideAnchor == "automation-video") {
              	if (allowFSVideo()){
									$('video').get(2).play();
                }else{
                  $('video').eq(2).hide();
                }                
							}
              else if (slideAnchor == "failurelab-layout") {
                $(".photography, .messaging, .experience").addClass('active-description');
                $(".photo-panel").addClass('active-photo-panel');
                $(".how-panel").addClass('active-how-panel');
              }
              else if (anchorLink == "page-failure-lab" && slideAnchor == "failurelab-layout" ) {
                $('#flCarousel').carousel({interval: 2000, pause: "false", wrap : false});
                $('#flCarousel').carousel(0);
              }
              else if (slideAnchor == "automation-slide"){
                loadedEdgeComps['ani-auto02'].getStage().play(0);
              }
              
              if (slideAnchor == "automation-engage" || slideAnchor == "automation-navigate" || slideAnchor == "automation-video" || slideAnchor == "failurelab-intro" || slideAnchor == "failurelab-encourage" || slideAnchor == "failurelab-video-summary"){
                  $(".top-nav").removeClass("dark").addClass("light");
                  $("#fp-nav").removeClass("dark").addClass("light");
                	$("#menuToggle").removeClass("dark");
              } else {
              	$(".top-nav").removeClass("light").addClass("dark");
              	$("#fp-nav").removeClass("light").addClass("dark");
                $("#menuToggle").addClass("dark");
              }
            }
          
        });
    }
  
    if ($('#about-us').length > 0) {
        $('#about-us').fullpage({
            scrollOverflow: true,
          	anchors: ['page-about', 'page-process', 'page-team-leads-1', 'page-team-leads-2', 'page-team-leads-3', 'page-careers'],
            navigation: true,
            navigationPosition: 'left',
          	onLeave: function(index, nextIndex, direction){
              	$('.team-leads h3').css({'transition':'opacity 0s','opacity':'1'});
              	$('.team-leads .info').css({'transition':'opacity 0s','opacity':'0'});
            },          
            afterLoad: function (anchorLink, index) {
              	if (allowFSVideo()){
                  $('video').get(0).pause();
                  $('video').get(1).pause();
                  $('video').get(2).pause();
                  $('video').get(3).pause();   
                }else{
                  $('video').hide();
                }
              
              	clearTimeout(abtl);
              	abtl = setTimeout(function(){ $('.team-leads h3').css({'transition':'opacity 1s','opacity':'0'}); $('.team-leads .info').css({'transition':'opacity 1s','opacity':'1'}); }, 1000);
                if (index == 2 && lastslide > 0){
                  $('video').get(lastslide-1).play();
                }
              	if (anchorLink == "page-careers"){
                  $(".top-nav").removeClass("light").addClass("dark");
                  $("#fp-nav").removeClass("light").addClass("dark");
                  $("#menuToggle").addClass("dark");
                }
              	else{
                  $(".top-nav").removeClass("dark").addClass("light");
                  $("#fp-nav").removeClass("dark").addClass("light");
                  $("#menuToggle").removeClass("dark");
                }
            },
            afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
              lastslide = slideIndex;
              if (slideIndex > 0){
                $("#fp-nav").hide();
              }else{
                $("#fp-nav").show();
              }              
              if (index == 2 && slideIndex > 0){
                if (allowFSVideo()){
                  $('video').get(0).pause();
                  $('video').get(1).pause();
                  $('video').get(2).pause();
                  $('video').get(3).pause();
                  $('video').get(slideIndex-1).play();
                }else{
                  $('video').hide();
								}	                  

              }
            }
        });
    }  
  
    if ($('#services').length > 0) {
        $('#services').fullpage({
            scrollOverflow: true,
          	anchors: ['page-services'],
            navigation: false,
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
              //console.log("afterSlideLoad:" + anchorLink + ", " + slideAnchor);
              lastslide = slideIndex;
                if (slideIndex < 1) {
                  $(".top-nav").removeClass("light").addClass("dark");
                  $("#fp-nav").removeClass("light").addClass("dark");
                  $("#menuToggle").addClass("dark");
                }else{
                  $(".top-nav").removeClass("dark").addClass("light");
                  $("#fp-nav").removeClass("dark").addClass("light");
                  $("#menuToggle").removeClass("dark");
                }
              
              loadedEdgeComps['ani-services01'].getStage().stop(0);
              loadedEdgeComps['ani-services02'].getStage().stop(0);
              loadedEdgeComps['ani-services03'].getStage().stop(0);
              loadedEdgeComps['ani-services04'].getStage().stop(0);
              
              if (slideAnchor == "research"){
                  loadedEdgeComps['ani-services01'].getStage().play(0);
              }
              else if (slideAnchor == "content-strategy"){
                  loadedEdgeComps['ani-services02'].getStage().play(0);
              }
              else if (slideAnchor == "ux-architecture"){
                  loadedEdgeComps['ani-services03'].getStage().play(0);
              }
              else if (slideAnchor == "brand-and-identity"){
                  loadedEdgeComps['ani-services04'].getStage().play(0);
              }              
              
            }
        });
        $(".top-nav").removeClass("light").addClass("dark");
        $("#fp-nav").removeClass("light").addClass("dark");
      	$("#menuToggle").addClass("dark");
    }   

    if ($('#fullpage').length > 0) {
        $('#fullpage').fullpage({
            scrollOverflow: true,
            navigation: false,
            navigationPosition: 'left'
        });
    }

  	if ($("#map").length > 0){ loadGoogleMap(); }
 
  	$("#section4 .ng").bind("click touchstart", function (e) {
      e.preventDefault();
      var w = jQuery(window).width();
      if (w > 991)
      {
        $(".team-lead-01", this).toggleClass("active");
        $(".info", this).toggleClass("active");
      }
    });
  
    $("#section5 .ng").bind("click touchstart", function (e) {
      e.preventDefault();
        var w = jQuery(window).width();
        if (w > 991)
          {
        		$(".team-lead-02", this).toggleClass("active");
        		$(".info", this).toggleClass("active");
          }

    });
    $("#section5a .ng").bind("click touchstart", function (e) {
      e.preventDefault();
      var w = jQuery(window).width();
      if (w > 991)
      {
        $(".team-lead-02", this).toggleClass("active");
        $(".info", this).toggleClass("active");
      }
    });  
  
    $(".show-menu").bind("click touchstart", function (e) {
      	e.preventDefault();
      	if ($("#fs-menu").is(":visible")){
        	$("#fs-menu").fadeOut();
      		$(".navicon").removeClass("open");
        }else{
        	$("#fs-menu").fadeIn();
      		$(".navicon").addClass("open");
        }
    });

    $("#fs-menu").bind("click", function () {
        $("#fs-menu").fadeOut();
      	$(".navicon").removeClass("open");
    });
      
    $(".hi-icon").bind("click touchstart", function (e) {
      	e.preventDefault();
      	jQuery.fn.fullpage.moveSectionDown();
    });      
  
    $("a.move").bind("click touchstart", function (e) {
      	e.preventDefault();
      	var page = jQuery(this).data("page");
      	var slide = jQuery(this).data("slide")
      	jQuery.fn.fullpage.moveTo(page,slide);
    });  
      
    $("#aboutCarousel").addClass("slide");

  
  
    resizeForPaint();
    $(window).resize(function () {
        resizeForPaint();
    });
 
});

function removeformobile(){
  var w = jQuery(window).width();
  if (w < 991)
  {
    jQuery(".section.team-leads").remove();
    //jQuery("#our-process").remove();
  }
}


function swipe1() {
  jQuery(".screen1a").toggleClass("screen1b");
  jQuery(".screen2a").toggleClass("screen2b");
}
function swipe2() {
  jQuery(".screen2b").toggleClass("screen2c");
  jQuery(".screen3a").toggleClass("screen3b");
}
function startSwipe() {
  swipe1();
  setTimeout(swipe2, 1500);
}
function resetSwipe() {
  swipe2();
  setTimeout(swipe1, 1500);
}

function openKnife() {
  jQuery(".knife-container").addClass("knife-rotate");
  jQuery(".animation-container h2").addClass("hide-caption");
  jQuery(".pen").removeClass("pen-closed");
  jQuery(".glass").removeClass("glass-closed");
  jQuery(".arrow-alt").removeClass("arrow-alt-closed");
}

function closeKnife() {
  jQuery(".knife-container").removeClass("knife-rotate");
  jQuery(".animation-container h2").removeClass("hide-caption");
  jQuery(".pen").addClass("pen-closed");
  jQuery(".glass").addClass("glass-closed");
  jQuery(".arrow-alt").addClass("arrow-alt-closed");
}


function runWWA() { //iPhone Rain
  jQuery("#stage-ani-wwa .hand").addClass("moveHand");
  jQuery("#stage-ani-wwa .full-design").addClass("opened");
  jQuery("#stage-ani-wwa .hand").addClass("hideHand");
  jQuery("#stage-ani-wwa .wireframe-design").addClass("hide-wireframe")
}

function resetWWA() { //iPhone Rain
  jQuery("#stage-ani-wwa .hand").removeClass("moveHand");
  jQuery("#stage-ani-wwa .full-design").removeClass("opened");
  jQuery("#stage-ani-wwa .hand").removeClass("hideHand");
  jQuery("#stage-ani-wwa .wireframe-design").removeClass("hide-wireframe")
}

function wwaAnimate(){
  
  setTimeout(function(){ 
    jQuery("#wwai02").css("width", "100%"); 
    jQuery("#wwai03").css("width", "100%"); 
    setTimeout(function(){ 
      jQuery("#wwa p").css("opacity", "1");
      jQuery("#wwai03").css("display", "block");
      jQuery("#wwai02").css("opacity", "0");
      jQuery("#wwai01").css("display", "none");
    }, 2000);    
  }, 2000);
  
}

function showfl05(){
  jQuery("#failurelab-video-ending").css("opacity","1");
  jQuery("#failure-lab03 .top-nav").removeClass("dark").addClass("light");
  jQuery("#failure-lab03 a.move").removeClass("dark").addClass("light");
  jQuery("#failure-lab03 .hi-icon-down").removeClass("dark");  
}

function restartfl05(){
  jQuery("#failurelab-video-ending").css("opacity","0");
  jQuery("#failure-lab03 .top-nav").removeClass("light").addClass("dark");
  jQuery("#failure-lab03 a.move").removeClass("light").addClass("dark");
  jQuery("#failure-lab03 .hi-icon-down").addClass("dark");  
}

function resizeForPaint(){
  	var w = jQuery(window).width();
  	var h = jQuery(window).height();
  	jQuery(".nav-container").width(w).height(h);
  	jQuery("#aboutCarousel").height(h);
  	jQuery("#map").height(h);
    jQuery("#good-design-state01").css("height", (w / 1500 * 2581) + "px");
  if (jQuery("#contact h1:eq(0) span").length > 0) {
    	jQuery("#contact h1:eq(0) span").css("font-size", "36px");
  		adjustHeights(jQuery("#contact h1:eq(0) span"));
      jQuery("#contact h1:eq(1) span").css("font-size", jQuery("#contact h1:eq(0) span").css("font-size"));
      jQuery("#contact h1:eq(2) span").css("font-size", jQuery("#contact h1:eq(0) span").css("font-size"));
      
  	}
    
  	
}

function adjustHeights(elem) {
  var fontstep = 2;
  if (jQuery(elem).width()>jQuery(elem).parent().width()) {
    jQuery(elem).css('font-size',((jQuery(elem).css('font-size').substr(0,2)-fontstep)) + 'px');
    adjustHeights(elem);
  }
}

jQuery.fn.inView = function(inViewType){
    var viewport = {};
    viewport.top = jQuery(window).scrollTop();
    viewport.bottom = viewport.top + jQuery(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    switch(inViewType){
      case 'bottomOnly':
        return ((bounds.bottom <= viewport.bottom) && (bounds.bottom >= viewport.top));
      case 'topOnly':
        return ((bounds.top <= viewport.bottom) && (bounds.top >= viewport.top));
      case 'both':
        return ((bounds.top >= viewport.top) && (bounds.bottom <= viewport.bottom));         
      default:     
        return ((bounds.top >= viewport.top) && (bounds.bottom <= viewport.bottom));        
    }
};


jQuery("#menuToggle").on("click", function() {
  ga('send', 'event', 'UI', 'click', 'Hamburger');
});

jQuery(".contact-svg").on("click", function() {
  ga('send', 'event', 'UI', 'click', 'Contact');
});

jQuery(".home-links").on("click", function() {
  ga('send', 'event', 'UI', 'click', 'Home Links');
});

function loadGoogleMap(){

  var pinkmarker = new google.maps.MarkerImage('/wp-content/uploads/2014/12/psst.png', new google.maps.Size(102, 54) );
  google.maps.event.addDomListener(window, 'load', init);
  google.maps.event.addDomListener(window, 'resize', init);
  
  function init() {
    var mapOptions = {
      zoom: 13,
      mapTypeControl: false,
      zoomControl: false,
      panControl:false,
      streetViewControl:false,
      center: new google.maps.LatLng(42.9626015,-85.6706088),
      icon: pinkmarker,
      styles: [
    {
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        { "color": "#000000" }
      ]
    },{
      "featureType": "water",
      "stylers": [
        { "color": "#333333" }
      ]
    },{
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road",
      "stylers": [
        { "color": "#00a8e1" }
      ]
    },{
      "featureType": "road"  }
  ]
  
    };
    
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var myLatlng = new google.maps.LatLng(42.9626015,-85.6706088);
    var marker = new google.maps.Marker({	position: myLatlng, icon: pinkmarker,	map: map });
    google.maps.event.addListener(marker, "click", function() {
			window.open('https://www.google.com/maps/dir//15+Ionia+Ave+SW+%23230,+Grand+Rapids,+MI+49503/@42.9626015,-85.6706088,17z/data=!4m13!1m4!3m3!1s0x8819adc472f38d2f:0xbf32a13a6c8f00b2!2s15+Ionia+Ave+SW+%23230,+Grand+Rapids,+MI+49503!3b1!4m7!1m0!1m5!1m1!1s0x8819adc472f38d2f:0xbf32a13a6c8f00b2!2m2!1d-85.6706088!2d42.9626015', '_blank');
      //window.location.href = "https://www.google.com/maps/place/Brightly/@42.8387834,-85.0514313,9z/data=!4m5!1m2!2m1!1sbrightly!3m1!1s0x8819adcd04b86e17:0xf35fd37abf113f82"; 
    });
  }

}