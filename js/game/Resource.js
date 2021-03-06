function preloading (directory, imageArray) { 
    let n = imageArray.length; 
    for (let i = 0; i < n; i++) { 
        let img = new Image(); 
        img.src = "resource/"+directory+imageArray[i]; 
    } 
} 

preloading("player/", [`player.png`]);
preloading("particle/", ["ember.png", "spark.png", "snow.png", "smoke.png"]);
preloading("monster/", ["crazymushroom.png", "crazymonkey.png", "hellfly.png", "golem.png", "wyvern.png"]);
preloading("matter/", ["fire.png", "energy.png", "electricity.png","arrow.png", "ice.png", "sword.png"]);
