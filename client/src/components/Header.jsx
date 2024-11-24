import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <ul className='flex gap-4'>
                <li><Link to={"/create"}>create</Link></li>
                <li><Link to={"/dashboard"}>Feed</Link></li>
                <li><Link to={"/profile"}>Profile</Link></li>
            </ul>
        </div>
    )
}

export default Header;