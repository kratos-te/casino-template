import React from "react";
import { EE } from "../App";
import "../css/reg.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { isMobile } from "../common/Utils";

export class RegWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.handleFocusUsername = this.handleFocusUsername.bind(this);
        this.onChangeKeyboard = this.onChangeKeyboard.bind(this);
        this.handleFocusPassword = this.handleFocusPassword.bind(this);
        this.handleFocusPhone = this.handleFocusPhone.bind(this);
        this.handleFocusEmail = this.handleFocusEmail.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.refId = React.createRef();
        this.refPassword = React.createRef();
        this.refPhone = React.createRef();
        this.refEmail = React.createRef();

        this.state = {
            username: "",
            password: "",
            phone: "",
            email: "",

            keyboardVisible: false,
            layoutName: "default",
            inputNode: "",
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        const backImg = document.getElementsByClassName(
            "modal-window-reg__back"
        )[0];

        backImg.onload = () => {
            EE.emit("FORCE_RESIZE");
        };
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-reg__scale-cont"
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
            "modal-window-reg__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    onRegisterClick() {
        console.log(
            this.state.username,
            this.state.password,
            this.state.phone,
            this.state.email
        );
        EE.emit("GO_GAME");
    }

    onChangeText(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleFocusUsername() {
        const kb = document.getElementsByClassName("game-keyboard-reg")[0];
        if (kb) {
            kb.style.top = "78px";
        }
        this.setState({
            inputNode: "username",
            keyboardVisible: true,
        });
        if (this.keyboard) this.keyboard.setInput(this.state.inputId);
    }

    handleFocusPassword() {
        const kb = document.getElementsByClassName("game-keyboard-reg")[0];
        if (kb) {
            kb.style.top = "198px";
        }
        this.setState({
            inputNode: "password",
            keyboardVisible: true,
        });
        if (this.keyboard) this.keyboard.setInput(this.state.inputId);
    }

    handleFocusPhone() {
        const kb = document.getElementsByClassName("game-keyboard-reg")[0];
        if (kb) {
            kb.style.top = "318px";
        }
        this.setState({
            inputNode: "phone",
            keyboardVisible: true,
        });
        if (this.keyboard) this.keyboard.setInput(this.state.inputId);
    }

    handleFocusEmail() {
        const kb = document.getElementsByClassName("game-keyboard-reg")[0];
        if (kb) {
            kb.style.top = "430px";
        }
        this.setState({
            inputNode: "email",
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
                if (this.state.inputNode === "username") {
                    this.handleFocusPassword();
                    return;
                }
                if (this.state.inputNode === "password") {
                    this.handleFocusPhone();
                    return;
                }
                if (this.state.inputNode === "phone") {
                    this.handleFocusEmail();
                    return;
                }
                this.onRegisterClick();
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
            <div className="modal-window-reg">
                <div className="modal-window-reg__scale-cont">
                    <img
                        className="modal-window-reg__back"
                        src="images/frenzy/popup_bg.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/register/register_title.png"
                        alt="register title"
                        className="modal-window-reg__title"
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-reg__form-container">
                        <div className="flex-center-container modal-window-reg__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-reg__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-reg__input_field"
                                placeholder="Username"
                                name="username"
                                onChange={this.onChangeText}
                                ref={this.refId}
                                onFocus={this.handleFocusUsername}
                                value={this.state.username}
                            />
                            <img
                                className="modal-window-reg__input_placeholder"
                                src="images/frenzy/register/username.png"
                                alt="username"
                            />
                        </div>
                        <div className="flex-center-container modal-window-reg__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-reg__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-reg__input_field"
                                placeholder="Password"
                                name="password"
                                onChange={this.onChangeText}
                                ref={this.refPassword}
                                onFocus={this.handleFocusPassword}
                                value={this.state.password}
                            />
                            <img
                                className="modal-window-reg__input_placeholder"
                                src="images/frenzy/register/password.png"
                                alt="password"
                            />
                        </div>
                        <div className="flex-center-container modal-window-reg__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-reg__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-reg__input_field"
                                placeholder="Phone"
                                name="phone"
                                onChange={this.onChangeText}
                                ref={this.refPhone}
                                onFocus={this.handleFocusPhone}
                                value={this.state.phone}
                            />
                            <img
                                className="modal-window-reg__input_placeholder"
                                src="images/frenzy/register/phone.png"
                                alt="phone"
                            />
                        </div>
                        <div className="flex-center-container modal-window-reg__input_container">
                            <img
                                src="images/frenzy/input_bg_2.png"
                                className="modal-window-reg__input_bg"
                                alt="input bg"
                            />
                            <input
                                className="modal-window-reg__input_field"
                                placeholder="Email"
                                name="email"
                                onChange={this.onChangeText}
                                ref={this.refEmail}
                                onFocus={this.handleFocusEmail}
                                value={this.state.email}
                            />
                            <img
                                className="modal-window-reg__input_placeholder"
                                src="images/frenzy/register/email.png"
                                alt="email"
                            />
                        </div>
                        <div
                            className="modal-window-reg__button_container"
                            onClick={this.onRegisterClick}
                        >
                            <img
                                src="images/frenzy/button_base.png"
                                alt="button base"
                                className="modal-window-reg__button_base"
                            />
                            <span className="modal-window-reg__button_text">
                                SUBMIT
                            </span>
                        </div>

                        <div
                            className={`game-keyboard game-keyboard-reg ${
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
