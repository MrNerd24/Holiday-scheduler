import {BehaviorSubject} from "rxjs";

export const userSelectedLocationSubject = new BehaviorSubject<number[]>([60.170380, 24.941232])
export const holidayLengthsSubject = new BehaviorSubject<number[]>([])