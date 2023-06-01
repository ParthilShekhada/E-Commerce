import React from 'react'
import Layouts from '../components/Layouts/Layouts'
import { useAuth } from '../context/auth'


const HomePage = () => {
  const [auth,setAuth]=useAuth()
  return (
    <Layouts title={'Best Offers'}>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layouts>
  )
}

export default HomePage
