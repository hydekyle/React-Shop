import React, { useState, useEffect } from 'react'
import {MainContext} from '../../Context/MainContext'

interface Props {
    counter: number
}

export default () => {
   return (
       <div>
           <MainContext.Consumer>
                {context => (
                    <button onClick={() => {context?.setCounter(20)}}>
                        {context?.counter}
                    </button>
                )}
            </MainContext.Consumer>
       </div>
   )
}
