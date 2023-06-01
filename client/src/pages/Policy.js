import React from 'react'
import Layouts from '../components/Layouts/Layouts'

const Policy = () => {
  return (
    <Layouts title={"Privacy Policy"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/contactus.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4" style={{textAlign:"justify"}}>
        <p>At our ecommerce watch store, we highly value your privacy and are committed to safeguarding your personal information. Our privacy policy ensures that any data collected from you is used responsibly and securely. When you browse our website or make a purchase, we may collect certain information such as your name, email address, shipping address, and payment details. Rest assured that we solely use this information to fulfill your orders, provide customer support, and enhance your shopping experience. We do not share your personal data with third parties for marketing purposes without your explicit consent. Additionally, we employ industry-standard security measures to protect your information from unauthorized access or disclosure. </p>
      </div>
    </div>
  </Layouts>
  )
}

export default Policy
