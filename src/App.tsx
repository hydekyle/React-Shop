import React from "react"
import { Switch, Route } from "react-router-dom"
import { MainProvider } from "./Context/ContextMain"
import MainBar from "./components/Navbar/Navbar"
import LandingPage from "./components/landing-page"
import BannerWelcome from "./components/banner-welcome"
import Magnificos from "./components/magnificos"
import "./App.css";

export default () => (
  <div>
    <MainProvider>
      <MainBar />
      <BannerWelcome />
      <Switch>
        <Route path="/magnificos" component={Magnificos}></Route>
        <Route path="/" component={LandingPage}></Route>
      </Switch>
    </MainProvider>
  </div>
)
