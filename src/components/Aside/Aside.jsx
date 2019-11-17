import React from 'react'
import 'components/Aside/Aside.scss'
import {AsideRoutes} from 'routes/AsideRoutes'
import {NavLink} from 'react-router-dom'

export const Aside = (props) => {
    const types = Object.keys(AsideRoutes);
    console.log(props);
    
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
                routeList={AsideRoutes[type]['items']} 
                /*parentPath={AsideRoutes[type]['path']} */
                />
                </ul>
                )
            })}
        </aside>  
    )
}


const TypesList = ({routeList, /* parentPath */}) => routeList.map((route,index) => {
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
        </li>
        </NavLink>

    )
})
