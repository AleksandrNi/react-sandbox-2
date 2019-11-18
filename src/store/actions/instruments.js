import * as types from './actionTypes'
import Axios from 'axios'

const actionCreator = (type, res) => {  
    console.log(type);
    console.log(res);
     
    return {
        type,
        payload: res
    }
}

export const getInstrumentsList = (params) => {
    return async (dispatch) => {
        const response = await Axios
        .get('https://api.cmsmagazine.ru/v1/instrumentsList?instrument_type_code=cms&page=1')
        .then(res=>res.data.data)
        .catch(err=>console.log(err))
        console.log('response');
        console.log(response);
        
        dispatch(actionCreator(types.GET_INSTRUMENTS, response))
    }
}

export const storeInstrumentsActive = (id) => (dispatch) => {
    console.log(id);
    
    dispatch(actionCreator(types.STORE_INSTRUMENTS_ACTIVE, id))
}