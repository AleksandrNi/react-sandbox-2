import React from 'react'
import 'components/Aside/Aside.scss'
import {AsideRoutes} from 'routes/AsideRoutes'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';


const Aside = (props) => {
    const {selectedInstruments} = props;
    const types = Object.keys(AsideRoutes);
    
    return (
        <aside >
            <div className='Logo'>
                <img src="https://cdn.worldvectorlogo.com/logos/copyright-red.svg" alt=""/>
                <div>
                    <p>magazine</p>
                    <p>digital things</p>
                </div>
            </div>

            {types.map((type, index) => {
                return (               
                <ul
                key={type}
                >
                <TypesList 
                selectedInstruments={selectedInstruments}
                routeList={AsideRoutes[type]['items']} 
                /*parentPath={AsideRoutes[type]['path']} */
                />
                </ul>
                )
            })}
        </aside>  
    )
}


const mapStateToProps = (state)=> {
    return {
        selectedInstruments:    state.instrumentsReducer.selectedInstruments,

    }
}

export default connect(mapStateToProps)(Aside)

const TypesList = ({routeList, /* parentPath */ selectedInstruments}) => routeList.map((route,index) => {
    return (
        <NavLink
        key={route.name+index}
        to={/*parentPath + */ route.path}
        className='aside-menu-items'
        activeClassName="aside-menu-items-active"
        >
        <li 
        >
            {route.icon &&  <i className="material-icons-outlined  md-18">{route.icon}</i>}
            <p>{route.name}</p>
            {(selectedInstruments && selectedInstruments.length !== 0 && route.name ==='Favorites') && <div className='aside-menu-items__qty'>{selectedInstruments.length}</div>  }
        </li>
        </NavLink>

    )
})
