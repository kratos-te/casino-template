import React from "react";
import { EE } from "../App";
import "../css/dailywheel.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import { transform } from "lodash";

const list = [
    { startDeg: 351, endDeg: 10, value: 1, textDeg: 271 },
    { startDeg: 10, endDeg: 25, value: 2, textDeg: 252 },
    { startDeg: 25, endDeg: 44, value: 5, textDeg: 235 },
    { startDeg: 44, endDeg: 62, value: 10, textDeg: 216 },
    { startDeg: 62, endDeg: 80, value: 20, textDeg: 198 },
    { startDeg: 80, endDeg: 98, value: 25, textDeg: 180 },
    { startDeg: 98, endDeg: 117, value: 50, textDeg: 162 },
    { startDeg: 117, endDeg: 135, value: 100, textDeg: 143 },
    { startDeg: 135, endDeg: 153, value: 1, textDeg: 125 },
    { startDeg: 153, endDeg: 171, value: 2, textDeg: 107 },
    { startDeg: 171, endDeg: 189, value: 5, textDeg: 89 },
    { startDeg: 189, endDeg: 207, value: 10, textDeg: 71 },
    { startDeg: 207, endDeg: 225, value: 20, textDeg: 53 },
    { startDeg: 225, endDeg: 243, value: 25, textDeg: 35 },
    { startDeg: 243, endDeg: 261, value: 50, textDeg: 17 },
    { startDeg: 261, endDeg: 279, value: 100, textDeg: 359 },
    { startDeg: 279, endDeg: 297, value: 1, textDeg: 341 },
    { startDeg: 297, endDeg: 316, value: 2, textDeg: 323 },
    { startDeg: 316, endDeg: 333, value: 5, textDeg: 304 },
    { startDeg: 333, endDeg: 351, value: 10, textDeg: 287 },
];

console.log(list.reverse());

export class DailyWheelWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSpin = this.handleSpin.bind(this);
        this.onFinished = this.onFinished.bind(this);
        this.state = {
            oldRotationDeg: 0,
            wheelLoading: false,
        };
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-dailyw__scale-cont"
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
            "modal-window-dailyw__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    handleSpin() {
        const wheel = document.getElementsByClassName(
            "modal-window-dailyw__wheel"
        )[0];

        if (wheel) {
            let deg = Math.floor(Math.random() * 360);

            let findItem = list.find(
                (v) => v.startDeg < deg && v.endDeg >= deg
            );

            if (findItem) {
                const exactDegValue = (findItem.startDeg + findItem.endDeg) / 2;

                this.setState({ oldRotationDeg: exactDegValue });

                let degToSpin = 0,
                    defaultSpinDone = false;

                let intervalVal = setInterval(() => {
                    if (!defaultSpinDone) {
                        if (degToSpin > 2880) {
                            degToSpin = 2880 + exactDegValue;
                            defaultSpinDone = true;
                        } else {
                            degToSpin += 150;
                        }
                    } else if (defaultSpinDone && degToSpin < exactDegValue) {
                        degToSpin += 1;
                    } else if (defaultSpinDone && degToSpin > exactDegValue) {
                        clearInterval(intervalVal);
                    }

                    wheel.style.transform = `rotate(${degToSpin}deg)`;
                }, 16);

                // wheel.style.transform = `rotate(${exactDegValue}deg)`;
            }

            // console.log(deg, findItem);

            setTimeout(() => {
                EE.emit("SHOW_CREDITED", {
                    reward: findItem.value,
                    rewardType: "dailyWheel",
                });
                this.setState({
                    wheelLoading: false,
                });
            }, 2000);
        }
    }

    onFinished = (winner) => {
        console.log(winner);
    };

    render() {
        return (
            <div className="modal-window-dailyw">
                <div className="modal-window-dailyw__scale-cont">
                    <img
                        src="images/frenzy/wheel/wheel_title.png"
                        alt="daily wheel"
                        className="modal-window-dailyw__title"
                    />

                    <div className="modal-window-dailyw__wheel-container">
                        <div className="modal-window-dailyw__wheel">
                            <img
                                src="images/frenzy/wheel/wheel.png"
                                alt="wheel"
                            />
                            {list.map((item) => (
                                <div
                                    className="modal-window-dailyw__wheel_price"
                                    style={{
                                        transform: `translateY(-50%) rotate(${item?.textDeg}deg)`,
                                    }}
                                >
                                    <span>$ {item?.value}</span>
                                </div>
                            ))}
                        </div>
                        <img
                            className={`modal-window-dailyw__spin ${
                                this.state.wheelLoading ? "disabled" : ""
                            }`}
                            src="images/frenzy/wheel/wheel_button.png"
                            alt="spin"
                            onClick={() => {
                                if (!this.state.wheelLoading) {
                                    this.setState({
                                        wheelLoading: true,
                                    });
                                    this.handleSpin();
                                }
                            }}
                        />
                        <img
                            className="modal-window-dailyw__pin"
                            src="images/frenzy/wheel/wheel_pin.png"
                            alt="pin"
                        />
                    </div>
                </div>
                <img
                    src="images/frenzy/cross_icon.png"
                    alt="register title"
                    className="modal-window-dailyw__cross_icon"
                    onClick={this.handleClose}
                />
            </div>
        );
    }
}
