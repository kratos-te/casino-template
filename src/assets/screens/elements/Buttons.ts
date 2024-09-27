import * as PIXI from "pixi.js";
import { EE } from "../../../App";
import { updateSelectButton } from "../../../Game";

/**
 * module builds game list filter buttons
 */

// 1-fav 2-all, 3-fish
export class ButtonsLeft extends PIXI.Sprite {
    fishBase: PIXI.Sprite = new PIXI.Sprite();
    fish: PIXI.Sprite = new PIXI.Sprite();

    slotBase: PIXI.Sprite = new PIXI.Sprite();
    slot: PIXI.Sprite = new PIXI.Sprite();
    allBase: PIXI.Sprite = new PIXI.Sprite();
    all: PIXI.Sprite = new PIXI.Sprite();

    // cont: PIXI.Sprite; //container for filter buttons
    cont: PIXI.Sprite = new PIXI.Sprite();
    constructor() {
        super();
        this.updateState = this.updateState.bind(this);
        //
        this.cont = this.addChild(new PIXI.Sprite());

        this.allBase = this.cont.addChild(
            new PIXI.Sprite(
                PIXI.Texture.from("images/frenzy/footer/all_base.png")
            )
        );
        this.all = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/footer/all.png"))
        );
        this.allBase.x = 0;
        this.allBase.y = 50;
        this.all.x = 25;
        this.all.y = -40;
        this.allBase.scale.set(0.8);
        this.all.scale.set(0.8);

        this.fishBase = this.cont.addChild(
            new PIXI.Sprite(
                PIXI.Texture.from("images/frenzy/footer/fish_base.png")
            )
        );
        this.fish = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/footer/fish.png"))
        );
        this.fishBase.x = 200;
        this.fishBase.y = 50;
        this.fish.x = 220;
        this.fish.y = -40;
        this.fishBase.scale.set(0.8);
        this.fish.scale.set(0.8);

        this.slotBase = this.cont.addChild(
            new PIXI.Sprite(
                PIXI.Texture.from("images/frenzy/footer/slot_base.png")
            )
        );
        this.slot = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/footer/slot.png"))
        );
        // this.big1 = this.cont.addChild(new GameButton(1));
        this.slotBase.x = 400;
        this.slotBase.y = 50;
        this.slot.x = 430;
        this.slot.y = -40;
        this.slotBase.scale.set(0.8);
        this.slot.scale.set(0.8);

        this.fishBase.interactive = true;
        this.fishBase.buttonMode = true;
        this.fishBase.on("pointerdown", () => {
            updateSelectButton(3);
        });

        this.fish.interactive = true;
        this.fish.buttonMode = true;
        this.fish.on("pointerdown", () => {
            updateSelectButton(3);
        });

        this.allBase.interactive = true;
        this.allBase.buttonMode = true;
        this.allBase.on("pointerdown", () => {
            updateSelectButton(2);
        });

        this.all.interactive = true;
        this.all.buttonMode = true;
        this.all.on("pointerdown", () => {
            updateSelectButton(2);
        });

        this.slotBase.interactive = true;
        this.slotBase.buttonMode = true;
        this.slotBase.on("pointerdown", () => {
            alert("click slot!");
        });

        this.slot.interactive = true;
        this.slot.buttonMode = true;
        this.slot.on("pointerdown", () => {
            alert("click slot!");
        });

        let direction = "top";
        const animateLeft = () => {
            if (this.fish.y >= -15) {
                direction = "top";
            } else if (this.fish.y <= -40) {
                direction = "down";
            }

            this.fish.y = this.fish.y + (direction === "top" ? -0.3 : 0.3);
            this.all.y = this.fish.y + (direction === "top" ? -0.3 : 0.3);
            this.slot.y = this.fish.y + (direction === "top" ? -0.3 : 0.3);

            requestAnimationFrame(animateLeft);
        };

        requestAnimationFrame(animateLeft);
    }
    updateState() {}
}

export class ButtonsRight extends PIXI.Sprite {
    tableBase: PIXI.Sprite = new PIXI.Sprite();
    table: PIXI.Sprite = new PIXI.Sprite();
    favBase: PIXI.Sprite = new PIXI.Sprite();
    fav: PIXI.Sprite = new PIXI.Sprite();
    wheelBase: PIXI.Sprite = new PIXI.Sprite();
    wheel: PIXI.Sprite = new PIXI.Sprite();

    // cont: PIXI.Sprite; //container for filter buttons
    cont: PIXI.Sprite = new PIXI.Sprite();
    constructor() {
        super();
        this.updateState = this.updateState.bind(this);
        //
        this.cont = this.addChild(new PIXI.Sprite());

        this.tableBase = this.cont.addChild(
            new PIXI.Sprite(
                PIXI.Texture.from("images/frenzy/footer/table_base.png")
            )
        );
        this.table = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/footer/table.png"))
        );
        this.tableBase.x = 0;
        this.tableBase.y = 60;
        this.table.x = 25;
        this.table.y = -40;
        this.tableBase.scale.set(0.8);
        this.table.scale.set(0.8);

        this.favBase = this.cont.addChild(
            new PIXI.Sprite(
                PIXI.Texture.from("images/frenzy/footer/fav_base.png")
            )
        );
        this.fav = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/footer/fav.png"))
        );
        this.favBase.x = 200;
        this.favBase.y = 60;
        this.fav.x = 225;
        this.fav.y = -40;
        this.favBase.scale.set(0.8);
        this.fav.scale.set(0.8);

        this.wheelBase = this.cont.addChild(
            new PIXI.Sprite(
                PIXI.Texture.from("images/frenzy/footer/wheel_base.png")
            )
        );
        this.wheel = this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/footer/wheel.png"))
        );
        // this.big1 = this.cont.addChild(new GameButton(1));
        this.wheelBase.x = 400;
        this.wheelBase.y = 60;
        this.wheel.x = 455;
        this.wheel.y = -40;
        this.wheelBase.scale.set(0.8);
        this.wheel.scale.set(0.8);

        this.wheelBase.interactive = true;
        this.wheelBase.buttonMode = true;

        this.favBase.interactive = true;
        this.favBase.buttonMode = true;
        this.favBase.on("pointerdown", () => {
            updateSelectButton(1);
        });

        this.fav.interactive = true;
        this.fav.buttonMode = true;
        this.fav.on("pointerdown", () => {
            updateSelectButton(1);
        });

        this.tableBase.interactive = true;
        this.tableBase.buttonMode = true;
        this.tableBase.on("pointerdown", () => {
            alert("click table!");
        });

        this.table.interactive = true;
        this.table.buttonMode = true;
        this.table.on("pointerdown", () => {
            alert("click table!");
        });

        this.wheelBase.interactive = true;
        this.wheelBase.buttonMode = true;
        this.wheelBase.on("pointerdown", () => {
            EE.emit("SHOW_DAIYWHEEL");
        });

        this.wheel.interactive = true;
        this.wheel.buttonMode = true;
        this.wheel.on("pointerdown", () => {
            EE.emit("SHOW_DAIYWHEEL");
        });

        let direction = "top";
        const animationRight = () => {
            if (this.fav.y >= -15) {
                direction = "top";
            } else if (this.fav.y <= -40) {
                direction = "down";
            }

            this.fav.y = this.fav.y + (direction === "top" ? -0.3 : 0.3);
            this.table.y = this.fav.y + (direction === "top" ? -0.3 : 0.3);
            this.wheel.y = this.fav.y + (direction === "top" ? -0.3 : 0.3);

            requestAnimationFrame(animationRight);
        };

        requestAnimationFrame(animationRight);
    }
    updateState() {}
}
