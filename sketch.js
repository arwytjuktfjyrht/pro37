var player;
var ground, groundImage;
var particleGroup;
var energyGroup, e=300;
var score, gamestate=1;

function setup() {
  createCanvas(600, 200);

  frameRate(30);
  
  player = createSprite(100,180,0.1,0.1);
  
  ground = createSprite(200,180,4000,20);
  ground.x = ground.width /2;
  ground.velocityX = -2;

  particleGroup=new Group();
  energyGroup=new Group();

  
  noStroke()
}

function draw() {
  background(255);

  if(gamestate===1){
  
  if(keyDown("space")) {
    player.velocityY = -10;
  }
  
  player.velocityY = player.velocityY + 0.8
  player.collide(ground)
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  
  fill(0,255,255)
  rect(player.x-10,player.y-20,20,20)

  spawnParticles();

  if(frameCount % e ===0){
  spawnEnergy();
  e=Math.round(e-e/10);
  console.log(e);
  }
  

  if(player.y>ground.y+10){
    player.y=166
  }
  fill(0)
score=frameCount/30
text("Score = "+Math.round(score),30,30)

if(energyGroup.isTouching(player)) {
  particleGroup.destroyEach();
  energyGroup.destroyEach();
  gamestate=2
}
}else{
  fill(0,255,255)
  rect(0,0,2000,2000)
  fill(0)
  text("Game Over!",10,10)
}

  drawSprites();
}

function spawnParticles() {
    var particle = createSprite(600,120,40,10);
    //rotate(random(0,360));
    particle.x=player.x;
    particle.y=player.y-10
    particle.velocityY = random(-8,8)/10;
    particle.velocityX = random(-3,-6);
    particle.width=8
    particle.height=8
    particle.shapeColor="cyan";
    
    particle.lifetime =60;

    particleGroup.add(particle);
}

function spawnEnergy() {
  
    var energy = createSprite(600,165,20,20);
    energy.velocityX=random(-2,-10)
    energy.y=random(10,166);
            
    energy.lifetime = 600;

    energyGroup.add(energy);
  
}