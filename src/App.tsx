import "./App.css";
import React from "react";
import TopWindows from "./TopWindows";
import * as PIXI from "pixi.js";
import { listImages } from "./common/Config";
import EventEmitter from "eventemitter3";
import { setup } from "./Game";
import { MessageWin } from "./windows/MessageWin";

/**
 * global Event Emitter
 */
export let EE: EventEmitter = new EventEmitter();
///
export let imagesLoader: PIXI.Loader;

//show popup with message
export function showPopup(txt: string) {
    /*"Congratulations, you have completed more than 8 gems! Once time is over you'll receive a reward."*/
    EE.emit("SHOW_MESSAGE", txt);
}

class App extends React.Component<{}, { MESSAGE: string }> {
    constructor(props: any) {
        super(props);
        this.onCloseMessage = this.onCloseMessage.bind(this);
        this.state = {
            MESSAGE: "",
        };
        EE.addListener("SHOW_MESSAGE", (txt) => {
            this.setState({ MESSAGE: txt });
        });
    }

    componentDidMount() {
        const WebFont = require("webfontloader");
        WebFont.load({
            custom: {
                families: ["Bronzier"],
            },
        });
        const preloaderbase = document.getElementsByClassName("preloader-game");
        const preloader = document.getElementsByClassName("prel-bar-line");
        const percentage = document.getElementById("percentage");
        //
        imagesLoader = PIXI.Loader.shared;
        imagesLoader.add(listImages);
        imagesLoader.onProgress.add(() => {
            const wdth = (1024 * Math.ceil(100 - imagesLoader.progress)) / 100;
            if (preloader[0]) {
                (preloader[0] as any).style.setProperty(
                    "clip-path",
                    `inset(0 ${wdth}px 0 0)`
                );
            }

            if (percentage) {
                percentage.innerText = Math.floor(imagesLoader.progress) + "%";
            }
        });
        imagesLoader.onError.add((e) => {
            console.log("ERROR LOAD! ", e);
        });
        imagesLoader.onComplete.add(() => {
            if (preloaderbase[0]) {
                (preloaderbase[0] as any).style.setProperty("opacity", "0");
                setTimeout(() => {
                    (preloaderbase[0] as any).style.setProperty(
                        "display",
                        "none"
                    );
                    (preloaderbase[0] as any).parentNode.removeChild(
                        preloaderbase[0] as any
                    );
                    //setup();
                    EE.emit("CLEAR_TOP_WINDOWS");
                    // EE.emit("SHOW_LOGIN");
                    EE.emit("SHOW_LOGIN");
                    // EE.emit("GO_GAME");
                    //EE.emit('SHOW_MAINTEN');
                    //EE.emit('PAGE_INFO');
                    //EE.emit('SHOW_REG');
                    //EE.emit('SHOW_FREE_PLAY');
                    //EE.emit('SHOW_SIGNPHONE');
                }, 1000);
            }
        });
        imagesLoader.load();
        //
        EE.once("GO_GAME", () => {
            EE.emit("CLEAR_TOP_WINDOWS");
            setup();
        });
    }

    onCloseMessage() {
        this.setState({
            MESSAGE: "",
        });
    }

    onOpenMaintenance() {
        EE.emit("CLEAR_TOP_WINDOWS");
        EE.emit("SHOW_LOGIN");
    }

    render() {
        return (
            <div>
                {this.state.MESSAGE !== "" && (
                    <MessageWin
                        text={this.state.MESSAGE}
                        onClose={this.onCloseMessage}
                    />
                )}
                <TopWindows />
                <div id="AppGame" />
            </div>
        );
    }
}

export default App;
