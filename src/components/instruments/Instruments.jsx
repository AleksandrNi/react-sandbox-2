import React, { useEffect } from 'react'
import 'components/instruments/Instruments.scss'
import { connect } from 'react-redux';
import {getInstrumentsList, storeInstrumentsActive} from 'store/actions/instruments'

const Instruments = (props) => {
    const {getInstrumentsList, storeInstrumentsActive, instruments} = props;
    console.log('props');
    console.log(props);
    
    useEffect(()=> {
        if(!instruments) getInstrumentsList()
    },[])
    
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
                    getInstrumentsList={getInstrumentsList} 
                    instruments={instruments}
                    setActiveItem={setActiveItem}
                    />
                </div>
            </div>
        
        </div>
        )
}

const mapStateToProps = (state)=> {
    return {
        instruments: state.instrumentsReducer.instruments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInstrumentsList: (params) => dispatch(getInstrumentsList(params)),
        storeInstrumentsActive: (id) => dispatch(storeInstrumentsActive(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)

const InstList = ({getInstrumentsList, instruments, setActiveItem}) => {
    
    // code: "bitrix"
    // firstLettersOfName: "1С"
    // id: 56
    // image: "https://images.cmsmagazine.ru/img_out/catalog_cms/upload7vu33x1i85.png"
    // partnersCount: 2172
    // rate: 4.3
    // shortUrl: "1c-bitrix.ru"
    // title: "1С-Битрикс"
    // url: "http://www.1c-bitrix.ru/"
    // worksCount: 34774
    return (
        <React.Fragment>
           {
            instruments && instruments.map(inst => {
                const active = inst.active ? 'radio_button_checked' : 'radio_button_unchecked';
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

