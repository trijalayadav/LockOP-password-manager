import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-200'>
            <div className="mycontainer flex justify-between items-center px-4 h-14">
                <div className="logo font-bold">
                    <span className='text-green-500'>&lt;</span>
                    <span>Lock</span>
                    <span className='text-green-500'>/OP&gt;</span>
                </div>
                <ul>
                    <li className='flex gap-3'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="/">About</a>
                        <a className='hover:font-bold' href="/">Contact Us</a>
                    </li>
                </ul>
                <button className='git w-8'><a href="https://github.com/trijalayadav/password-manager.git" target='_blank'><img src="icons/github.png" alt="github logo" /></a></button>
            </div>
        </nav>
    )
}

export default Navbar
