class Object2D {
    constructor(image, positionX, positionY, width, height, visible) {
        this.image = image;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.visible = visible;
    }
    drawObject2D(scaleX, scaleY) {
        context.drawImage(this.image, this.positionX, this.positionY, scaleX, scaleY);
    }
    drawBackground(scaleX, scaleY) {
        context.drawImage(this.image, this.positionX, this.positionY);
    }
}

class Game {
    constructor() {
        this.background = this.initObject2D("images/background/background1-v2.jpg", 0, -600, BACKGROUND_WIDTH, BACKGROUND_HEIGHT,true);
        this.hero = this.initObject2D("images/cars/Mini_truck.png", BACKGROUND_WIDTH/2, BACKGROUND_HEIGHT - HERO_HEIGHT, HERO_WIDTH, HERO_HEIGHT, true);
        this.enemies = this.initEnemies();
    }

    initEnemies(){
        var k = 0;
        var enemies = [];
        var height = 25;
        for (var j = 0; j < 100; j++) {
            enemies[k] = this.initObject2D(
                this.getRandomCar(),
                Math.floor(Math.random() * (470 - 225)) + 250,
                height,
                ENEMY_WIDTH, ENEMY_HEIGHT, true, ENEMY_SPEED);
            k++;
            height -= Math.floor(Math.random() * (300 - 100)) + 100;
        }
        return enemies;
    }

    getRandomCar(){
        var carImages = [
            "images/cars/Ambulance.png",
            "images/cars/taxi.png",
            "images/cars/Mini_van.png",
            "images/cars/Audi.png",
            "images/cars/truck.png",
        ];
        return carImages[Math.floor(Math.random() * 5)]
    }

    initObject2D(fileName, positionX, positionY, width, height, visible) {
        var image = new Image();
        image.src = fileName;
        return new Object2D(image, positionX, positionY, width, height, visible);
    }
}