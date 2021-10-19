const igra = new Audio();
igra.src="../zr_Bojan_Cipovic_rt-5516/zvukovi/wall.mp3"

var audio1 = document.getElementById("audioID");
audio1.volume = 0.3;

const sdm=document.getElementById("zvukon");
sdm.addEventListener("click", audiom);

function audiom(){
    var imgsrc=sdm.getAttribute("src");
    var soundimg=imgsrc=="../zr_Bojan_Cipovic_rt-5516/slike/zvukon.png" ? "../zr_Bojan_Cipovic_rt-5516/slike/zvukoff.png":"../zr_Bojan_Cipovic_rt-5516/slike/zvukon.png";
    sdm.setAttribute("src", soundimg);

    igra.muted=igra.muted ? false:true;
    audio1.muted=audio1.muted ? false:true;
}


function close_window(){
    if (confirm("Izadji?")){
        close();
    } 
}
