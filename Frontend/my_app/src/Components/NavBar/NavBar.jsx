import React, { Component } from 'react';
import "./NavBar.css"

class NavBar extends Component {
    state = {}
    render() {
        return (
            <div className="navbar">
                <div className="nav logo">
                    <img src="image/logo.png" alt="" />
                </div>
                <div className="nav search">
                    <input type="text" placeholder="Search User" />
                </div>
                <div className="nav links">
                    <div className="home">
                        Home  
                    </div>
                    <div className="profile">
                        Profile
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;