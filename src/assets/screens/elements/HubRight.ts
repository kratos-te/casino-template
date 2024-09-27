import * as PIXI from "pixi.js";
import { ButtonItem } from "../../gui/ButtonItem";
import { EE } from "../../../App";
//import {EE} from "../../../App";

export class Settings extends PIXI.Sprite {
    settings: PIXI.Sprite;

    constructor() {
        super();

        this.settings = this.addChild(new PIXI.Sprite());

        const rewardButton = this.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/rewards_btn.png"))
        );

        rewardButton.interactive = true;
        rewardButton.buttonMode = true;

        rewardButton.x = -190;
        rewardButton.y = 13;
        rewardButton.on("pointerdown", () => {
            // EE.emit("SHOW_REWARDS");
            EE.emit("SHOW_REWARDS");
        });

        const volumeButton = this.settings.addChild(
            new ButtonItem("images/frenzy/volume_icon.png", () => {
                volumeOffButton.visible = true;
                volumeButton.visible = false;
            })
        );

        const volumeOffButton = this.settings.addChild(
            new ButtonItem("images/frenzy/volume_off_icon.png", () => {
                volumeButton.visible = true;
                volumeOffButton.visible = false;
            })
        );

        volumeButton.x = 170;
        volumeOffButton.x = 170;

        const logoutButton = this.settings.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/logout_icon.png"))
        );

        logoutButton.x = 340;

        //
        // this.cont = this.addChild(new PIXI.Sprite());
        // this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/settings2.png")));
        // const buttonSnd = this.cont.addChild(new ButtonItem("images/frenzy/right_menu2.png", ()=>{
        // 	buttonSnd.visible = false;
        // 	buttonSndOff.visible = true;
        // }));
        // buttonSnd.x = 150;
        // buttonSnd.y = 23;
        // buttonSnd.scale.set(0.8);
        // const buttonSndOff = this.cont.addChild(new ButtonItem("images/frenzy/right_menu3.png", ()=>{
        // 	buttonSnd.visible = true;
        // 	buttonSndOff.visible = false;
        // }));
        // buttonSndOff.visible = false;
        // buttonSndOff.x = 150;
        // buttonSndOff.y = 23;
        // buttonSndOff.scale.set(0.8);

        // /*const buttonLetter = this.cont.addChild(new ButtonItem("images/frenzy/right_menu1.png", ()=>{
        // 	EE.emit('SHOW_MAIL');
        // }));
        // buttonLetter.x = 250;
        // buttonLetter.y = 23;
        // buttonLetter.scale.set(0.8);*/

        // const buttonExit = this.cont.addChild(new ButtonItem("images/frenzy/right_menu4.png", ()=>{
        // 	console.log('exit');
        // }));
        // buttonExit.x = 54;
        // buttonExit.y = 23;
        // buttonExit.scale.set(0.8);
    }
}
