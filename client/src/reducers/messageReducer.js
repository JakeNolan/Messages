import { FETCH_MESSAGE_DATA, MESSAGE_REPORT_LOADING } from '../actions/types';

const INITIAL_STATE = {
    gpsCount: 0,
    canCount: 0,
    uniqueCanCount: 0,
    totalRuntime: 0,
    canAvgPerSecond: 0,
    canAvgPerGps: 0,
    firstTsMostCans: 0,
    firstTsLeastCans: 0,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MESSAGE_REPORT_LOADING:
            return { ...state, loading: true };
        case FETCH_MESSAGE_DATA:
            console.log('reducer payload: ', action.payload);
            return {
                ...state,
                INITIAL_STATE,
                gpsCount: action.payload.gpsCount,
                canCount: action.payload.canCount,
                uniqueCanCount: action.payload.uniqueCanCount,
                totalRuntime: action.payload.totalRuntime,
                canAvgPerSecond: action.payload.canAvgPerSecond,
                canAvgPerGps: action.payload.canAvgPerGps,
                firstTsMostCans: action.payload.firstTsMostCans,
                firstTsLeastCans: action.payload.firstTsLeastCans,
                loading: false
             };
        default:
            return state;
    }
};