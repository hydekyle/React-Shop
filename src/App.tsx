import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Menu from './components/menu/Menu'
import ItemCard from './components/item-card/ItemCard'
import BoxInput from './components/box-input/BoxInput'
import BannerWelcome from './components/banner-welcome/BannerWelcome'
import GameMoon from './components/game-moons/GameMoons'
import GamePuzzle from './components/game-puzzle/GamePuzzle'
import { MainProvider } from './Context/ContextMain'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default () =>
  <div>
    <MainProvider>


      <Switch>
        <Route path='/login'>
          <Menu />
          <BoxInput />
          <BannerWelcome />
        </Route>
        <Route path='/shop' component={ItemCard}></Route>
        <Route path='/moons' component={GameMoon}></Route>
        <Route path='/puzzle' component={GamePuzzle}></Route>
      </Switch>
    </MainProvider>
  </div>
