import { Game } from "./Game.js";
import { Tools } from "../system/Tools.js";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": Game
    },
    bgSpeed: 2,
    hero: {
        position: {
            x: 350,
            y: 550
        },
        jumpSpeed: 12,
        maxJumps: 2,
    },
    platforms: {
        moveSpeed: -5.5,
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        },
    },
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    },
};