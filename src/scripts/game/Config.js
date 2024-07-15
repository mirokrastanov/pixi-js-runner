import { Game } from "./Game.js";
import { Tools } from "../system/Tools.js";

export const Config = {
    bgSpeed: 2,
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": Game
    },
};