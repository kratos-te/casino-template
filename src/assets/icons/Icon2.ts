import * as PIXI from "pixi.js";
import { GameItemType } from "../../common/types";
import { MAX_COUNT_COLUMN, WIDTH_COLUMN } from "../../common/Config";

export class Icon2 extends PIXI.Sprite {
    cont: PIXI.Sprite;
    _page: number = 0;
    _data: any = {};
    _column: number = 0;

    /**
     * Big game icon
     * @param data	game data object
     */
    constructor(data: GameItemType) {
        super();
        //
        this.cont = this.addChild(new PIXI.Sprite());
        const img = this.cont.addChild(PIXI.Sprite.from("pic.png"));
        img.x = -40;
        img.y = -40;
        img.width = 300;
        img.height = 600;
        // img.x = -200;
        // img.y = -50;
        //
        /*const frame = this.cont.addChild(PIXI.Sprite.from("images/frenzy/icon1.png"));
		frame.x = 0;
		frame.y = 0;*/
        const json0 =
            PIXI.Loader.shared.resources["images/frenzy/anim/icon.json"]
                .spritesheet;
        const array0: any = [];
        if (json0) {
            Object.keys(json0.textures)
                .sort()
                .forEach((key) => {
                    array0.push(json0.textures[key]);
                });
        }

        const animate = new PIXI.AnimatedSprite(array0);
        animate.animationSpeed = 0.2;
        animate.loop = true;
        animate.x = -75;
        animate.y = -57;
        this.cont.addChild(animate);
        animate.gotoAndPlay(1);

        //
        let stX = 0;
        const mc = this;
        function tapDown(e: any) {
            stX = mc.position.x - e.data.originalEvent.pageX;
        }
        function tapUp(e: any) {
            const endX = mc.position.x - e.data.originalEvent.pageX;
            if (endX > stX - 10 && endX < stX + 10) {
                console.log(data.id);
            }
        }
        this.cont.on("touchstart", tapDown);
        this.cont.on("pointerdown", tapDown);
        this.cont.on("pointerup", tapUp);
        this.cont.on("touchend", tapUp);
        //
        this.cont.interactive = true;
        this.cont.buttonMode = true;
    }

    set column(val: number) {
        this._column = val;
        this.page = Math.ceil(val / MAX_COUNT_COLUMN);
        let real_col = val % MAX_COUNT_COLUMN;
        if (real_col === 0) real_col = MAX_COUNT_COLUMN;
        this.x = (real_col - 1) * WIDTH_COLUMN + 30;
    }

    get column() {
        return this._column;
    }

    set page(val: number) {
        this._page = val;
    }

    get page() {
        return this._page;
    }
}
