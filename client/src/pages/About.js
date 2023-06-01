import React from 'react'
import Layouts from '../components/Layouts/Layouts'

const About = () => {
  return (
    <Layouts title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2" style={{ textAlign: "justify" }}>
            Welcome to our ecommerce watch store, where time meets style and elegance! We are passionate about helping you find the perfect timepiece that reflects your unique personality and enhances your everyday life.

            At our store, we curate a diverse collection of watches from renowned brands, each handpicked for its exceptional quality, craftsmanship, and design. Whether you're searching for a classic dress watch, a rugged sports watch, or a trendy fashion statement, we have something for everyone.
            
          </p>
        </div>
      </div>
    </Layouts>
  )
}

export default About
