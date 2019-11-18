import React from 'react';
import 'App.scss';

import { Provider } from 'react-redux'
import { store } from 'store/store'

import Aside from 'components/Aside/Aside.jsx'
import {RoutesList} from 'routes/AsideRoutes'
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    
  return (
    <div className="App">
        <Provider store={store}>
            <Router>
            <div className='main-wrapper'>
                <main>
                    <Aside />
                    <section>
                        <RoutesList  />
                    </section>
                </main>
            </div>
            </Router>
        </Provider>
    </div>
  );
}

export default App;
