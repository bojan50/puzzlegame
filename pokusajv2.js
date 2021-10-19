var delovi = new Array();
var grids = new Array(); 
var mis = null; 
var brojPokusaja = 0;
var secondlimit = 60;
var interval;

var  diffX  =  null;
var  diffY  =  null;

var maxZ = 1; 
var prelaz = null;
const zvuk = new Audio();
zvuk.src = "../zr_Bojan_Cipovic_rt-5516/zvukovi/wall.mp3"


function pokazi(){
   document.getElementById("loadingImage").style.visibility="visible";
   setTimeout("sakri()", 1300);
   brojPokusaja++;
   console.log(brojPokusaja);
   if(brojPokusaja > 3){
      document.getElementById("btnpomoc").disabled = true;
      alert("Pomoc mozes iskoristiti samo 3 puta!");
   }
}

function sakri(){
   document.getElementById("loadingImage").style.visibility="hidden";
}
function osvezi() {
   location.reload();
 }

var myVar = setInterval(function(){ 
   myTimer() 
}, 1000);

function myTimer() {
   if(secondlimit == 0)
{
    myStopFunction();
    document.getElementById("gameover").style.display="block";

}
   document.getElementById("vreme").innerHTML = '00:' + zeroPad(secondlimit,2);
   secondlimit = secondlimit  - 1;
}

function stopTimer(){
   clearInterval(interval);
   $('#zavrsi').on('click', function(){
      zavrsi();
   });
}

function myStopFunction() {
    clearInterval(myVar);
}

function zeroPad(num, size) {
   num = num.toString();
   while( num.length < size) num = "0" + num;
   return num;
}


function izmesaj() {
   window.location.reload();
}


function zavrsi() {
   for (var i = 0; i < grids.length; i++) {
    delovi[i].style.backgroundImage = "";
      grids[i].style.backgroundImage = "url(slike/puzla/deo"+i+".jpg)";
   }
   document.getElementById("win").style.display="block";
   document.getElementById("gameover").style.visibility="hidden";
}

function poredjaj(object) {
   for (var i = 0; i < grids.length; i++) {
      if(withinIt(object, grids[i])) {
         object.style.left = grids[i].style.left;
         object.style.top = grids[i].style.top;
         break;
      }
   }
}

window.onload = init;

function init() {

   var sviElem = document.getElementsByTagName("*");

   for (var i = 0; i < sviElem.length; i++) {
      if (sviElem[i].className == "grid") grids.push(sviElem[i]);
      if (sviElem[i].className == "delovi") delovi.push(sviElem[i]);
   }

   var randomIntegers = nasumicniNiz(delovi.length);

   for(i = 0; i < delovi.length; i++) {
    delovi[i].style.backgroundImage = "url(slike/puzla/deo" + randomIntegers[i] + ".jpg)";
    delovi[i].style.top  =  getStyle(delovi[i],"top");
    delovi[i].style.left  =  getStyle(delovi[i],"left");
    delovi[i].style.width  =  getStyle(delovi[i],"width");
    delovi[i].style.height  =  getStyle(delovi[i],"height");

    delovi[i].style.cursor = "pointer";

      addEvent(delovi[i], "mousedown", mouseGrab, false);
   }

   for  (var  i  =  0;  i  <  grids.length;  i++)  {
      grids[i].style.top  =  getStyle(grids[i],"top");
      grids[i].style.left  =  getStyle(grids[i],"left");
      grids[i].style.width  =  getStyle(grids[i],"width");
      grids[i].style.height  =  getStyle(grids[i],"height");
}
   document.getElementById("izmesaj").onclick  =  izmesaj;
   document.getElementById("zavrsi").onclick  =  zavrsi;

}


function dropValid(object) {
   for (var i = 0; i < delovi.length; i++) {
      if (withinIt(object, delovi   [i])) return false;
   }
   return true;
}

function highlightGrid(object) {
   if(prelaz) prelaz.style.backgroundColor = "";

   for (var i = 0; i < grids.length; i++) {
        if (withinIt(object, grids[i])) {
            prelaz = grids[i];
            prelaz.style.backgroundColor = "green";
            break;
        }
    }
}

function mouseGrab(e) {
   var evt = e || window.event;
   mis = evt.target || evt.srcElement;

   maxZ ++;
   mis.style.zIndex = maxZ; 
   mis.style.cursor = "move";
   
   var  mouseX  =  evt.clientX;  
   var  mouseY  =  evt.clientY;  

   diffX  =  parseInt(mis.style.left)  -  mouseX;
   diffY  =  parseInt(mis.style.top)  -  mouseY;

   addEvent(document,  "mousemove",  mouseMove,  false);
   addEvent(document,  "mouseup",  mouseDrop,  false);
}


function  mouseMove(e)  {
   var  evt  =  e  ||  window.event;

   var  mouseX  =  evt.clientX;
   var  mouseY  =  evt.clientY;

   mis.style.left  =  mouseX  +  diffX  +  "px";
   mis.style.top  =  mouseY  +  diffY  +  "px";
   highlightGrid(mis);
}


function  mouseDrop(e)  {
   if(dropValid(mis)) {
    poredjaj(mis);
    
      removeEvent(document,  "mousemove",  mouseMove,  false);
      removeEvent(document,  "mouseup",  mouseDrop,  false);
      mis.style.cursor = "pointer";
      zvuk.play();
   }
}

function getStyle(object, styleName) {
   if (window.getComputedStyle) {
      return document.defaultView.getComputedStyle(object, null).getPropertyValue(styleName);
   } else if (object.currentStyle) {
      return object.currentStyle[styleName]
   }
}

function withinIt(object1, object2) {
   var within = false;
   var x1 = parseInt(object1.style.left);
   var y1 = parseInt(object1.style.top);

   var left = parseInt(object2.style.left);
   var top = parseInt(object2.style.top);
   var width = parseInt(object2.style.width);
   var height = parseInt(object2.style.height);

   var bottom = top + height;
   var right = left + width;

   if ((x1 > left && x1 < right) && (y1 > top && y1 < bottom)) within = true;

   return within;
}

function nasumicniNiz(size) {
   var ra = new Array(size);
   for (var i = 0; i < ra.length; i++) ra[i] = i;
   ra.sort(nasumicniRedosled);
   return ra;
}

function nasumicniRedosled(){
   return 0.5 - Math.random();
}

function  addEvent(object,  evName,  fnName,  cap)  {
   if  (object.attachEvent)
   object.attachEvent("on"  +  evName,  fnName);
   else  if  (object.addEventListener)
   object.addEventListener(evName,  fnName,  cap);
}

function  removeEvent(object,  evName,  fnName,  cap)  {
   if  (object.detachEvent)
   object.detachEvent("on"  +  evName,  fnName);
   else  if  (object.removeEventListener)
   object.removeEventListener(evName,  fnName,  cap);
}