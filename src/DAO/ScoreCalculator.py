# -*- coding: utf-8 -*-


import json
import sys
from functools import reduce
predictions = json.loads(open(r"C:\Users\Juuso Lassila\Documents\pred_results_2019.json").read())

def scoreStation(station):
    
    def getBiggerValues(prediction1, prediction2):
        newMaxValues = prediction1.copy()
        for key in prediction2:
            maxVal = prediction1[key] or sys.float_info.min
            pred2Val = prediction2[key]
            if pred2Val:
                newMaxValues[key] = max(maxVal, pred2Val)
            else:
                newMaxValues[key] = maxVal
        return newMaxValues
    
    maxValues = reduce(getBiggerValues, station["Predictions"], station["Predictions"][0])
    
    def getSmallerValues(prediction1, prediction2):
        newMinValues = prediction1.copy()
        for key in prediction2:
            minVal = prediction1[key] or sys.float_info.max
            pred2Val = prediction2[key]
            if pred2Val:
                newMinValues[key] = min(minVal, pred2Val)
            else:
                newMinValues[key] = minVal
        return newMinValues
    
    minValues = reduce(getSmallerValues, station["Predictions"], station["Predictions"][0])
    
    def normalize(value, maxValue, minValue):
        return (value-minValue)/(maxValue-minValue)
        
    def addScoreToPrediction(prediction):
        maxScore = 0
        def calculateScore(property, weight, inverted=False):
            nonlocal prediction
            nonlocal maxScore
            nonlocal maxValues
            nonlocal minValues
            if property in prediction and prediction[property]:
                maxScore += weight
                if inverted:
                    return (weight * (1-normalize(prediction[property], maxValues[property], minValues[property])))
                else:
                    return (weight * normalize(prediction[property], maxValues[property], minValues[property]))
            return 0
        
        cloudScore = calculateScore("clouds", 10, True)
        windScore = calculateScore("windSpeed", 10, True)
        pressureScore = calculateScore("airPressure", 5)
        humidityScore = calculateScore("relativeHumidity", 5, True)
        maxTempScore = calculateScore("maxAirTemperature", 60)
        minTempScore = calculateScore("minAirTemperature", 10)
        newPrediction = prediction.copy()
        if maxScore != 0:
            newPrediction["score"] = (cloudScore+windScore+pressureScore+humidityScore+maxTempScore+minTempScore)/maxScore
        else: 
            newPrediction["score"] = 0.5
        return newPrediction
    
    editedPredictions = list(map(addScoreToPrediction, station["Predictions"]))
    
    minScore = reduce(lambda m, p: min(m, p), map(lambda p: p["score"], editedPredictions), sys.float_info.max)
    maxScore = reduce(lambda m, p: max(m, p), map(lambda p: p["score"], editedPredictions), sys.float_info.min)
    
    def normalizeScore(prediction):
        newPrediction = prediction.copy()
        newPrediction["score"] = normalize(prediction["score"], maxScore, minScore)
        return newPrediction
    
    editedPredictions = list(map(normalizeScore, editedPredictions))
    
    newStation = station.copy()
    newStation["Predictions"] = editedPredictions
    return newStation
        
        
    
    
predictions = list(map(scoreStation, predictions))
    
with open(r"C:\Users\Juuso Lassila\Documents\scored_pred_results_2019.json", "w") as f:
        json.dump(predictions, f)