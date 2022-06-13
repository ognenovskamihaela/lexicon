let userdata = "";
let level = localStorage.getItem('level') ? localStorage.getItem('level'):0;
let completedcount = 0; 
let wordbox = [];


(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  
  var loader = document.querySelector('[data-js="loader--alpha"]'),
      start = null,
      time = 5000,
      max_value = 100
  ;
  
  /**
   * 
   * Creates a requeastAnimationFrame function to increase
   * the value of a data-attribute to 100%;
   *
   */
  function step(timestamp) {
    // Save the progress
    var progress;
    
    // Get the start time
    if (start === null) {
      start = timestamp;
    }
    
    // Calculate the progress
    progress = timestamp - start;
    
    // If not progressed
    if (progress < time) {
      loader.dataset.value = (progress / time * max_value).toPrecision(2);
      requestAnimationFrame(step);
      
    // Finished
    } else {
      loader.dataset.value = 100;
      start = null;
      requestAnimationFrame(step);
    }
  }
  
  // Start animation
  requestAnimationFrame(step);

let gamedata = [
    {
"level":1,
"controllerword": ["E" , "A" , "P" , "T"],
"winnerword":["EAT","PETA","TAP"],

},
{
    "level":2,
    "controllerword": ["E" , "A" , "N" , "D"],
    "winnerword":["AND","DEAN","END"],
    
    },
    {
        "level":3,
        "controllerword": ["Y" , "T" , "N" , "E"],
        "winnerword":["TEN","YET","NET"],
        
        },
        {
            "level":4,
            "controllerword": ["S" , "R" , "A" , "T"],
            "winnerword":["RAT","STAR","SAT"],
            
            },
            {
                "level":5,
                "controllerword": ["P" , "S" , "I" , "L"],
                "winnerword":["LIPS","SLIP","SIP"],
                
                }

];


function makeController(){
    document.getElementById('controller').innerHTML = "";
    gamedata[level].controllerword.forEach((data,i)=>{
        console.log(i,data);
        document.getElementById('controller').innerHTML += `<span onclick="getuserdata(${i});" id="span${i}"> ${data}</span>`;
    });
    
}

makeController();
makeboard();
function makeboard(){
   
    let arr = [];
    gamedata[level].winnerword.forEach((data,i)=>{
      
            for(j=1;j<=data.length;j++){
                document.getElementById(`${i+1}${j}`).style.display = "block";
           
                let letter = data.split('')[j-1];
                arr.push(i+1+''+j,{letter});
            }
            
            wordbox.push(arr,{data});
            arr = [];
       
    })  
}
console.log(wordbox);

function getuserdata(index){
  userdata += gamedata[level].controllerword[index];

    gamedata[level].winnerword.forEach(data=>{
        if(userdata == data){
              wordbox.forEach((data,i)=>{
                  if(userdata == data.data ){
                      completedcount += 1;
                      console.log(completedcount);
                      checklevel(completedcount);
                    wordbox[i-1].forEach((e,index)=>{
                        if(index == 0  || index%2 == 0){
                            document.getElementById(`${e}`).innerHTML = wordbox[i-1][index+1].letter;
                            document.getElementById(`${e}`).style.color="gold";
                            document.getElementById(`${e}`).style.backgroundColor="#1C1B21";
  document.getElementById(`${e}`).style.transition = "0.5s all ease-in-out";
                        }
                   
                    });
                    userdata = "";
                  }
              })
           
        }
        else{
      
         if(userdata.split('').length >4){
            userdata = "";
         }
        }
        document.getElementById('msg').innerHTML = "YOU THINK :: ";
        document.getElementById('msg').innerHTML += userdata;
    })
 console.log(userdata);


}


function checklevel(count){
   
    if(count >= 3){

        level = Number(level) + Number(1);
     
        completedcount = 0;
        if(level >=5){
            document.getElementById('wordplace').innerHTML = "CONGRATUTAIONS WINNER !!";
        document.getElementById('wordplace').style.textAlign="center";
        document.getElementById('wordplace').style.marginTop="40px";
        document.getElementById('wordplace').style.fontSize="40px";
        document.getElementById('wordplace').style.color = "gold";
        document.getElementById('wordplace').style.backgroundColor="#1C1B21";
        localStorage.removeItem("level");
        return;
        }
        localStorage.setItem("level",level);
        location.reload();
      
    }
   
}

document.getElementById("level").innerHTML = level;

