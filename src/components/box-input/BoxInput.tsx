import React, { useState, useEffect, useContext } from 'react'
import {MainContext} from '../../Context/MainContext'

export default () => {
    const context = useContext(MainContext)
   return (
       <div>
           <button onClick={() => context?.setCounter(context.counter + 20)}>Working?</button>
       </div>
   )
}
