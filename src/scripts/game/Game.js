import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Background } from "./Background";

export class Game extends Scene {
    create() {
        this.createBackground();
    }
    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }
    update(dt) {
        this.bg.update(dt);
    }
}
