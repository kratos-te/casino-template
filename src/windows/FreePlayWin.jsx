import React from "react";
import { EE } from "../App";
import "../css/freeplay.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import { VerificationWin } from "./VerificationWin";
import { CodeStatus } from "./CodeStatusWin";

export class FreePlayWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseVerification = this.handleCloseVerification.bind(this);
        this.handleCloseCodeStatus = this.handleCloseCodeStatus.bind(this);

        this.state = {
            verificationVisible: false,
            codeStatus: null,
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        const backImg = document.getElementsByClassName(
            "modal-window-fp__back"
        )[0];

        backImg.onload = () => {
            EE.emit("FORCE_RESIZE");
        };
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-fp__scale-cont"
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
            "modal-window-fp__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    handleCloseVerification() {
        this.setState({
            verificationVisible: false,
        });
    }

    handleCloseCodeStatus() {
        this.setState({
            codeStatus: null,
        });
    }

    render() {
        return (
            <div className="modal-window-reg">
                <div className="modal-window-fp__scale-cont">
                    <img
                        className="modal-window-fp__back"
                        src="images/frenzy/popup_bg.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/register/register_title.png"
                        alt="register title"
                        className="modal-window-fp__title"
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-fp__form-container">
                        <div className="modal-window-fp__phone_signup-container">
                            <img
                                src="images/frenzy/register/phone_signup.png"
                                alt="phone signup"
                                className="modal-window-fp__phone_signup"
                            />
                        </div>

                        <div className="flex-center-container modal-window-fp__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-fp__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-fp__input_field"
                                placeholder="Username"
                            />
                            <span class="modal-window-fp__input_placeholder">
                                Add Phone Number
                            </span>
                        </div>

                        <div className="modal-window-fp__button_container">
                            <img
                                src="images/frenzy/change_pw_bg.png"
                                alt="button base"
                                className="modal-window-fp__button_base"
                            />
                            <span
                                className="modal-window-fp__button_text"
                                onClick={() => {
                                    this.setState({
                                        verificationVisible: true,
                                    });
                                }}
                            >
                                SUBMIT phone number
                            </span>
                        </div>

                        <div className="flex-center-container modal-window-fp__input_container modal-window-fp__input_signupline">
                            {/* <img
                                src="images/frenzy/signup_line_bg.png"
                                alt=""
                                className=""
                            /> */}
                            <div className="modal-window-fp__input_signupline_line"></div>
                        </div>

                        <div className="flex-center-container modal-window-fp__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-fp__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-fp__input_field"
                                placeholder="Username"
                            />
                            <span class="modal-window-fp__input_placeholder">
                                Add Referral Code
                            </span>
                        </div>

                        <div
                            className="modal-window-fp__button_container"
                            onClick={() => {
                                this.setState({
                                    codeStatus: "valid",
                                });
                            }}
                        >
                            <img
                                src="images/frenzy/change_pw_bg.png"
                                alt="button base"
                                className="modal-window-fp__button_base"
                            />
                            <span className="modal-window-fp__button_text">
                                SUBMIT Referral Code
                            </span>
                        </div>
                    </div>
                </div>

                {this.state.verificationVisible && (
                    <VerificationWin onClose={this.handleCloseVerification} />
                )}

                {this.state.codeStatus !== null && (
                    <CodeStatus
                        onClose={this.handleCloseCodeStatus}
                        status={this.state.codeStatus}
                    />
                )}
            </div>
        );
    }
}
