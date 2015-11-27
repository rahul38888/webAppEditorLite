window.onload = initAll;

var htmlH =170;
var cssH =170;
var javaH =170;

var enable;
var glblType;
var timer;

function initAll(){

  //document.getElementById("html").style.cursor = "s-resize";

  document.onmousemove = mouseMoveHandler;

  document.getElementById("html").onkeyup = updateOutput;
  document.getElementById("css").onkeyup = updateOutput;
  document.getElementById("java").onkeyup = updateOutput;

  var output = document.getElementById("output");

  document.getElementById("html").style.width = screen.width/2 - 100 +"px";
  document.getElementById("css").style.width = screen.width/2 - 100  +"px";
  document.getElementById("java").style.width = screen.width/2 - 100  +"px";
  document.getElementById("resize1").style.width = screen.width/2 - 33  +"px";
  document.getElementById("resize2").style.width = screen.width/2 - 33  +"px";

  output.style.width = screen.width/2 - 100 +"px";
}

function updateOutput(){
  clearTimeout(timer);
  timer=setTimeout(function(){submitHandler()},3000);
}

function submitHandler(){
  document.getElementById("output").srcdoc = "<style>" + document.getElementById("css").value + "</style>" + "<script>" + document.getElementById("java").value + "</script>" + document.getElementById("html").value;
}

function focusHandler(type){
  document.getElementById(type+"Text").style.opacity = 0.8;
}

function blurHandler(type){
  if(document.getElementById(type).value=="") document.getElementById(type+"Text").style.opacity = 0.5;
}


function animateDrag(posY,type){
  if(type=="resize1"){
    var pre = htmlH;

    htmlH = posY-40;
    if(htmlH<100) document.getElementById("htmlText").style.opacity = 0;
    else{
      document.getElementById("htmlText").style.opacity = 0.8;
      blurHandler("html");
    }
    document.getElementById("html").style.height = htmlH +"px";
    document.getElementById("htmlGap").style.height = htmlH + 10 +"px";

    cssH = cssH - htmlH + pre;
    if(cssH<100) document.getElementById("cssText").style.opacity = 0;
    else{
      document.getElementById("cssText").style.opacity = 0.8;
      blurHandler("css");
    }
    document.getElementById("css").style.height = cssH +"px";
    document.getElementById("cssGap").style.height = cssH + 10 +"px";
  }
  else if(type=="resize2"){
    var pre = cssH;

    cssH = posY-65-htmlH;
    if(cssH<100) document.getElementById("cssText").style.opacity = 0;
    else{
      document.getElementById("cssText").style.opacity = 0.8;
      blurHandler("css");
    }
    document.getElementById("css").style.height = cssH +"px";
    document.getElementById("cssGap").style.height = cssH + 10 +"px";

    javaH = javaH - cssH + pre;
    if(javaH<100) document.getElementById("javaText").style.opacity = 0;
    else{
      document.getElementById("javaText").style.opacity = 0.8;
      blurHandler("java");
    }
    document.getElementById("java").style.height = javaH +"px";
    document.getElementById("javaGap").style.height = javaH + 10 +"px";
  }

}

function mouseMoveHandler(){
  var evt = window.event;
  if(enable){
    animateDrag(evt.clientY,glblType);
  }
}

function enableDrag(type){
  enable = 1;
  glblType = type;
  document.getElementById("body").style.cursor="row-resize";
}

function disableDrag(){
  enable = 0;
  document.getElementById("body").style.cursor="default";
}
