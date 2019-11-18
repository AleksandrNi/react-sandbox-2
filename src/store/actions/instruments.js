import * as types from './actionTypes'
import Axios from 'axios'

const actionCreator = (type, res) => {  
     
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


export const getSortedTableBy = (params) => {
    const {sort,sort_direction, page} = params;
    let compiledQuery = '';
    if (page) compiledQuery += `&page=${page}`
    if (sort) compiledQuery += `&sort=${sort}`
    if (sort_direction) compiledQuery += `&sort_direction=${sort_direction}`
    console.log('compiledQuery');
    console.log(compiledQuery);
    

    return async (dispatch) => {
        const response = await Axios
        .get(`https://api.cmsmagazine.ru/v1/instrumentsList?instrument_type_code=cms${compiledQuery}`)
        .then(res=>res.data.data)
        .catch(err=>console.log(err))
        console.log('response');
        console.log(response);
        
        dispatch(actionCreator(types.GET_INSTRUMENTS, response))
    }
}