import React from 'react';
import '../App.css';
import logo from '../assets/images/wiener_logo.png'
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    return (
        <nav className="row d-flex justify-content-space-between bg-info p-4">
            <Link to='/' className="col d-flex align-items-center gap-1">
                <img src={ logo } alt="Wienner Insurance" />
                <span className='fw-bold text-danger'>Wienner Insurance</span>
            </Link>
            <div className="col d-flex align-items-center justify-content-end gap-2 m-2">
                <Link to='/' className='text-decoration-none text-danger p-1 bg-dark'>Home</Link>
                <a href='' className='text-decoration-none text-danger p-1 '>About</a>
                <a href='' className='text-decoration-none text-danger p-1'>Service</a>
                <a href='' className='text-decoration-none text-danger p-1'>Contact</a>                
            </div>
        </nav>
    );
};

export default Navbar;
