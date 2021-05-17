
/*
 * JavaScript
 */
const canvas= document.getElementById('canvasGame');
const ctx= canvas.getContext('2d');
const gameMaxX= 500,
      gameMaxY= 500,
      snakeElementarySize= 20,
      radiusDefaultSize= 20,
      leftDir=0,
      rightDir=1,
      upDir=2,
      downDir=3,
      posX=0,
      posY=1,
      posDir=2;
let snakeStructure= [],
    snakeSleepingId;

function drawCircle( centerX, centerY, radiusSize, colorCircle="blue")
{
    let startAngle= 0,
        endAngle= 2 * Math.PI;
    ctx.beginPath();
    ctx.fillStyle= colorCircle;
    ctx.arc( centerX, centerY, radiusSize, startAngle, endAngle);
    //ctx.stroke(); 
    ctx.fill(); 
}
function drawLine( startX, startY, endX, endY, colorLine="red")
{
    ctx.fillStyle= colorLine;
    ctx.moveTo( startX, startY);
    ctx.lineTo( endX, endY);
    ctx.stroke(); 
}
function drawDot( xDot, yDot, colorDot="green")
{
    ctx.fillStyle= colorDot;
    ctx.fillRect( xDot, yDot, snakeElementarySize, snakeElementarySize);
}
function clearDot( xDot, yDot)
{
    ctx.clearRect( xDot, yDot, snakeElementarySize, snakeElementarySize);
}
function drawTriangle( xDot, yDot, direction=leftDir, colorDot="yellow")
{
    let offset,
    defaultOffset= 15;
    switch (direction)
    { 
        case leftDir: offset=defaultOffset; break;
        case rightDir: offset=-defaultOffset; break;
        case upDir: offset=defaultOffset; break;
        case downDir: offset=defaultOffset; break;
        default:  offset=defaultOffset; break;
    }
    ctx.fillStyle= colorDot;
    ctx.beginPath();
    ctx.moveTo(xDot, yDot);
    ctx.lineTo(xDot+offset, yDot+offset);
    ctx.lineTo(xDot+offset, yDot-offset);
    ctx.fill();
}
function moveSnake()
{
    let bodyPart= snakeStructure[0];
    if ((bodyPart[posX] > gameMaxX) || (bodyPart[posY] > gameMaxX))
        {
        clearInterval(snakeSleepingId);
        return;
        }
}
function cleanSnake()
{
    console.log("cleanSnake " + snakeStructure.length);
    let idx;
    for (idx=0; idx < snakeStructure.length; idx++)
    {
        let bodyPart= snakeStructure[idx];
        clearDot( bodyPart[posX], bodyPart[posY]);
    }
}
function drawSnake()
{
    console.log("drawSnake "+ snakeStructure.length);
    // remove the snack first
    cleanSnake();
    // And then redraw it
    for (idx=0; idx < snakeStructure.length; idx++)
    {
        let bodyPart= snakeStructure[idx];
        drawDot( bodyPart[posX], bodyPart[posY]);
    }
    increaseSnake()
}
function increaseSnake()
{
    let bodyPart=[];
    if (snakeStructure.length <= 0)
    {
        // first part of the body
        bodyPart[posX]= Math.floor(gameMaxX/2);
        bodyPart[posY]=Math.floor(gameMaxY/2);
        bodyPart[posDir]=rightDir;
        console.log("increaseSnake first "+  bodyPart[posDir]);
    }
    else
    {
        let lastBodyPart= snakeStructure[snakeStructure.length-1];
        bodyPart[posDir]= lastBodyPart[posDir];
        console.log("increaseSnake "+  bodyPart[posDir]);
        switch (lastBodyPart[posDir])
        { 
            case leftDir: bodyPart[posX]= lastBodyPart[posX];
                          bodyPart[posY]= lastBodyPart[posY]+snakeElementarySize; 
                          if (bodyPart[posY] > gameMaxY)
                          {
                            bodyPart[posY]= lastBodyPart[posY]; 
                          }
                          break;
            case rightDir: bodyPart[posX]= lastBodyPart[posX];
                           bodyPart[posY]= lastBodyPart[posY]-snakeElementarySize; 
                           if (bodyPart[posY] < 0)
                           {
                             bodyPart[posY]= 0; 
                           }
                            break;
            case upDir: bodyPart[posX]= lastBodyPart[posX]-snakeElementarySize;
                        bodyPart[posY]= lastBodyPart[posY]; 
                        if (bodyPart[posX] < 0)
                        {
                          bodyPart[posX]= 0; 
                        }
                      break;
            case downDir: bodyPart[posX]= lastBodyPart[posX]+snakeElementarySize;
                          bodyPart[posY]= lastBodyPart[posY]; 
                          if (bodyPart[posX] > gameMaxX)
                          {
                            bodyPart[posX]= lastBodyPart[posX]; 
                          }
                        break;
            default:  bodyPart[posX]= lastBodyPart[posX];
                      bodyPart[posY]= lastBodyPart[posY]; 
                      break;
        }
    }
    snakeStructure.push(bodyPart);
}
function sleepMs (milliseconds) 
{
    console.log(`sleepMs( ${milliseconds}) `);
    new Promise( done => setTimeout(() => done(), milliseconds));
}  
function keyDetected( event)
{
    console.log("keyDetected: "+ event.keyCode)
}
function runGame()
{
    increaseSnake();
    snakeSleepingId = window.setInterval( drawSnake, 1000);
    /*
    drawDot( 150, 100, "orange");
    sleepMs(1000);
    drawDot( 250, 200, "black");
     sleepMs(1001);
    drawTriangle( 250, 100, leftDir, "pink");
     sleepMs(1002);
    drawTriangle( 350, 150, rightDir, "red");
     sleepMs(1003);
    drawCircle( 50, 50, 40, "blue");
    */
}
