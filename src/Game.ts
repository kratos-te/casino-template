import initRenderer from "./initRenderer";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import PixiPlugin from "gsap/src/PixiPlugin";
import { Hub } from "./assets/screens/Hub";
import { HubIcons3 } from "./assets/screens/HubIcons3";
import { EE } from "./App";
//import {HubRight} from "./assets/screens/elements/HubRight";
import { BonusWheel } from "./assets/bonus/BonusWheel";

/**
 * main stage
 */
export let stage: PIXI.Container;
//head application container
export let hintcontainer: PIXI.Container = new PIXI.Container();
//head application container
let maincontainer: PIXI.Container = new PIXI.Container();
//container for some top windows (bonus)
let topcontainer: PIXI.Container = new PIXI.Container();
/**
 * main renderer
 */
export let RENDERER: PIXI.Renderer;
/**
 * selected section of games
 */
export let SELECTED_PART: number = 1;

/**
 * event name to update the state of large filter buttons for games
 */
export let UPDATE_BIG_BUTTONS: string = "UPDATE_BIG_BUTTONS";
/**
 * click on the games section button
 * @param idd	1-fish, 2-clot, 3-firelink
 */
export function updateSelectButton(idd: number) {
    SELECTED_PART = idd;
    EE.emit(UPDATE_BIG_BUTTONS);
}

/**
 * entry point function
 */
export async function setup() {
    //load config hson
    //create renderer
    RENDERER = initRenderer();
    //create stage
    stage = new PIXI.Container();
    stage.addChild(maincontainer);
    stage.addChild(topcontainer);
    stage.addChild(hintcontainer);
    //add pixi support
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    //get money and add game
    createHub();
    //TODO: test. If not needed remove it
    EE.emit("SHOW_REGINFO"); //reginfo popup
    EE.addListener("SHOW_WHEEL", showBonusWheel);
    //
    let ticker = PIXI.Ticker.shared;
    ticker.autoStart = false;
    ticker.stop();
    function animate(time: any) {
        ticker.update(time);
        RENDERER.render(stage);
        requestAnimationFrame(animate);
        //EE.emit('UPDATE');
    }
    animate(performance.now());
    //
}

function createHub() {
    maincontainer.addChild(new Hub());
    const games = maincontainer.addChild(new HubIcons3());
    games.x = 0;
    games.y = 220;
    //maincontainer.addChild(new HubRight());
}

function showBonusWheel() {
    maincontainer.visible = false;
    topcontainer.removeChildren();
    topcontainer.addChild(new BonusWheel(hideBonus));
}

function hideBonus() {
    maincontainer.visible = true;
    topcontainer.removeChildren();
}
