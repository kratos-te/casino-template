import * as PIXI from "pixi.js";
import { EE } from "../../../App";
import { ButtonsLeft, ButtonsRight } from "./Buttons";
export class HubDown extends PIXI.Sprite {
    cont: PIXI.Sprite = new PIXI.Sprite();
    coin: PIXI.Sprite = new PIXI.Sprite();
    table: PIXI.Sprite = new PIXI.Sprite();
    logo: PIXI.Sprite = new PIXI.Sprite();
    wheel: PIXI.Sprite = new PIXI.Sprite();
    back_l: PIXI.Sprite = new PIXI.Sprite();
    back_r: PIXI.Sprite = new PIXI.Sprite();
    dback: PIXI.Sprite = new PIXI.Sprite();
    buttonsLeft: PIXI.Sprite = new PIXI.Sprite();
    buttonsRight: PIXI.Sprite = new PIXI.Sprite();

    constructor() {
        super();
        //
        this.cont = this.addChild(new PIXI.Sprite());

        this.back_l = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/lower_base.png"))
        );
        this.dback = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/down_c1.png"))
        );
        this.logo = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/lady_luck.png"))
        );
        this.buttonsLeft = this.cont.addChild(new ButtonsLeft());
        this.buttonsRight = this.cont.addChild(new ButtonsRight());

        this.onResize = this.onResize.bind(this);
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data: any) {
        this.table.y = data.h / data.scale - 187;
        this.coin.y = data.h / data.scale - 187;
        this.wheel.y = data.h / data.scale - 155;

        this.logo.x = data.w / data.scale / 2 - 325;
        this.logo.y = data.h / data.scale - 270;
        this.logo.scale.set(0.95);

        this.dback.x = data.w / data.scale / 2 - 370;
        this.dback.y = data.h / data.scale - 180;

        this.back_l.x = -50;
        this.back_l.y = data.h / data.scale - 150;
        this.back_l.width = data.w / data.scale + 100;

        this.back_r.x = data.w / data.scale / 2 + 294;
        this.back_r.y = data.h / data.scale - 124;
        this.back_r.width = this.back_l.width + 35;

        this.buttonsLeft.x = data.w / data.scale / 2 - 930;
        this.buttonsLeft.y = this.back_r.y - 65;

        this.buttonsRight.x = data.w / data.scale / 2 + 330;
        this.buttonsRight.y = this.back_r.y - 73;
        //
        let ds = data.scale;
        if (ds < 1) ds = 1;
    }
}
