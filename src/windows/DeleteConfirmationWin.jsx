import React from "react";
import { EE } from "../App";
import "../css/deleteconfirmation.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class DeleteConfirmationWin extends React.Component {
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
            "modal-window-deleteconf__scale-cont"
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
            "modal-window-deleteconf__scale-cont"
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
            <div className="modal-window-deleteconf">
                <div className="modal-window-deleteconf__scale-cont">
                    <img
                        className="modal-window-deleteconf__back"
                        src="images/frenzy/popup_bg_small.png"
                        alt=""
                    />

                    <div className="modal-window-deleteconf__form-container">
                        <div className="modal-window-deleteconf__back_bgtext">
                            <img
                                className="modal-window-deleteconf__back_bgtext_image"
                                src="images/frenzy/deleteconfirmation/delete_bg_popup.png"
                                alt=""
                            />
                            <img
                                className="modal-window-deleteconf__back_bgtext_account"
                                src="images/frenzy/deleteconfirmation/delete-account-text.png"
                                alt=""
                            />
                        </div>

                        <div className="modal-window-deleteconf__button_containermain">
                            <div
                                className="modal-window-deleteconf__button_container"
                                onClick={this.handleClose}
                            >
                                <img
                                    src="images/frenzy/button_base.png"
                                    alt="button base"
                                    className="modal-window-deleteconf__button_base"
                                />
                                <span className="modal-window-deleteconf__button_text">
                                    YES
                                </span>
                            </div>

                            <div
                                className="modal-window-deleteconf__button_container"
                                onClick={this.handleClose}
                            >
                                <img
                                    src="images/frenzy/button_base.png"
                                    alt="button base"
                                    className="modal-window-deleteconf__button_base"
                                />
                                <span className="modal-window-deleteconf__button_text">
                                    NO
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
