import React from "react";
import { EE } from "../App";
import "../css/codestatus.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class CodeStatus extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);

        this.state = {};

        setTimeout(() => {
            this.handleClose();
        }, 3000);
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-codestatus__scale-cont"
        )[0];
        const sc = Math.min(
            data.h / PAGE_SIZE_DEFAULT.height,
            data.w / PAGE_SIZE_DEFAULT.width
        );
        if (cont) {
            cont.style.transform = `scale(${sc})`;
            cont.style.opacity = `1`;
        }
    }

    handleClose() {
        const cont = document.getElementsByClassName(
            "modal-window-codestatus__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    render() {
        return (
            <div className="modal-window-codestatus">
                <div className="modal-window-codestatus__scale-cont">
                    <img
                        className="modal-window-codestatus__back"
                        src="images/frenzy/popup_bg_small.png"
                        alt=""
                    />
                    <img
                        className="modal-window-codestatus__text"
                        src={`images/frenzy/${
                            this.props.status === "valid"
                                ? "valid_code"
                                : "invalid_code"
                        }.png`}
                        alt="valid code"
                    />
                </div>
            </div>
        );
    }
}
