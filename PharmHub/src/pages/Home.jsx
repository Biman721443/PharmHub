import React from 'react'
import CategoryLinks from './Categories'
import HealthCare from './HelthCare'
import Sliding from './Sliding'
import HomeCare from './HomeCare'
import Medicine from './Medicine'
import AIRecommendations from './AIRecommendations'

const Home = () => {
  return (
    <div>
     <CategoryLinks/>
     <Sliding/>
     <HealthCare/>
     <HomeCare/>
     <Medicine/>
     <AIRecommendations/>
    </div>
  )
}

export default Home
