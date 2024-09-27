import * as PIXI from "pixi.js";
import { HubDown } from "./elements/HubDown";
import {HubTop} from "./elements/HubTop";

export class Hub extends PIXI.Sprite{
	cont:PIXI.Sprite = new PIXI.Sprite();
	down:PIXI.Sprite = new PIXI.Sprite();

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.cont.addChild(new HubTop());
		this.down = this.cont.addChild(new HubDown());
		//set watermark
		//setWatermark(true);
	}

}