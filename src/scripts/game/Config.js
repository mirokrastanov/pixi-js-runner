import { Game } from "./Game.js";
import { Tools } from "../system/Tools.js";

const assetsContext = require.context('./../../sprites/', true, /\.(mp3|png|jpe?g)$/);
const assets = Tools.massiveRequire(assetsContext);

export const Config = {
    loader: assets,
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
        moveSpeed: -6.5,
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
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
    },
};