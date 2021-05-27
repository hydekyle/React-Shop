import React, { useState, useEffect } from 'react'
import TeamDisplayer from './components/team-displayer/index'
import TeamSelection from './components/team-selection/index'
import './styles.css'

export default () => {
    return (
        <div className="page">
            <TeamDisplayer></TeamDisplayer>
            <TeamSelection></TeamSelection>
        </div>
    )
}