var context, GAME, OBJECTS, dropdown;
var score = 0;
var temporaryScore = 0;

function collision(obj1, obj2) {
    var collision = false;
    for(var i = 0; i < obj2.length; i++){
        if ((obj1.positionX < (obj2[i].positionX + obj2[i].width)) &&
            ((obj1.positionX + obj1.width) > obj2[i].positionX) &&
            (obj1.positionY < (obj2[i].positionY + obj2[i].height)) &&
            ((obj1.positionY + obj1.height) > obj2[i].positionY)){
            collision = true;
        }
    }
    return collision;
}

function drawEnemies() {
    for (var i = 0; i < GAME.enemies.length; i++)
        GAME.enemies[i].drawObject2D(ENEMY_WIDTH, ENEMY_HEIGHT);
}

function moveEnemies() {
    dropdown = true;
    if (dropdown)
        dropDown();
}

function dropDown() {
    for(var i = 0; i < GAME.enemies.length; i++){
        GAME.enemies[i].positionY += ENEMY_SPEED;
    }
}

function countPoints(){
    temporaryScore += 5;
    if(temporaryScore % 200 === 0){
        temporaryScore += 5;
        score++;
    }
}

function levelUp(){
    if(score % 5 === 0){
        BACKGROUND_SPEED+=2;
        HERO_SPEED++;
        ENEMY_SPEED++;
        score++;
    }
}

function moveBackground(){
    dropDownBackground();
}

function dropDownBackground() {
    GAME.background.positionY += BACKGROUND_SPEED;

    if(GAME.background.positionY >= 0){
        GAME.background.positionY = -600;
    }
}

function drawScore() {
    context.fillStyle = "rgb(255, 255, 255)";
    context.font = SCORE_AND_LIFE_FONT_SIZE.toString() + "px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Score: " + score, 0, 0);
}

function drawText(text) {
    context.fillStyle = "rgb(255, 0, 0)";
    context.font = GAME_OVER_FONT_SIZE.toString() + "px Helvetica";
    var positionX = (BACKGROUND_WIDTH - context.measureText(text).width) / 2;
    var positionY = (BACKGROUND_HEIGHT - GAME_OVER_FONT_SIZE) / 2;
    context.fillText(text, positionX, positionY);
}

function render() {
    GAME.background.drawBackground();

    GAME.hero.drawObject2D(HERO_WIDTH, HERO_HEIGHT);
    drawEnemies();
    moveEnemies();
    moveBackground();
    countPoints();
    drawScore();
    levelUp();
}

function gameMainLoop() {
    keysUpdate();
    render();
    if(!collision(GAME.hero, GAME.enemies))
        requestAnimationFrame(gameMainLoop);
    else
        drawText("GAME OVER");
}

function initContext() {
    var canvas = document.createElement('canvas');
    canvas.width = BACKGROUND_WIDTH;
    canvas.height = BACKGROUND_HEIGHT;
    document.body.appendChild(canvas);
    context = canvas.getContext('2d');
}

function main() {
    initContext();
    GAME = new Game();
    gameMainLoop();
}
