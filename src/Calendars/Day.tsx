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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: RGBColorToString(colorSlide(backgroundColor, sunnyColor, score)),
    width: 50,
    height: 50,
    border: isBestDay ? "2px solid green" : undefined,
    position: "relative",
}));

const Day: React.FC<{ dayNum: number, index: number, data?: DayData, isBestDay: boolean }> = ({dayNum, index, data, isBestDay}) => {

    const [expandedViewIsVisible, setExpandedViewIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useOutsideClick(containerRef, () => setExpandedViewIsVisible(false))


    return (
        <Container className="day-container" index={index} score={data && data.score || 0} isBestDay={isBestDay}
                   ref={containerRef} onClick={() => setExpandedViewIsVisible(true)}>
            {dayNum === 0 ? "" : dayNum}
            {data && (
                <Popper
                    open={expandedViewIsVisible}
                    anchorEl={containerRef.current}
                    placement={"top-start"}
                    modifiers={{
                        offset: {
                            enabled: true,
                            offset: "-100%, -100%"
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