import React from "react";
import { EE } from "../App";
import "../css/credited.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class CreditedWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-credited__scale-cont"
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
            "modal-window-credited__scale-cont"
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
            <div className="modal-window-credited">
                <div className="modal-window-credited__scale-cont">
                    <img
                        className="modal-window-credited__back"
                        src="images/frenzy/credited/background.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/cross_icon.png"
                        alt="register title"
                        className="modal-window-credited__cross_icon"
                        onClick={this.handleClose}
                    />
                    <div className="modal-window-credited__text-container">
                        <img
                            src="images/frenzy/credited/title.png"
                            alt="credited title"
                            className="modal-window-credited__title"
                        />
                        <div className="modal-window-credited__amount-container">
                            <img
                                src="images/frenzy/credited/amount_bg.png"
                                alt="credited title"
                                className="modal-window-credited__amount-bg"
                            />
                            <p className="modal-window-credited__amount">
                                ${this.props.rewardData.reward}
                            </p>
                        </div>
                        {this.props.rewardData.rewardType === "dailyWheel" ? (
                            <img
                                src="images/frenzy/credited/free_spin_text.png"
                                alt="credited title"
                                className="modal-window-credited__text"
                            />
                        ) : (
                            <img
                                src="images/frenzy/credited/bounce_back_credits.png"
                                alt="credited title"
                                className="modal-window-credited__text"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
