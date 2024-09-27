import React from "react";
import { EE } from "../App";
import "../css/verification.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class VerificationWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);

        this.state = {};
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-verification__scale-cont"
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
            "modal-window-verification__scale-cont"
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
            <div className="modal-window-verification">
                <div className="modal-window-verification__scale-cont">
                    <img
                        className="modal-window-verification__back"
                        src="images/frenzy/getverification/get-verification.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-verification__cross_icon"
                        onClick={this.handleClose}
                    />
                    <div className="modal-window-verification__form-container">
                        <div className="flex-center-container modal-window-verification__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-verification__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-verification__input_field"
                                placeholder="Username"
                            />
                        </div>

                        <div
                            className="modal-window-verification__button_container"
                            onClick={this.handleClose}
                        >
                            <img
                                src="images/frenzy/change_pw_bg.png"
                                alt="button base"
                                className="modal-window-verification__button_base"
                            />
                            <span className="modal-window-verification__button_text">
                                SUBMIT
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
