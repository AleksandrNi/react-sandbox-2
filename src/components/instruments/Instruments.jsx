import React, { useEffect, useState } from 'react'
import 'components/instruments/Instruments.scss'
import { connect } from 'react-redux';
import {getInstrumentsList, storeInstrumentsActive, getSortedTableBy} from 'store/actions/instruments'

const Instruments = (props) => {
    const {getInstrumentsList, storeInstrumentsActive, instruments, getSortedTableBy} = props;
    console.log('props');
    console.log(props);
    
    // sorting
    const [sorting, setSorting] = useState({
        rate: '',
        partners_count:'',
        works_count:''
    })


    const sortingBy = (key) => {
        const sort_direction = setSortingFunc(key)[key];
        
        getSortedTableBy({
            sort: key,
            sort_direction: sort_direction, 
            page: sorting.page || 1 
        })
    }

    const setSortingFunc = (key) => {
        const newSorting = {};
        newSorting[key] = (
            sorting[key] 
                ? sorting[key] === 'asc'
                    ?  'desc'
                    :  'asc'
            : 'asc')

        setSorting((sorting)=>newSorting)
        return newSorting
    }

    // sorting end



    useEffect(()=> {
        if(!instruments) getInstrumentsList()
    },[])


    const arrowDirection = (key) =>{

        const direction = sorting[key] 
            ? sorting[key] ==='asc'
                ? 'arrow_upward '
                : 'arrow_downward'
            : ''
        return direction
    }

    const worksCount = arrowDirection('works_count')
    const partnersCount =  arrowDirection('partners_count')
    const rate =  arrowDirection('rate')
    
    const setActiveItem = (id) => {
        storeInstrumentsActive(id)
    } 

    return(
        <div className='inst-wrapper'>
            <div className='inst-container'>
                <div className='inst-exists'>
                    <div className='inst-list__head'>
                    <div><p>Title</p></div>
                        <div
                        className='inst-list__head__sortable'
                        onClick={()=>sortingBy('works_count')}
                        ><p>Projects</p>{
                            worksCount && <i className="material-icons-outlined  md-18">{worksCount}</i>
                        }</div>
                        <div
                        className='inst-list__head__sortable'
                        onClick={()=>sortingBy('partners_count')}
                        ><p>Partners</p>{
                            partnersCount && <i className="material-icons-outlined  md-18">{partnersCount}</i>
                        }</div>
                        <div
                        className='inst-list__head__sortable'
                        onClick={()=>sortingBy('rate')}
                        ><p>Rate</p>{
                            rate && <i className="material-icons-outlined  md-18">{rate}</i>
                        }</div>
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
        getSortedTableBy: (params) => dispatch(getSortedTableBy(params)),
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
                const sponsorClass = inst.isSponsor ? 'inst-list__body__sponsor' : ''
                return (
                    <div className='inst-list__body'
                    key={inst.id}
                    >
                        <div className={sponsorClass}><img src={inst.image} alt=""/><p>{inst.title}</p></div>
                        <div><p>{inst.worksCount || 0} projects</p></div>
                        <div><p>{inst.partnersCount || 0} partners</p></div>
                        <div><p>{inst.rate || 0}</p></div>
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

