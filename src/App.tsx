import React from 'react'
import { Switch, Route } from 'react-router-dom'
//import OfferSpotify from './components/offer-spotify/OfferSpotify'
import { MainProvider } from './Context/ContextMain'
import MainBar from './components/Navbar/Navbar'
import LandingPage from './components/landing-page/LandingPage'
import ElMisterioDeLaOscuridad from './components/el-misterio-de-la-oscuridad/ElMisterioDeLaOscuridad'
import Evolution from './components/evolution/Evolution'
import Askito from './components/askito/Askito'
import SpaceWar from './components/space-war/SpaceWar'
import Bipolar from './components/bipolar-ball/Bipolar'
import Cricket from './components/cricket/Cricket'
import Kraken from './components/kraken/Kraken'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default () =>
  <div>
    <MainProvider>
      <MainBar />
      <Switch>
        <Route path='/askito' component={Askito}></Route>
        <Route path='/bipolar' component={Bipolar}></Route>
        <Route path='/evolution' component={Evolution}></Route>
        <Route path='/spacewar' component={SpaceWar}></Route>
        <Route path='/cricket' component={Cricket}></Route>
        <Route path='/kraken' component={Kraken}></Route>
        <Route path='/elmisteriodelaoscuridad' component={ElMisterioDeLaOscuridad}></Route>
        <Route path='/' component={LandingPage}></Route>
      </Switch>
    </MainProvider>
  </div>
