import { App } from "../system/App.js";
import { Scene } from "../system/Scene.js";
import { Background } from "./Background.js";
import { Platform } from "./Platform.js";

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createPlatform({
            rows: 4,
            cols: 6,
            x: 200
        });
    }

    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    update(dt) {
        this.bg.update(dt);
    }
}
