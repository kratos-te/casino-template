import React from "react";
import { EE } from "../App";
import "../css/info.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import { ChangePasswordWin } from "./ChangePassWin";
import { DeleteConfirmationWin } from "./DeleteConfirmationWin";

export class InfoWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseChangePass = this.handleCloseChangePass.bind(this);
        this.handleCloseConfirmation = this.handleCloseConfirmation.bind(this);

        this.state = {
            changePassVisible: false,
            deleteConfirmationVisible: false,
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-info__scale-cont"
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
            "modal-window-info__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    handleCloseChangePass() {
        this.setState({ changePassVisible: false });
    }

    handleCloseConfirmation() {
        this.setState({ deleteConfirmationVisible: false });
    }

    render() {
        return (
            <div className="modal-window-info">
                <div className="modal-window-info__scale-cont">
                    <img
                        className="modal-window-info__back"
                        src="images/frenzy/popup_bg.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/information/information_title.png"
                        alt="register title"
                        className="modal-window-info__title"
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-info__action-container">
                        <div className="modal-window-info__action-item-container">
                            <img
                                src="images/frenzy/information/item_bg.png"
                                alt="item bg"
                                className="modal-window-info__action-item-bg"
                            />
                            <div className="modal-window-info__action-item-ui">
                                <div className="modal-window-info__action-item-icon-container">
                                    <img
                                        src="images/frenzy/information/user.png"
                                        alt="user"
                                        className="modal-window-info__action-item-icon"
                                    />
                                </div>
                                <div className="modal-window-info__action-text-container">
                                    <span className="modal-window-info__action-item-title">
                                        USERNAME
                                    </span>
                                    <span className="modal-window-info__action-item-text">
                                        user name
                                    </span>
                                </div>
                                <div className="modal-window-info__action-button-container">
                                    <img
                                        src="images/frenzy/information/tick_icon.png"
                                        alt="tick"
                                        className="modal-window-info__action-item-tick"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-window-info__action-item-container">
                            <img
                                src="images/frenzy/information/item_bg.png"
                                alt="item bg"
                                className="modal-window-info__action-item-bg"
                            />
                            <div className="modal-window-info__action-item-ui">
                                <div className="modal-window-info__action-item-icon-container">
                                    <img
                                        src="images/frenzy/information/passwprd.png"
                                        alt="user"
                                        className="modal-window-info__action-item-icon"
                                    />
                                </div>
                                <div className="modal-window-info__action-text-container">
                                    <span className="modal-window-info__action-item-title">
                                        PASSWORD
                                    </span>
                                    <span className="modal-window-info__action-item-text">
                                        ************
                                    </span>
                                </div>
                                <div
                                    className="modal-window-info__action-button-container"
                                    onClick={() => {
                                        this.setState({
                                            changePassVisible: true,
                                        });
                                    }}
                                >
                                    <div className="modal-window-info__button_container">
                                        <img
                                            src="images/frenzy/button_base.png"
                                            alt="button base"
                                            className="modal-window-info__button_base"
                                        />
                                        <span className="modal-window-info__button_text">
                                            CHANGE
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-window-info__action-item-container">
                            <img
                                src="images/frenzy/information/item_bg.png"
                                alt="item bg"
                                className="modal-window-info__action-item-bg"
                            />
                            <div className="modal-window-info__action-item-ui">
                                <div className="modal-window-info__action-item-icon-container">
                                    <img
                                        src="images/frenzy/information/delete.png"
                                        alt="user"
                                        className="modal-window-info__action-item-icon"
                                    />
                                </div>
                                <div className="modal-window-info__action-text-container">
                                    <span className="modal-window-info__action-item-title">
                                        DELETE YOUR ACCOUNT?
                                    </span>
                                </div>
                                <div className="modal-window-info__action-button-container">
                                    <div
                                        className="modal-window-info__button_container"
                                        onClick={() => {
                                            this.setState({
                                                deleteConfirmationVisible: true,
                                            });
                                        }}
                                    >
                                        <img
                                            src="images/frenzy/button_base.png"
                                            alt="button base"
                                            className="modal-window-info__button_base"
                                        />
                                        <span className="modal-window-info__button_text">
                                            DELETE
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.changePassVisible && (
                    <ChangePasswordWin onClose={this.handleCloseChangePass} />
                )}

                {this.state.deleteConfirmationVisible && (
                    <DeleteConfirmationWin
                        onClose={this.handleCloseConfirmation}
                    />
                )}
            </div>
        );
    }
}
