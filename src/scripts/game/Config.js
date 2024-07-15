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
            y: 580
        },
        jumpSpeed: 15,
        maxJumps: 2,
    },
    platforms: {
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
        moveSpeed: -1.5,
    },
};