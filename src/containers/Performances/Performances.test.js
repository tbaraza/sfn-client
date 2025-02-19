import React from 'react'
import Performances from './Performances'
import { mount } from 'enzyme'

describe('<Performances />', () => {
  let performancesWrapper

  beforeEach(() => {
    performancesWrapper = mount(<Performances />)
  })

  it('contains a Trending Performances wrapper', () => {
    const performancesWrapper = mount(<Performances />)
    expect(performancesWrapper.find('TrendingPerformances').length).toEqual(1)
  })

  it('contains an ExploreArtists section', () => {
    expect(performancesWrapper.find('ExplorePerformances').length).toEqual(1)
  })

  it('contains a sign up banner at the bottom', () => {
    expect(performancesWrapper.find('Banner').length).toEqual(1)
  })
})
