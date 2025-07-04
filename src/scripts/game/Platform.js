import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';
import { App } from '../system/App.js';
import { Diamond } from "./Diamond.js";

export class Platform {
    constructor(rows, cols, x) {
        this.rows = rows;
        this.cols = cols;
        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;
        this.createContainer(x);
        this.createTiles();
        this.dx = App.config.platforms.moveSpeed;
        this.createBody();
        this.diamonds = [];
        this.createDiamonds();
    }

    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                this.createDiamond(this.tileSize * i, -y);
            }
        }
    }

    createDiamond(x, y) {
        const diamond = new Diamond(x, y);
        this.container.addChild(diamond.sprite);
        diamond.createBody();
        this.diamonds.push(diamond);
    }
    // [/10]

    move() {
        if (this.body) {
            Matter.Body.setPosition(this.body, { x: this.body.position.x + this.dx, y: this.body.position.y });
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
        }
    }

    createBody() {
        // create a physical body
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, { friction: 0, isStatic: true });
        // add the created body to the engine
        Matter.World.add(App.physics.world, this.body);
        // save a reference to the platform object itself for further access from the physical body object
        this.body.gamePlatform = this;
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }

    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile";
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }

    destroy() {
        Matter.World.remove(App.physics.world, this.body);
        this.diamonds.forEach(diamond => diamond.destroy());
        this.container.destroy();
    }
}