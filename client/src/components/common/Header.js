import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav >
                <div className="nav-wrapper" style={{ backgroundColor: 'cornflowerblue' }}>
                    <a className="center brand-logo">
                        Farmobile
                    </a>
                </div>
            </nav>
        );
    }
}

export { Header };