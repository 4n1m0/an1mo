// ========================
// 🔮 PENTACLE DÉMONIAQUE INVERSÉ
// ========================
const pentacleStars = [];
const pentacleRadius = 80;
const pentacleCenter = { x: canvas.width/2, y: canvas.height/2 };
let pentacleActive = false;
let pentaclePhase = 0; // 0 = formation, 1 = explosion, 2 = reformation

function createPentacle(){
  pentacleStars.length = 0;
  const rotation = Math.PI / 2; // pointe vers le bas
  for(let i = 0; i < 5; i++){
    const angle = rotation + i * 2 * Math.PI / 5;
    const x = pentacleCenter.x + pentacleRadius * Math.cos(angle);
    const y = pentacleCenter.y + pentacleRadius * Math.sin(angle);
    pentacleStars.push({ x:x, y:y, baseX:x, baseY:y, dx:0, dy:0 });
  }
}

function animatePentacle(){
  if(!pentacleActive) return;
  for(let star of pentacleStars){
    if(pentaclePhase === 0){ // Formation
      star.x += (star.baseX - star.x)/50;
      star.y += (star.baseY - star.y)/50;
    } else if(pentaclePhase === 1){ // Explosion
      star.x += star.dx;
      star.y += star.dy;
    } else if(pentaclePhase === 2){ // Reformation
      star.x += (star.baseX - star.x)/20;
      star.y += (star.baseY - star.y)/20;
    }

    ctx.fillStyle = "#c77dff";
    ctx.shadowColor = "#d0a2ff";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(star.x, star.y, 3, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Relier les étoiles
  ctx.strokeStyle = "rgba(199,125,255,0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for(let i = 0; i < 5; i++){
    const next = (i + 2) % 5;
    ctx.moveTo(pentacleStars[i].x, pentacleStars[i].y);
    ctx.lineTo(pentacleStars[next].x, pentacleStars[next].y);
  }
  ctx.stroke();
}

// Déclenchements du pentacle
function triggerPentacle(){
  pentacleActive = true;
  pentaclePhase = 0;
  createPentacle();

  setTimeout(()=>{
    pentaclePhase = 1;
    for(let star of pentacleStars){
      star.dx = (Math.random()-0.5)*4;
      star.dy = (Math.random()-0.5)*4;
    }
  }, 10000);

  setTimeout(()=>{ pentaclePhase = 2; }, 12000);
  setTimeout(()=>{ pentacleActive = false; }, 16000);
}

// Lancer le pentacle toutes les 20–30s
setInterval(()=>{
  triggerPentacle();
}, Math.random()*10000 + 20000);
