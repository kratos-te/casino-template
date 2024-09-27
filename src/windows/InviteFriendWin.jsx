import React from "react";
import { EE } from "../App";
import "../css/inviteFriend.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class InviteFriendWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            referralVisible: false,
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        const backImg = document.getElementsByClassName(
            "modal-window-dbfriend__back"
        )[0];

        backImg.onload = () => {
            EE.emit("FORCE_RESIZE");
        };
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-dbfriend__scale-cont"
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
            "modal-window-dbfriend__scale-cont"
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
            <div className="modal-window-dbfriend">
                <div className="modal-window-dbfriend__scale-cont">
                    <img
                        className="modal-window-dbfriend__back"
                        src="images/frenzy/rewards/invite_friend_bg.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-dbfriend__cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-dbfriend__content-container">
                        <img
                            className="modal-window-dbfriend__referral_bonus_img"
                            src="images/frenzy/rewards/referral_bonus.png"
                            alt=""
                        />
                        <span>Reward will be credited to the referral player account once a referred friend makes one purchases above $20 and reaches +$100 total play level.</span>
                        <span>Maximum 10 referral bonus rewards can be collected per week.</span>
                        <img
                            className="modal-window-dbfriend__referral_code_img"
                            src="images/frenzy/rewards/referral_code.png"
                            alt=""
                        />
                        <div className="modal-window-dbfriend__referral_button_container">
                            <img
                            className="modal-window-dbfriend__referral_button"
                                src="images/frenzy/rewards/copy.png"
                                alt=""
                            />
                            <img
                            className="modal-window-dbfriend__referral_button"
                                src="images/frenzy/rewards/share.png"
                                alt=""
                            />
                            <img
                            className="modal-window-dbfriend__referral_button"
                                src="images/frenzy/rewards/qr.png"
                                alt=""
                            />
                        </div>
                        <span>To get the welcome $5 bonus friend must be a new player who has never played with River before</span>
                        <span>The friend must enter a referral code after authorization and confirm their phone number</span>
                    </div>

                </div>
                
            </div>

            
        );
    }
}
