import React from "react";
import { EE } from "../App";
import "../css/dailybonus.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class DailyBonus extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            streakDays: 1,
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        const backImg = document.getElementsByClassName(
            "modal-window-db__back"
        )[0];

        backImg.onload = () => {
            EE.emit("FORCE_RESIZE");
        };
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-db__scale-cont"
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
            "modal-window-db__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    handleClick(){
        this.setState({
            streakDays: this.state.streakDays > 6 ? 1 :this.state.streakDays+1
        })
    }

    render() {
        return (
            <div className="modal-window-db">
                <div className="modal-window-db__scale-cont">
                    <img
                        className="modal-window-db__back"
                        src="images/frenzy/dailybonus/daily_bonus_bg.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-db__cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-db__content-container">
                        <div className="modal-window-db__title-container">
                            <img
                                src="images/frenzy/dailybonus/login_for_seven_days.png"
                                alt="title"
                                className="modal-window-db__title-img"
                            />
                        </div>

                        <div className="modal-window-db__progress-img-container">
                            <img
                                src="images/frenzy/dailybonus/daily_bonus_progress.png"
                                alt="progress"
                                className="modal-window-db__progress-img"
                            />

                            <div className="modal-window-db__slot-container"></div>

                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <img
                                    src={
                                        this.state.streakDays >= i
                                            ? "images/frenzy/dailybonus/daily_bonus_filled_slot.png"
                                            : "images/frenzy/dailybonus/daily_bonus_empty_slot.png"
                                    }
                                    alt="empty slot"
                                    className={
                                        "modal-window-db__empty-slot slot-" + i
                                    }
                                />
                            ))}

                            <span className="modal-window-db__progress-text">
                                {this.state.streakDays}/7
                            </span>
                        </div>

                        <div className="modal-window-db__collect_container" onClick={this.handleClick}>
                            <div className="modal-window-db__button_container">
                                <img
                                    src="images/frenzy/button_base.png"
                                    alt="button base"
                                    className="modal-window-db__button_base"
                                />
                                <span className="modal-window-db__button_text">
                                    COLLECT
                                </span>
                            </div>
                        </div>

                        <div className="modal-window-db__note_container">
                            Note : Login and play 5 days out of 7 and win the
                            treasure. Minimum 3 deposits required per week
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
