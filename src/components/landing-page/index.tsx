import React, { useState, useEffect } from 'react'
import './styles.css'
import '../game-displayer'
import GameDisplayer from '../game-displayer'

export default () => {
    return (
        <div className="page">
            <GameDisplayer></GameDisplayer>
        </div>
    )
}