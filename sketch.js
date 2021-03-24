var backImage,backgr;
var player, player_running, stopImg;
var ground,ground_img;
var banana, foodGroup;
var bananaImg;
var obstacle, obstacleGroup, obstacleImg;
var score;
var timeEaten;
var gameOver, gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  stopImg = loadImage("Monkey_01.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  score = 0;

  foodGroup = new Group();

  obstacleGroup = new Group();

  timeEaten = 1;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y>300 || keyDown("up") && player.y>300) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;

    spawnFood();

    spawnObstacles();
  }

  if(gameState == END){
    gameOver = createSprite(350, 200, 10, 10);
    gameOver.addImage(gameOverImg);
    textSize(100);
    fill(255);
    text("Game Over", 100, 200);
    obstacleGroup.setVelocityEach(0,0);
    foodGroup.setVelocityEach(0,0);
    player.destroy();
    backgr.velocityX = 0;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
  }

  drawSprites();
  player.collide(ground);
  textSize(20);
  fill(255);
  text("Score: " + score, 20, 40);
}

function spawnFood(){
  if(frameCount%150==0){
    banana = createSprite(800,random(225, 250), 40, 40);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score += 2;
    if(timeEaten > 0){
    player.scale += 0.05;
    }
    timeEaten = timeEaten-1;
  }
}
function spawnObstacles(){
  if(frameCount%100==0){
    obstacle = createSprite(800, 325, 100, 100);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacle.setCollider("rectangle", 0, 0, 300, 300);
    obstacleGroup.add(obstacle);
  }
  if(obstacleGroup.isTouching(player)){
    gameState = 0;
  }
}