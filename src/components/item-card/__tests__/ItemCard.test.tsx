import React from 'react'
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ItemCard from '../ItemCard'

configure({ adapter: new Adapter() })

describe('ItemCard', () => {

    const wrapper = shallow(<ItemCard />)

    describe('BeforeFetch', () => {
        test('Check initial value', () => {    
            expect(wrapper.find('h2').text()).toBe('')
        })
        test('Check api json', () => {
            
        })
    })
})