import React from "react";
import "../css/login.css";
import { RegWin } from "./RegWin";
import { EE } from "../App";
import { FreePlayWin } from "./FreePlayWin";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import Keyboard from "react-simple-keyboard";
import { isMobile } from "../common/Utils";
import "react-simple-keyboard/build/css/index.css";

export class LoginWin extends React.Component {
    keyboard = null;
    constructor() {
        super();
        this.onChangeText = this.onChangeText.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.handleFocusUsername = this.handleFocusUsername.bind(this);
        this.onChangeKeyboard = this.onChangeKeyboard.bind(this);
        this.handleFocusPassword = this.handleFocusPassword.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.refId = React.createRef();
        this.refPassword = React.createRef();

        this.state = {
            rememberMe: false,
            registerVisible: false,
            freeplayVisible: false,

            keyboardVisible: false,
            layoutName: "default",
            inputNode: "",

            username: "",
            password: "",
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-login__scale-cont"
        )[0];
        const sc = Math.min(
            data.h / PAGE_SIZE_DEFAULT.height,
            data.w / PAGE_SIZE_DEFAULT.width
        );
        if (cont) {
            cont.style.transform = `scale(${sc + 0.01})`;
        }
    }

    onLoginClick() {
        console.log(
            this.state.username,
            this.state.password,
            this.state.rememberMe
        );
        EE.emit("GO_GAME");
    }

    handleFocusUsername() {
        const kb = document.getElementsByClassName("game-keyboard")[0];
        if (kb) {
            kb.style.top = "330px";
        }
        this.setState({
            inputNode: "username",
            keyboardVisible: true,
        });
        if (this.keyboard) this.keyboard.setInput(this.state.inputId);
    }

    handleFocusPassword() {
        const kb = document.getElementsByClassName("game-keyboard")[0];
        if (kb) {
            kb.style.top = "470px";
        }
        this.setState({
            inputNode: "password",
            keyboardVisible: true,
        });
        if (this.keyboard) this.keyboard.setInput(this.state.inputId);
    }

    onChangeText(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });

        if (this.keyboard) this.keyboard.setInput(e.target.value);
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
                if (this.state.inputNode === "username") {
                    this.handleFocusPassword();
                    return;
                }
                this.onLoginClick();
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
            <div className="modal-window-login">
                <img
                    src="images/frenzy/login_border.png"
                    className="modal-window-login__border"
                    alt="login border"
                />

                <div className="modal-window-login__scale-cont">
                    <div className="modal-window-login__logo">
                        <img
                            src="images/frenzy/prel_logo.png"
                            className="modal-window-login__login_logo"
                            alt="logo"
                        />
                    </div>
                    <div className="modal-window-login__down">
                        <img
                            src="images/frenzy/login/login_bg.png"
                            className="modal-window-login__login_bg"
                            alt="logo"
                        />
                        <input
                            className="modal-window-login__text-id modal-window-login__input_field"
                            // placeholder="Username"
                            name="username"
                            onChange={this.onChangeText}
                            autoComplete="off"
                            onFocus={this.handleFocusUsername}
                            ref={this.refId}
                            value={this.state.username}
                        />
                        <input
                            className="modal-window-login__text-password modal-window-login__input_field"
                            // placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.onChangeText}
                            onFocus={this.handleFocusPassword}
                            ref={this.refPassword}
                            autoComplete="off"
                            value={this.state.password}
                        />

                        <label
                            className="modal-window-login__radio_container"
                            htmlFor="rememberMe"
                            onClick={() => {
                                this.setState({
                                    rememberMe: !this.state.rememberMe,
                                });
                            }}
                        >
                            <img
                                src={
                                    this.state.rememberMe
                                        ? "images/frenzy/radio_active.png"
                                        : "images/frenzy/radio_inactive.png"
                                }
                                className={
                                    this.state.rememberMe
                                        ? "modal-window-login__radio_active"
                                        : "modal-window-login__radio_inactive"
                                }
                                alt="radio"
                            />
                            <span
                                className="modal-window-login__radio_text"
                                onClick={() => {
                                    this.setState({
                                        rememberMe: !this.state.rememberMe,
                                    });
                                }}
                            >
                                Remember me
                            </span>
                        </label>

                        <img
                            src="images/frenzy/login/login_btn.png"
                            alt="button login base"
                            onClick={this.onLoginClick}
                            className="modal-window-login__login modal-window-login__btn game-button"
                        />
                        <img
                            onClick={() => {
                                this.setState({
                                    registerVisible: true,
                                });
                            }}
                            src="images/frenzy/login/reg_btn.png"
                            alt="button register base"
                            className="modal-window-login__fplay modal-window-login__btn game-button"
                        />
                    </div>

                    <div
                        className={`game-keyboard ${
                            this.state.keyboardVisible
                                ? "game-keyboard-on"
                                : "game-keyboard-off"
                        }`}
                        style={{
                            width: "100%",
                            left: "0",
                        }}
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

                {this.state.registerVisible && (
                    <RegWin
                        onClose={() =>
                            this.setState({ registerVisible: false })
                        }
                    />
                )}
                {this.state.freeplayVisible && (
                    <FreePlayWin
                        onClose={() =>
                            this.setState({ freeplayVisible: false })
                        }
                    />
                )}
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
