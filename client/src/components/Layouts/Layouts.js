import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet"
import toast, { Toaster } from 'react-hot-toast';


const Layouts = ({ children, title, description, keyword, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '70vh' }}> 
      <Toaster />{children}
      </main>
      <Footer />

    </div>
  )
}

export default Layouts
