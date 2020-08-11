import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import '../game-displayer/GameDisplayer'
import GameDisplayer from '../game-displayer/GameDisplayer'

export default () => {
    return (
        <div className="page">
            <GameDisplayer></GameDisplayer>
        </div>
    )
}