var keysDown = {};
addEventListener("keydown", function(e) { keysDown[e.keyCode] = true; });
addEventListener("keyup", function(e) { delete keysDown[e.keyCode]; });

function keysUpdate() {
    if (37 in keysDown)
        if (GAME.hero.positionX > 225)
            GAME.hero.positionX -= HERO_SPEED;
    if (39 in keysDown)
        if (GAME.hero.positionX < 500)
            GAME.hero.positionX += HERO_SPEED;
    if (38 in keysDown)
        if (GAME.hero.positionY > 5)
            GAME.hero.positionY -= HERO_SPEED;
    if (40 in keysDown)
        if (GAME.hero.positionY < 520)
            GAME.hero.positionY += HERO_SPEED;
    if (13 in keysDown)
        location.reload();
}