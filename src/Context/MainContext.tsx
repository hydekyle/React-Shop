import React, { useState, useEffect, useMemo } from 'react'

export interface MainContextInterface {
    counter: number,
    name: string,
    setCounter: Function
}

const initialContext : MainContextInterface = {
    counter: 100,
    name: "TestName",
    setCounter: (num: number) => {
      console.log(initialContext.counter)
      initialContext.counter += num
    }
  }

export const MainContext = React.createContext<MainContextInterface | null>(null)

export function MainProvider(props) {
    return <MainContext.Provider value={initialContext} {...props} />
}