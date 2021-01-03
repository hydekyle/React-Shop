import React from "react";
import { Switch, Route } from "react-router-dom";
//import OfferSpotify from './components/offer-spotify/OfferSpotify'
import { MainProvider } from "./Context/ContextMain";
import MainBar from "./components/Navbar/Navbar";
import LandingPage from "./components/landing-page/LandingPage";
import BannerWelcome from "./components/banner-welcome/BannerWelcome";
import "./App.css";

export default () => (
  <div>
    <MainProvider>
      <MainBar />
      <BannerWelcome />
      <Switch>
        <Route path="/" component={LandingPage}></Route>
      </Switch>
    </MainProvider>
  </div>
);
