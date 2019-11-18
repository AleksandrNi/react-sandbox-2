import React, {useEffect} from 'react'
import 'components/instruments/Instruments.scss'
import { connect } from 'react-redux';
import {getInstrumentsList, storeInstrumentsActive} from 'store/actions/instruments'


const Favorites = (props) => {
    const {getInstrumentsList, selectedInstruments, instruments, storeInstrumentsActive} = props;
    if(!instruments)getInstrumentsList();
    
    const expandedSelectedInstruments =  instruments ? instruments.filter(inst=> {
        const indexExists = selectedInstruments.findIndex(id =>id === inst.id )
        return indexExists === -1 ? false : true;
    }) : []

    // useEffect(()=>{

    // },[selectedInstruments])

    const setActiveItem = (id) => {        
        storeInstrumentsActive(id)
    } 
    
    return(
        <div className='inst-wrapper'>
            <div className='inst-container'>
                <div className='inst-exists'>
                    <div className='inst-list__head'>
                        <div><p>Title</p></div>
                        <div><p>Projects</p></div>
                        <div><p>Partners</p></div>
                        <div><p>Rate</p></div>
                        <div><p>Compare</p></div>
                    </div>
                    <InstList 
                     setActiveItem={setActiveItem}
                    instruments={expandedSelectedInstruments}
                    />
                </div>
            </div>
        
        </div>
        )
}

const mapStateToProps = (state)=> {
    return {
        selectedInstruments:    state.instrumentsReducer.selectedInstruments,
        instruments:            state.instrumentsReducer.instruments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInstrumentsList: (params) => dispatch(getInstrumentsList(params)),
        storeInstrumentsActive: (id) => dispatch(storeInstrumentsActive(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites)


const InstList = ({instruments, setActiveItem }) => {

    return (
        <React.Fragment>
           {
            instruments && instruments.map(inst => {
                const active = inst.active ? 'delete' : 'delete';
                return (
                    <div className='inst-list__body'
                    key={inst.id}
                    >
                        <div><img src={inst.image} alt=""/><p>{inst.title}</p></div>
                        <div><p>{inst.worksCount} projects</p></div>
                        <div><p>{inst.partnersCount} partners</p></div>
                        <div><p>{inst.rate}</p></div>
                        <div><p><i 
                        onClick={()=>setActiveItem(inst.id)}
                        className="material-icons-outlined  md-18">{active}</i></p></div>
                    </div>
                )
            })
           }  
        </React.Fragment>

    )
}

