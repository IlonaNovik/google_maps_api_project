import React, { Component, createRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import WelcomePage from './partials/welcome';
import SearchPage from './partials/search';
import MapsPage from './partials/maps';


import './App.scss';
import {
    BrowserRouter,
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink
} from "react-router-dom";



const Main = () => {
    const links = [
        {name: "welcome", url: "/"},
        {name: "search", url: "/search"},
        {name: "my maps", url: "/maps"},
    ];
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top"></a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto my-2 my-lg-0">

                {links.map(item => (
                    <li key={item.url} className="nav-item">
                        <NavLink to={item.url} className="nav-link js-scroll-trigger" activeClassName="active">
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            
            </ul>
            </div>
            </div>
    </nav>
        </>
    );
};

const App = () => (
    
    <HashRouter>
        <>
            <Main/>
            <Switch>
                <Route exact path="/" component={WelcomePage}/>
                <Route exact path="/search" component={SearchPage}/>
                <Route exact path="/maps" component={MapsPage}/>
                <Route path="*" component={Main}/>
            </Switch>
        </>
    </HashRouter>
    
);

    export default App;