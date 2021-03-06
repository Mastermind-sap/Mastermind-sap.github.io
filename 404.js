window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    document.addEventListener("touchstart",touchStarted);
    document.addEventListener("touchend",touchEnded);
    setInterval(game,1000/15);
}
score=0
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
 
    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            tail = 5;
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(ax==px && ay==py) {
        score+=1
        document.getElementById("score").innerHTML="Score: "+score
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }
}
function touchStarted() {
  touchDist = createVector(mouseX, mouseY);
}
function touchEnded() {
  touchDist.sub(createVector(mouseX, mouseY));
  
  let dir;
  if (abs(touchDist.x) > abs(touchDist.y)) { // hor
    dir = touchDist.x < 0 ? 'right' : 'left';
  }
  else { // vert
    dir = touchDist.y < 0 ? 'down' : 'up';
  }
  switch (dir) {
      case "left":
         xv=-1;yv=0;
        break;
      case "right":
        xv=1;yv=0;
        break;
      case "up":
        xv=0;yv=1;
        break;
      case "down":
       xv=0;yv=-1;
        break;}
}