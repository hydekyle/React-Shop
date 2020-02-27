import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from  './components/login/Login'
import Menu from './components/menu/Menu'
import Articles from './components/articles/Articles'
import ItemCard from './components/item-card/ItemCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div>
      <Menu status={true} counter={0}/>
      <ItemCard name='TestArticle' description='testing wey' img="https://www.thesun.co.uk/wp-content/uploads/2018/11/cat-2.png"/>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/shop' component={Articles}></Route>
        </Switch>
    </div>
  )
}

export default App
