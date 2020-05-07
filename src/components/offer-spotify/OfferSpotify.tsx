import React, { useState, useEffect } from 'react'
import './OfferSpotify.css'
import { Button } from 'reactstrap';
import SpotifyLogo from '../../img/SpotifyIcon.png'

export default () => {
    return (
        <div className="page">
            <div className="main-content">
                <div className="title">
                    <h1>YEAR OF PREMIUM SPOTIFY</h1>
                </div>
                <div className="page-description">
                    Get ONE year of spotify premium for free!
                </div>
                <img className="logo" src={SpotifyLogo} alt="" height="200em" width="200em" />
                <div className="btn-entrar">
                    <Button
                        color="success"
                        onClick={() => window.location.href = 'http://lnkclik.com/8R1o'}
                    >Get premium!
                    </Button>
                </div>
                <div className="page-details">
                    Note: this promotion is only available for United States.
                </div>
            </div>
        </div>
    )
}