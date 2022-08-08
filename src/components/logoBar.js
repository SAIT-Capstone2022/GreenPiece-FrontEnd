import React, { Component } from 'react';
import GPbarlogo from '../images/logo.jpg';


export default class logoBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark shadow-lg bg-gradient">
                <div className="container-fluid justify-content-center">
                    <img src={GPbarlogo} width="150px" alt="Logo" />
                </div>
            </nav>
        );
    }
}

