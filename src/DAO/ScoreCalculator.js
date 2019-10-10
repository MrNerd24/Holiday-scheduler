import {predictions} from "./Predictions";

export const calculateScores = () => {
    const scoredPredictions = predictions.map((station) => {

        const maxValues = station.Predictions.reduce((maxValues, prediction) => {
            const newMaxValues = {...maxValues}
            Object.keys(prediction).forEach((key) => {
                const max = maxValues[key] || Number.MIN_SAFE_INTEGER
                const keyPrediction = prediction[key]
                if (prediction[key]) {
                    newMaxValues[key] = Math.max(max, keyPrediction)
                } else {
                    newMaxValues[key] = max
                }

            })
            return newMaxValues
        }, station.Predictions[0])

        const minValues = station.Predictions.reduce((minValues, prediction) => {
            const newMinValues = {}
            Object.keys(prediction).forEach((key) => {

                const min = minValues[key] || Number.MAX_SAFE_INTEGER
                const keyPrediction = prediction[key]
                if (prediction[key]) {
                    newMinValues[key] = Math.min(min, keyPrediction)
                } else {
                    newMinValues[key] = min
                }

            })
            return newMinValues
        }, station.Predictions[0])


        let editedPredictions = station.Predictions.map((prediction) => {
            const cloudScore = prediction.clouds && 10 * (1 - ((prediction.clouds - minValues.clouds) / (maxValues.clouds - minValues.clouds))) || 0
            const windScore = prediction.windSpeed && 10 * (1 - ((prediction.windSpeed - minValues.windSpeed) / (maxValues.windSpeed - minValues.windSpeed))) || 0
            const pressureScore = prediction.airPressure && 5 * ((prediction.airPressure - minValues.airPressure) / (maxValues.airPressure - minValues.airPressure)) || 0
            const humidityScore = prediction.relativeHumidity && 5 * (1 - ((prediction.relativeHumidity - minValues.relativeHumidity) / (maxValues.relativeHumidity - minValues.relativeHumidity))) || 0
            const maxTempScore = prediction.maxAirTemperature && 60 * ((prediction.maxAirTemperature - minValues.maxAirTemperature) / (maxValues.maxAirTemperature - minValues.maxAirTemperature)) || 0
            const minTempScore = prediction.minAirTemperature && 10 * ((prediction.minAirTemperature - minValues.minAirTemperature) / (maxValues.minAirTemperature - minValues.minAirTemperature)) || 0
            return {...prediction, score: cloudScore + windScore + pressureScore + humidityScore + maxTempScore + minTempScore}
        })

        const minScore = editedPredictions.reduce((minScore, prediction) => Math.min(minScore, prediction.score), Number.MAX_SAFE_INTEGER)
        const maxScore = editedPredictions.reduce((maxScore, prediction) => Math.max(maxScore, prediction.score), Number.MIN_SAFE_INTEGER)

        editedPredictions = editedPredictions.map((prediction) => ({...prediction, score: (prediction.score-minScore)/(maxScore-minScore)}))

        return {...station, Predictions: editedPredictions}
    })

    download("scoredPredictions.json", JSON.stringify(scoredPredictions))
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}