import React from 'react'
import { Switch, Route } from 'react-router-dom'
//import LandingPage from './components/landing-page/LandingPage'
import ElMisterioDeLaOscuridad from './components/el-misterio-de-la-oscuridad/ElMisterioDeLaOscuridad'
//import OfferSpotify from './components/offer-spotify/OfferSpotify'
import { MainProvider } from './Context/ContextMain'
import MainBar from './components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default () =>
  <div>
    <MainProvider>
      <MainBar />
      <Switch>
        <Route path='/' component={ElMisterioDeLaOscuridad}></Route>
      </Switch>
    </MainProvider>
  </div>
