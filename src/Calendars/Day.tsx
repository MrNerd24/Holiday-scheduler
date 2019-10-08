import React, {useRef, useState} from 'react';
import styled from '@emotion/styled'
import {backgroundColor, sunnyColor} from "../palette";
import {DayData} from "../DAO/DAO";
import {colorSlide, RGBColorToString} from "../Utils/ColorUtils";
import DayExpanded from "./DayExpanded";
import Popper from '@material-ui/core/Popper';
import useOutsideClick from "../Utils/useOutsideClick";
import Grow from '@material-ui/core/Grow';


const Container = styled('div')<{ index: number; score: number, isBestDay: boolean }>(({index, score, isBestDay}) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: RGBColorToString(colorSlide(backgroundColor, sunnyColor, score)),
    width: 60,
    height: 60,
    border: isBestDay ? "2px solid green" : undefined,
    position: "relative",
}));

const DayNum = styled("p")<{}>(() => ({
    margin: 0,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
    marginTop: 4,
}))

const Temperature = styled("p")<{}>(() => ({
    margin:0,
    fontSize: 14,
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}))

const Day: React.FC<{ dayNum: number, index: number, data?: DayData, isBestDay: boolean }> = ({dayNum, index, data, isBestDay}) => {

    const [expandedViewIsVisible, setExpandedViewIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useOutsideClick(containerRef, () => setExpandedViewIsVisible(false))


    return (
        <Container className="day-container" index={index} score={data && data.score || 0} isBestDay={isBestDay}
                   ref={containerRef} onClick={() => setExpandedViewIsVisible(true)}>
            <DayNum>{dayNum === 0 ? "" : dayNum}</DayNum>
            <Temperature>{data && (Math.round(data.maxAirTemperature) + "°C") || ""}</Temperature>
            {data && (
                <Popper
                    open={expandedViewIsVisible}
                    anchorEl={containerRef.current}
                    placement={"top-start"}
                    modifiers={{
                        offset: {
                            enabled: true,
                            offset: "-100%+65, -300%"
                        }
                    }}
                >
                    <DayExpanded data={data}/>
                </Popper>

            )}
        </Container>
    );
}

export default Day;