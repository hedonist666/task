import React from 'react';
import rosneft_logo from './materials/rosneft_logo.svg'
import hexagon2 from './materials/hexagon-gradient-4.svg'
import hexagon1 from './materials/hexagon-gradient-2.1.svg'
import './App.css';

class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
            <div class="links">
                <img src={rosneft_logo} className="logo-img" alt="logo" />
                <img src={hexagon1} className="hexagon1" alt="hexagon" />
                <img src={hexagon2} className="hexagon2" alt="hexagon" />
                <a class="header-link" href="#" rel="noopener noreferrer">Главная</a>
                <a class="header-link" href="#" rel="noopener noreferrer">Организаторы</a>
                <a class="header-link" href="#" rel="noopener noreferrer">Правила</a>
                <a class="header-link" href="#" rel="noopener noreferrer">#ПульсМарафон</a>
                <a class="header-link" href="#" rel="noopener noreferrer" style={{paddingRight: '40px'}}>rn.digital</a>
            </div>
            </header>
        )
    }
}


function Button(props) {
    return (
        <button className="rect-btn">
            {props.text}
        </button>
    )
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Button text="test" />
            </div>
        )
    }
}

export default App
