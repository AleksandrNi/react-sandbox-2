import * as actionTypes from '../actions/actionTypes'
import {updateState} from '../utility'
const initialState = {
    instruments: ''
}

const expandInstrumentsParams = (state, action) => {
    // some changes
    const localStorageActiveItems = JSON.parse(localStorage.getItem('activeInstruments'));
    let selectedInstruments = [];

    const expandedPayload = action.payload.map(inst=> {
        if(!localStorageActiveItems || !localStorageActiveItems.length ) {
            inst.active = false;
        } else {
            const indexExists = localStorageActiveItems.findIndex(id=>id===inst.id)

            if ( indexExists === -1 ) {
                inst.active = false;
            } else {
                inst.active = true;
            }
        }
        return inst
    })
    
    return updateState(state, { 
        instruments: expandedPayload,
        selectedInstruments
     })
}

const changeInstrumentActiveParams = (state, action) => {

    
    const localStorageActiveItems = JSON.parse(localStorage.getItem('activeInstruments'));
    const instruments = [...state.instruments]
    const selectedInstrumentIndex = instruments.findIndex(inst=>inst.id === action.payload)


    let selectedInstruments = localStorageActiveItems || [];
    instruments[selectedInstrumentIndex].active = !instruments[selectedInstrumentIndex].active

    if (!instruments[selectedInstrumentIndex].active) {
        selectedInstruments = [...state.selectedInstruments].filter(id => id !== action.payload)
    } else {
        selectedInstruments.push(instruments[selectedInstrumentIndex].id)
    }

    localStorage.setItem('activeInstruments', JSON.stringify(selectedInstruments));
    return updateState(state, {
        instruments, 
        selectedInstruments,
    })
}

export const instrumentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INSTRUMENTS: return expandInstrumentsParams(state, action)
        case actionTypes.STORE_INSTRUMENTS_ACTIVE: return changeInstrumentActiveParams(state, action)
        default:
            break;
    }
    return state
} 





// export const storeInstrumentsActive = (state = initialState, action) => {    
//     console.log('action');
//     console.log(action);
//     switch (action.type) {
//         case actionTypes.STORE_INSTRUMENTS_ACTIVE: 
        
//         return changeInstrumentActiveParams(state, action)

//         default:
//             break;
//     }
//     return state
// } 