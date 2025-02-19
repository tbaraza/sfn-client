import React from 'react'
import { shallow, mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'

// Need at least 1 test to pass Travis CI
describe('<Layout />', () => {
  let layoutWrapper
  let eventMap

  beforeEach(() => {
    eventMap = {}
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })
    document.removeEventListener = jest.fn()
    layoutWrapper = shallow(<Layout children={[]} />)
  })

  it('contains a Header component', () => {
    expect(layoutWrapper.find('Header').length).toEqual(1)
  })
  it('has a state with mobileMenu false', () => {
    expect(layoutWrapper.state('mobileMenu')).toEqual(false)
  })
  it('has state updated when the NavBar it contains has its menu item clicked', () => {
    layoutWrapper = mount(
      <BrowserRouter>
        <Layout children={[]} />
      </BrowserRouter>
    )
    layoutWrapper.find('FontAwesomeIcon').simulate('click')
    const layout = layoutWrapper.find('Layout')
    expect(layout.state('mobileMenu')).toEqual(true)
  })

  it('calls component will unmount on unmount', () => {
    layoutWrapper.unmount()
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })

  it('sets state of mobileMenu to false on mouse up ', () => {
    eventMap.mouseup()
    expect(layoutWrapper.state().mobileMenu).toBe(false)
    layoutWrapper.setState({ mobileMenu: true })
    eventMap.mouseup()
    expect(layoutWrapper.state().mobileMenu).toBe(false)
  })
})
