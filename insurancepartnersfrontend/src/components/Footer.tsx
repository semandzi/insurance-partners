import React from 'react';
import '../App.css';

const Footer: React.FC = () => {
    return (        
        <footer className="row align-self-center bg-warning  w-100 mt-auto">
            <p>© 2024 Wienner Insurance. All rights reserved.</p>
            <div className="d-flex justify-content-center gap-5">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#contact">Contact Us</a>
            </div>
        </footer>
    );
};
export default Footer;
