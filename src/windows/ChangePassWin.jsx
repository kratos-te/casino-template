import React from "react";
import { EE } from "../App";
import "../css/changepass.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { isMobile } from "../common/Utils";

export class ChangePasswordWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangePasswordClick = this.onChangePasswordClick.bind(this);
        this.handleFocusPassword = this.handleFocusPassword.bind(this);
        this.handleFocusRePassword = this.handleFocusRePassword.bind(this);
        this.onChangeKeyboard = this.onChangeKeyboard.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.passwordRef = React.createRef();
        this.repasswordRef = React.createRef();

        this.state = {
            password: "",
            repassword: "",

            keyboardVisible: false,
            layoutName: "default",
            inputNode: "",
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-chpass__scale-cont"
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
            "modal-window-chpass__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    onChangePasswordClick() {
        console.log(this.state.password, this.state.repassword);
        EE.emit("SHOW_MESSAGE", "Password must be more than 6 characters");
        // this.handleClose();
    }

    onChangeText(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleFocusPassword() {
        const kb = document.getElementsByClassName(
            "game-keyboard-changepass"
        )[0];
        if (kb) {
            kb.style.top = "240px";
        }
        this.setState({
            inputNode: "password",
            keyboardVisible: true,
        });
        if (this.keyboard) this.keyboard.setInput(this.state.inputId);
    }

    handleFocusRePassword() {
        const kb = document.getElementsByClassName(
            "game-keyboard-changepass"
        )[0];
        if (kb) {
            kb.style.top = "330px";
        }
        this.setState({
            inputNode: "repassword",
            keyboardVisible: true,
        });
        if (this.keyboard) this.keyboard.setInput(this.state.inputId);
    }

    handleShift() {
        const layoutName = this.state.layoutName;

        this.setState({
            layoutName: layoutName === "default" ? "shift" : "default",
        });
    }

    onKeyPress(button) {
        switch (button) {
            case "{shift}":
            case "{lock}":
                this.handleShift();
                break;
            case "{enter}":
                if (this.state.inputNode === "password") {
                    this.handleFocusRePassword();
                    return;
                }
                this.onChangePasswordClick();
                break;
            default:
                console.log(button);
        }
    }

    onChangeKeyboard(input) {
        this.setState({ [this.state.inputNode]: input });
    }

    render() {
        return (
            <div className="modal-window-chpass">
                <div className="modal-window-chpass__scale-cont">
                    <img
                        className="modal-window-chpass__back"
                        src="images/frenzy/popup_bg.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/information/information_title.png"
                        alt="register title"
                        className="modal-window-chpass__title"
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-chpass__form-container">
                        <div className="flex-center-container modal-window-chpass__input_container modal-window-chpass__input_container_change_password">
                            <img
                                src="images/frenzy/changepassword/change-password.png"
                                className=""
                                alt="input bg"
                            />
                        </div>
                        <div className="flex-center-container modal-window-chpass__input_container">
                            <img
                                src="images/frenzy/input_change_bg.png"
                                className="modal-window-chpass__input_bg"
                                alt="input bg"
                            />
                            <div className="modal-window-chpass__input_info">
                                <img
                                    src="images/frenzy/ic_info.png"
                                    className=""
                                    alt=""
                                />
                                <span>
                                    A strong password should contain 6-16
                                    characters.
                                </span>
                            </div>
                        </div>
                        <div className="flex-center-container modal-window-chpass__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-chpass__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-chpass__input_field"
                                placeholder="Password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                onChange={this.onChangeText}
                                ref={this.passwordRef}
                                onFocus={this.handleFocusPassword}
                                value={this.state.password}
                            />
                            <span class="modal-window-chpass__input_placeholder">
                                Enter New Password
                            </span>
                        </div>
                        <div className="flex-center-container modal-window-chpass__input_container modal-window-chpass__input_retype">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-chpass__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-chpass__input_field"
                                placeholder="Re Enter Password"
                                name="repassword"
                                onChange={this.onChangeText}
                                type="password"
                                autoComplete="off"
                                ref={this.repasswordRef}
                                onFocus={this.handleFocusRePassword}
                                value={this.state.repassword}
                            />
                            <span class="modal-window-chpass__input_placeholder">
                                Retype New Password
                            </span>
                        </div>
                        <div className="flex-center-container modal-window-chpass__input_container modal-window-chpass__input_retypeerror">
                            <img
                                src="images/frenzy/retype_err.png"
                                alt="button base"
                                className="modal-window-chpass__button_base"
                            />
                            <span className="modal-window-chpass__button_text modal-window-chpass__button_text_input">
                                Input password must be 5-10 chars
                            </span>
                        </div>
                        <div
                            className="modal-window-chpass__button_container"
                            onClick={this.onChangePasswordClick}
                        >
                            <img
                                src="images/frenzy/change_pw_bg.png"
                                alt="button base"
                                className="modal-window-chpass__button_base"
                            />
                            <span className="modal-window-chpass__button_text">
                                CHANGE PASSWORD
                            </span>
                        </div>

                        <div
                            className={`game-keyboard game-keyboard-changepass ${
                                this.state.keyboardVisible
                                    ? "game-keyboard-on"
                                    : "game-keyboard-off"
                            }`}
                        >
                            {isMobile ? (
                                ""
                            ) : (
                                <Keyboard
                                    keyboardRef={(r) => (this.keyboard = r)}
                                    layoutName={this.state.layoutName}
                                    onChange={this.onChangeKeyboard}
                                    onKeyPress={this.onKeyPress}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {this.state.keyboardVisible && (
                    <div
                        className="modal-window-fill-backevent"
                        onClick={(e) =>
                            this.setState({ keyboardVisible: false })
                        }
                    />
                )}
            </div>
        );
    }
}
