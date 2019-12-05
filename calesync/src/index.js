import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from 'react-calendar';
import firebase from './firebase.js';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import App from './components/app'
import UserCalendar from './components/usercalendar'
import Consent from './components/consent';

const routing = (
    <Router>
        <div>
            <Route exact path={ROUTES.LANDING} component={App}/>
            <Route path={ROUTES.CONSENT} component={Consent}/>
            <Route path={ROUTES.CALENDAR} component={UserCalendar}/>

        </div>
    </Router>
)

// ========================================

ReactDOM.render(
    routing,
    document.getElementById('root')
);
