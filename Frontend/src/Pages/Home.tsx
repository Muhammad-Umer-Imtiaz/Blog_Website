import React from 'react'
import Navbar from '../Components/Navbar.tsx'
import Header from '../Components/Header.tsx'
import BlogList from '../Components/BlogList.tsx'
import NewSletter from '../Components/NewSletter.tsx'
import Footer from '../Components/Footer.tsx'

const Home : React.FC  = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <BlogList/>
        <NewSletter/>
        <Footer/>
    </div>
  ) 
}

export default Home