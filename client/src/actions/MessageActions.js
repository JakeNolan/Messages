import axios from 'axios';
import { FETCH_MESSAGE_DATA, MESSAGE_REPORT_LOADING } from './types';

export const fetchMessageData = () => async dispatch => {
    dispatch({type: MESSAGE_REPORT_LOADING});
    const res = await axios.get('/api/messageData');
   
    console.log('response: ', res);
    dispatch({ type: FETCH_MESSAGE_DATA, payload: res.data });
};