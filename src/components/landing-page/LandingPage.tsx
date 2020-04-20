import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import { Button } from 'reactstrap';

export default () => {
    return (
        <div className="page">
            <div className="main-content">
                <div className="title">¡Welcome loquetes!</div>
                <div className="page-description">
                    Bienvenidos a la Cono Cueva, lammers.
                    Aquí verás lo mejor de lo mejor.
                    Hyde Kyle está preparando su trabajo.
                    ¿Qué secretos esconderá esta página random?
                </div>
                <div className="btn-entrar">
                    <Button color="success">Entrar</Button>
                </div>
            </div>
        </div>
    )
}