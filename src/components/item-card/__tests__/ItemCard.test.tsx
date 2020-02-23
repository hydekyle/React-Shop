import React from 'react'
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ItemCard from '../ItemCard'

configure({ adapter: new Adapter() })

describe('ItemCard', () => {
    describe('BeforeFetch', () => {
        test('Check initial value', () => {
            const wrapper = shallow(
            <ItemCard 
                description=''
                name=''
                img=''
            />)
            expect(wrapper.find('h2').text()).toBe('')
        })
    })
})