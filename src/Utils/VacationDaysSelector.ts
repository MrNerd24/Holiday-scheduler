import {DayData} from "../DAO/DAO";

export const getBestVacationDays = (data: DayData[], vacationDurations: number[]) => {
    const scoreArray = data.map((datum) => datum.score)
    const scoreSumArray = getSumArray(scoreArray)
    const maximizingWindows = getMaximizingWindows([scoreSumArray], vacationDurations)
    const positions = maximizingWindows.positions
    console.log(positions)
    let isBestDay = Array.from({length: data.length}, (v, k) => false);
    for (let positionIndex = 0; positionIndex < positions.length; positionIndex++) {
        let position = positions[positionIndex]
        for (let i = position; i < position + vacationDurations[positionIndex]; i++) {
            isBestDay[i] = true
        }
    }
    return isBestDay
}

const getSumArray = (originalArray: number[]) => {
    let sum = 0;
    return originalArray.map((originalArrayItem) => {
        sum += originalArrayItem
        return sum
    })
}

const getMaximizingWindows = (sumArrays: number[][], windowLengths: number[], startingIndices = [0], sumsBeforeArray = [0]) => {
    let max = 0
    let maximizingIndices: number[] = [];
    for(let i = 0; i < sumArrays.length; i++) {
        let sumArray = sumArrays[i]
        let sumBeforeArray = sumsBeforeArray[i]
        for(let j = 0; j <= sumArray.length - windowLengths[0]; j++) {
            let windowSum = sumArray[j+windowLengths[0]-1] - (j-1 < 0 ? sumBeforeArray : sumArray[j-1])
            let restOfMaximizingWindows: {maxSum: number, positions: number[]} = {maxSum: 0, positions: []}
            if (windowLengths.length > 1) {
                let remainingArrays = [...sumArrays.slice(0, i), sumArray.slice(0, j), sumArray.slice(j+windowLengths[0]), ...sumArrays.slice(i+1)]
                let remainingSumsBeforeArray = [...sumsBeforeArray]
                let remainingStartingIndices = [...startingIndices]
                let remainingWindowLengths = [...windowLengths].slice(1)
                remainingSumsBeforeArray.splice(i+1, 0, sumArray[j+windowLengths[0]-1])
                remainingStartingIndices.splice(i+1, 0, remainingStartingIndices[i]+windowLengths[0]+j)
                restOfMaximizingWindows = getMaximizingWindows(remainingArrays, remainingWindowLengths, remainingStartingIndices, remainingSumsBeforeArray)
                windowSum += restOfMaximizingWindows.maxSum
            }
            if (windowSum > max) {
                max = windowSum
                maximizingIndices = [startingIndices[i] + j, ...(restOfMaximizingWindows && restOfMaximizingWindows.positions || [])];
            }
        }
    }

    return {maxSum: max, positions: maximizingIndices}
}