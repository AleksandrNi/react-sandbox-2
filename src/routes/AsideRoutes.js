import React from 'react';
import {
    Switch,
    Route,
    Redirect
    } from "react-router-dom";

import Instruments from 'components/instruments/Instruments.jsx'
import {Favorites} from 'components/favorites/Favorites.jsx'

import {Common} from 'components/common/Common.jsx'


export const AsideRoutes = {
    mainMenu: {
        path: '/menu',
        items:  [{
            name: 'Journal',
            path:'/journal',
            icon: '',
            component: Common
            },
            {
            name: 'Agencies',
            path:'/agencies',
            icon: '',
            component: Common
            },
            {
            name: 'Instruments',
            path:'/instruments',
            icon: '',
            component: Instruments
            },
        ],
    },
    subMenu: {
        path: '/submenu',
        items:  [{
            name: 'Favorites',
            path:'/favorites',
            icon: 'star_border',
            component: Favorites
            },
            {
            name: 'Search',
            path:'/search',
            icon: 'search',
            component: Common
            },
            {
            name: 'Cabinet',
            path:'/cabinet',
            icon: 'list_alt',
            component: Common
            },
        ],
    }

}

export const RoutesList = () => {
    const routesTypesKeys = Object.keys(AsideRoutes);
    
    return (
        <Switch>
            {
                routesTypesKeys.map(key => {
                    // const parentRoute = AsideRoutes[key]['path'];
                    
                    return AsideRoutes[key]['items'].map((route, index) => (
                    <Route 
                        key={route.name+index}
                        path={/*parentRoute + */ route.path}
                        render={(routeProps) => {
                            const Component = route.component;
                            return <Component {...routeProps} title={route.name} />
                        }}
                      >
                    
                    </Route>
                    )
                )})
            }
            <Route exact path="/" render={() => <Redirect to={'instruments'} />} />
        </Switch>
    )
}