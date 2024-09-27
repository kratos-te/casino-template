import * as PIXI from "pixi.js";
import { SELECTED_PART, UPDATE_BIG_BUTTONS } from "../../Game";
import { Icon2 } from "../icons/Icon2";
import {
    Games,
    MAX_COUNT_COLUMN,
    PAGE_SIZE_DEFAULT,
    WIDTH_COLUMN,
} from "../../common/Config";
import { gsap } from "gsap";
import { EE } from "../../App";
import { ButtonItem } from "../gui/ButtonItem";
//import { getGames } from "../../server/server";
import _ from "lodash";

//let max_left:number = 0;
//let width_mask:number = 1920;

/**
 * game list module
 */
let startSlideX = 0;
let game_icons: PIXI.Sprite[] = [];
let current_page = 0;
let old_page = 1;
let move = false;

export class HubIcons3 extends PIXI.Sprite {
    cont: PIXI.Sprite;
    headcont: PIXI.Sprite;
    leftArrow: PIXI.Sprite;
    rightArrow: PIXI.Sprite;
    total_pages: number = 0;
    /**
     * game list module
     */
    constructor() {
        super();
        //
        this.updateHub = this.updateHub.bind(this);
        this.onResize = this.onResize.bind(this);
        this.moveIcons = this.moveIcons.bind(this);
        this.placeIcons = this.placeIcons.bind(this);
        this.moveIconsLeft = this.moveIconsLeft.bind(this);
        this.moveIconsRight = this.moveIconsRight.bind(this);
        EE.addListener("RESIZE", this.onResize);
        //
        this.headcont = this.addChild(new PIXI.Sprite());
        //this.headcont.x = 400;
        this.cont = this.headcont.addChild(new PIXI.Sprite());
        this.cont.interactive = true; //need for touch scroll
        this.cont.hitArea = new PIXI.Rectangle(
            0,
            0,
            MAX_COUNT_COLUMN * WIDTH_COLUMN,
            600
        );
        //(this.cont as any).dragging = false; //need for touch scroll
        this.cont
            .on("mousedown", this.onDragStart, this)
            .on("mouseup", this.onDragEnd, this)
            .on("touchstart", this.onTouchStart, this)
            .on("touchend", this.onTouchEnd, this)
            .on("mouseupoutside", this.onDragEnd, this)
            .on("touchendoutside", this.onDragEnd, this);

        this.leftArrow = this.addChild(
            new ButtonItem("images/frenzy/arrow1.png", this.moveIconsLeft)
        );

        this.rightArrow = this.addChild(
            new ButtonItem("images/frenzy/arrow2.png", this.moveIconsRight)
        );

        EE.addListener(UPDATE_BIG_BUTTONS, this.updateHub);
        //
        this.updateHub();
        //
        EE.emit("FORCE_RESIZE");
    }

    /**
     * arrangement of module elements depending on the screen size
     * @param data	object {w, h, scale}
     */
    onResize(data: any) {
        this.cont.x = 0;
        //
        let wdth = data.w / data.scale;
        let hght = data.h / data.scale;
        let yy = (hght - PAGE_SIZE_DEFAULT.height) / 2;
        if (yy < 0) yy = 0;
        this.headcont.y = yy;
        this.headcont.x = (wdth - MAX_COUNT_COLUMN * WIDTH_COLUMN) / 2 + 30;
        this.leftArrow.x = 10;
        this.leftArrow.y = hght / 2 - 300;
        this.rightArrow.x = wdth - 80;
        this.rightArrow.y = hght / 2 - 300;
    }

    moveIcons(obj: any) {
        old_page = current_page;
        current_page = obj.page;
        this.placeIcons();
    }

    /**
     * build game list
     */
    updateHub() {
        this.cont.removeChildren();
        current_page = 0;
        //
        gsap.to(this.cont, {
            duration: 0.3,
            alpha: 1,
        });
        //
        game_icons = [];
        let gamearray = [];
        switch (SELECTED_PART) {
            case 1:
                gamearray = _.concat(
                    Games.firelinks,
                    Games.fishes,
                    Games.slots
                );
                break;
            case 2:
                gamearray = Games.fishes;
                break;
            case 3:
                gamearray = Games.slots;
                break;
            case 4:
                gamearray = Games.firelinks;
                break;
        }

        let totalcolumn = 0;
        this.buildGames(gamearray, 0);
        if (game_icons.length) {
            totalcolumn = (game_icons[game_icons.length - 1] as any).column;
        }

        this.placeIcons();

        EE.emit("UPDATE_CONTROL", { totalcolumn: totalcolumn });
    }

    buildGames(gamearray: any, totalcolumn: number) {
        let item;
        let yy = 0;
        for (const game of gamearray) {
            yy = 20;
            if (game.src.indexOf("http://") === -1)
                game.src = "http://www.fishglory.mobi" + game.src;
            item = new Icon2(game);
            item.y = yy;
            totalcolumn++;
            item.column = totalcolumn;
            this.cont.addChildAt(item, 0);
            //
            game_icons.push(item);
        }
        this.total_pages = Math.round(game_icons.length / MAX_COUNT_COLUMN);
    }

    async placeIcons() {
        move = true;
        gsap.killTweensOf(this.cont);
        this.cont.x = 0;
        await new Promise((resolve) => {
            let endX1 = 0;
            let endX2 = 0;
            if (old_page > current_page) {
                endX1 = 200;
                endX2 = -100;
            }
            if (old_page < current_page) {
                endX1 = -200;
                endX2 = 100;
            }
            gsap.to(this.cont, {
                duration: 0.2,
                alpha: 0,
                x: endX1,
                onComplete: () => {
                    this.cont.x = endX2;
                    resolve(null);
                },
            });
        });
        this.cont.removeChildren();

        const pg = current_page + 1;
        for (let i = 0; i < game_icons.length; i++) {
            const item: any = game_icons[i];
            if (item.page === pg) {
                // item.width = window.innerWidth / 6;
                this.cont.addChild(item);
            }
        }
        gsap.to(this.cont, {
            duration: 0.3,
            alpha: 1,
            x: 0,
            onComplete: () => {
                move = false;
            },
        });
    }

    moveIconsLeft() {
        current_page--;
        if (current_page < 0) {
            current_page = 0;
            return;
        }
        this.placeIcons();
    }

    moveIconsRight() {
        current_page++;
        if (current_page > this.total_pages) {
            current_page = this.total_pages;
            return;
        }
        this.placeIcons();
    }

    onDragStart(e: any) {
        startSlideX = e.data.originalEvent.pageX;
    }

    onTouchStart(e: any) {
        startSlideX = e.data.getLocalPosition(this.cont).x;
    }

    onTouchEnd(e: any) {
        const newX = e.data.getLocalPosition(this.cont).x;
        const delta = startSlideX - newX;
        if (Math.abs(delta) < 50 || move) return;
        //
        old_page = current_page;
        if (delta < 0) {
            current_page--;
            if (current_page < 0) {
                current_page = 0;
                return;
            }
            this.placeIcons();
        } else {
            current_page++;
            if (current_page > this.total_pages) {
                current_page = this.total_pages;
                return;
            }
            this.placeIcons();
        }
    }

    onDragEnd(e: any) {
        console.log(move, current_page);
        const newX = e.data.originalEvent.pageX;
        const delta = startSlideX - newX;
        if (Math.abs(delta) < 50 || move) return;
        //
        console.log("++", delta);
        old_page = current_page;
        if (delta < 0) {
            current_page--;
            if (current_page < 0) {
                current_page = 0;
                return;
            }
            this.placeIcons();
        } else {
            current_page++;
            if (current_page > this.total_pages) {
                current_page = this.total_pages;
                return;
            }
            this.placeIcons();
        }
    }
}
