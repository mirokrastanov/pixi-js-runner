import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';
import { App } from '../system/App.js';

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
}