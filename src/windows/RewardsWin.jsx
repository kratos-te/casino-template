import React from "react";
import { EE } from "../App";
import "../css/rewards.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import { InviteFriendWin } from "./InviteFriendWin";

export class RewardsWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseReferral = this.handleCloseReferral.bind(this);
        this.state = {
            referralVisible: false,
            activeTab: "daily-wheel",
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        const backImg = document.getElementsByClassName(
            "modal-window-db__rewards__back"
        )[0];

        backImg.onload = () => {
            EE.emit("FORCE_RESIZE");
        };
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-db__rewards__scale-cont"
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
            "modal-window-db__rewards__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    handleCloseReferral() {
        this.setState({ referralVisible: false });
    }

    render() {
        return (
            <div className="modal-window-db__rewards">
                <div className="modal-window-db__rewards__scale-cont">
                    <img
                        className="modal-window-db__rewards__back"
                        src="images/frenzy/rewards/reward_bg.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-db__rewards__cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-db__rewards__content-container">
                        <div className="modal-window-db__rewards_menu">
                            <div
                                className="modal-window-db__rewards_menu_text"
                                onClick={() =>
                                    this.setState({ activeTab: "daily-wheel" })
                                }
                            >
                                <img
                                    src={
                                        this.state.activeTab === "daily-wheel"
                                            ? "images/frenzy/rewards/daily_wheel_text_active.png"
                                            : "images/frenzy/rewards/daily_wheel_text.png"
                                    }
                                    alt="register title"
                                    className="modal-window-db__rewards_menu_text_img"
                                />
                                <img
                                    src="images/frenzy/rewards/menu_line.png"
                                    alt="register title"
                                    className="modal-window-db__rewards_menu_divider"
                                />
                                {this.state.activeTab === "daily-wheel" && (
                                    <img
                                        src="images/frenzy/rewards/menu_active_shape.png"
                                        alt="register title"
                                        className="modal-window-db__rewards_menu_active_img"
                                    />
                                )}
                            </div>

                            <div
                                className="modal-window-db__rewards_menu_text"
                                onClick={() =>
                                    this.setState({ activeTab: "bounce-back" })
                                }
                            >
                                <img
                                    src={
                                        this.state.activeTab === "bounce-back"
                                            ? "images/frenzy/rewards/bounce_back_text_active.png"
                                            : "images/frenzy/rewards/bounce_back_text.png"
                                    }
                                    alt="register title"
                                    className="modal-window-db__rewards_menu_text_img"
                                />
                                <img
                                    src="images/frenzy/rewards/menu_line.png"
                                    alt="register title"
                                    className="modal-window-db__rewards_menu_divider"
                                />
                                {this.state.activeTab === "bounce-back" && (
                                    <img
                                        src="images/frenzy/rewards/menu_active_shape.png"
                                        alt="register title"
                                        className="modal-window-db__rewards_menu_active_img"
                                    />
                                )}
                            </div>

                            {/* <div
                                className="modal-window-db__rewards_menu_text"
                                onClick={() => {
                                    this.setState({ referralVisible: true });
                                }}
                                >
                                 <img
                                    src="images/frenzy/rewards/menu_line.png"
                                    alt="register title"
                                    className="modal-window-db__rewards_menu_divider"
                                />
                                <img
                                src="images/frenzy/rewards/referral_bonus_text.png"
                                alt="register title"
                                className="modal-window-db__rewards_menu_text_img"
                                />
                            </div> */}
                        </div>

                        <div className="modal-window-db__rewards_wheel">
                            {/* <img
                                src="images/frenzy/rewards/wheel.png"
                                alt="register title"
                                className="modal-window-db__rewards_wheel_img"
                                />  */}
                            {this.state.activeTab === "daily-wheel" ? (
                                <span>
                                    {/* Get ready for even more excitement with our bonus wheel feature!<br />
                                    This special addition gives you the chance to win bonus prizes on top of your regular spins. */}
                                    You will be able to spin once you have:
                                    <br />
                                    1. Deposited at least 3 coins.
                                    <br /> <br />
                                    Note: the wheel will activate every 24h.{" "}
                                    <br /> <br />
                                    Play more and get more !
                                </span>
                            ) : (
                                <>
                                    <span>
                                        1. Make a deposit of at least 5 coins.
                                        <br />
                                        2. Play <br />
                                        3. Once you balance is lower than 0.1
                                        coins, the bounce back bonus will be
                                        added to your account.
                                    </span>
                                    <br />
                                    <br />
                                    <span style={{ color: "#fff47b" }}>
                                        Note: bounce back bonus will be only
                                        once per day, every 24h, for your first
                                        deposit.
                                    </span>
                                    <br />
                                    <br />
                                    <span>
                                        The more you play, the more you get !
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {this.state.referralVisible && (
                    <InviteFriendWin onClose={this.handleCloseReferral} />
                )}
            </div>
        );
    }
}
