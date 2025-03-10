import { useState } from 'react'
import reactLogo from './assets/react.svg'
import favicon from "/favicon.png"
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="min-h-[83vh]">
          {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <Manager />
          </div> */}
          <div className="relative h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <Manager />
          </div>

        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
