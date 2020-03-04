import React, { useContext } from 'react'
import {MainContext} from '../../Context/MainContext'
import { Button, CardBody} from 'reactstrap'
export default () => {
    const context = useContext(MainContext)
    return (
        <div>
            <Button 
                color="danger"
                onClick={() => context?.resetCounter()}
                >Danger!!</Button>
            <CardBody>{context?.counter}</CardBody>
        </div>
    )
}
