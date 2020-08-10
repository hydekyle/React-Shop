import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import '../game-displayer/GameDisplayer'
import GameDisplayer from '../game-displayer/GameDisplayer'

export default () => {
    return (
        <div className="page">
            <div className="main-content">
                <div className="title">
                    <h1>MISTERY GAMES</h1>
                </div>
                <div className="page-description">
                    <h2>Welcome, welcome a la web/portafolio de Ayoze Manuel.</h2>
                </div>
                <img className="logo" src={"/logo512.png"} alt="" height="200em" width="200em" />
                <div className="btn-entrar">
                    <GameDisplayer></GameDisplayer>
                </div>
            </div>
        </div>
    )
}