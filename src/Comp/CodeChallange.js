import React, { useRef, useEffect, useState } from "react"; 
 /*Dividing the components into 3 steps...0 to 256
    //array for r with multiply 8 till 256 = 32 steps
     //array for g with multiply 8 till 256 = 32 steps
       //array for bwith multiply 8 till 256 = 32 steps 
    // looping throught 256 * 128 to get 32 768 values 
     //for fillRect looping through 256*128 to get 32768 for x and y coordinates
    */
function CodeChallange() {
  const myCanvas = useRef(null);
  const canvasImage = useRef();
  const number = 8;
  const [colorCombinations, colorCombinationsAction] = useState([]);   
  useEffect(() => { 
    const canvasContent = myCanvas.current;
    const context = canvasContent.getContext("2d");
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    var redArray = [];
    var greenArray = [];
    var blueArray = []; 
    for (let i = 1; i <= 32; i++) {
       
      redArray.push(i * number);
      greenArray.push(i * number);
      blueArray.push(i * number);
    }
    
   
    const getColors = [];  
    for (var i = 0; i < redArray.length; i++) {
      for (var j = 0; j < greenArray.length; j++) {
        for (var k = 0; k < blueArray.length; k++) {
         // combos.push({ r: redArray[i], g: greenArray[j], b: blueArray[k] });
          getColors.push("rgb(" +redArray[i] + " ," +greenArray[j] +", " + blueArray[k] + ")" );
        }
      }
    } 
    colorCombinationsAction(getColors); 
    let value = 0;
    for (let column = 0; column < 256; column++) {
      for (let row = 0; row < 128; row++) { 
        context.fillStyle = getColors[value];
        context.fillRect(column*6,row*6,6,6);  
        value++;
      } 
    }
    var img = new Image();
    img.src = canvasContent.toDataURL();
    img.width = "128";
    img.height = "256"; 
    canvasImage.current.appendChild(img);
    return () => {};
  }, []);

  return (
    <div  >
      <h2>Image:</h2>
      {/*state*/}
      <div ref={canvasImage}> </div> 
      <h2> Canvas:</h2>
      <canvas ref={myCanvas}></canvas>
    </div>
  );
}

export default CodeChallange;