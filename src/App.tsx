import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './components/landing-page/LandingPage'
import OfferSpotify from './components/offer-spotify/OfferSpotify'
import { MainProvider } from './Context/ContextMain'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default () =>
  <div>
    <MainProvider>
      <Switch>
        <Route path='/' component={LandingPage}></Route>
      </Switch>
    </MainProvider>
  </div>
