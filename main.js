const slider=new Slider(".slider");
slider.init();
setInterval(()=>{
    slider.prev();
},2000);