import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from  './components/login/Login'
import Menu from './components/menu/Menu'
import Articles from './components/articles/Articles'
import ItemCard from './components/item-card/ItemCard'
import BoxInput from './components/box-input/BoxInput'
import {MainProvider} from './Context/MainContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default () => 
    <div>
      <MainProvider>
        <Menu/>
        <BoxInput/>
        <ItemCard/>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/shop' component={Articles}></Route>
          </Switch>
        </MainProvider>
    </div>
