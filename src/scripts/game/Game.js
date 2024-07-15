import * as Matter from 'matter-js';
import { App } from "../system/App.js";
import { Scene } from "../system/Scene.js";
import { Background } from "./Background.js";
import { Hero } from "./Hero.js";
import { Platforms } from "./Platforms.js";
import { LabelScore } from './LabelScore.js';

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createHero();
        this.createPlatforms();
        this.setEvents();
        this.createUI();
    }

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }

    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);
        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }

    createPlatforms() {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
        this.hero.sprite.once("die", () => {
            document.querySelector('#overlay').style.display = "block";
            document.querySelector('#play-again').style.display = "block";
            document.querySelector('#final-score').style.display = "block";
            document.querySelector('#final-score').textContent = `Score: ${this.hero.score}`;

            document.querySelector('#play-again').addEventListener('click', this.playAgain);
        });
    }

    playAgain(e) {
        console.log(e);
        document.querySelector('#overlay').style.display = "none";
        document.querySelector('#play-again').style.display = "none";
        document.querySelector('#final-score').style.display = "none";
        App.scenes.start("Game");
    }

    destroy() {
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
        App.app.ticker.remove(this.update, this);
        this.bg.destroy();
        this.hero.destroy();
        this.platforms.destroy();
        this.labelScore.destroy();
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    update(dt) {
        this.bg.update(dt);
        this.platforms.update(dt);
    }
}
