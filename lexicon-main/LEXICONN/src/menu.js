$(".btn").click(function(){
  TweenMax.staggerTo(".btn", 0.5, {opacity:0, y:-100, ease:Back.easeIn}, 0.1);
});

function mute(){
  if(background_audio.muted == false){
    background_audio.muted = true;
  } else {
    background_audio.muted = false;
  }

  function clicks(){
    if(click_sound.muted==false){
      click_sound.muted=true;
    }else{
      click_sound.muted=false;
    }

  }
}
