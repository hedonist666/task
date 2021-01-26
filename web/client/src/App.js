import React from 'react';
import rosneft_logo from './materials/rosneft_logo.svg'
import hexagon2 from './materials/hexagon-gradient-4.svg'
import hexagon1 from './materials/hexagon-gradient-2.1.svg'
import './App.css';

class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
            <div className="links">
                <img src={rosneft_logo} className="logo-img" alt="logo" />
                <img src={hexagon1} className="hexagon1" alt="hexagon" />
                <img src={hexagon2} className="hexagon2" alt="hexagon" />
                <a className="header-link" href="#" rel="noopener noreferrer">Главная</a>
                <a className="header-link" href="#" rel="noopener noreferrer">Организаторы</a>
                <a className="header-link" href="#" rel="noopener noreferrer">Правила</a>
                <a className="header-link" href="#" rel="noopener noreferrer">#ПульсМарафон</a>
                <a className="header-link" href="#" rel="noopener noreferrer" style={{paddingRight: '40px'}}>rn.digital</a>
            </div>
            </header>
        )
    }
}

function News(props) {
    return (
        <div class="news-block">
            <div class="new-header">
                {props.header}
            </div>
            <div class="news-content">
                {props.content}
            </div>
            <a class="read-further" href={props.link}>
                Читать дальше
            </a>
        </div>
    )
}

class Marathon extends React.Component {
    render() {
        return (
            <div className="marathon">
                <div className="main-txt">
                    Марафон <br /> ИТ-соревнований
                </div>
                <div className="sub-txt">
                    Роснефть приглашает разработчиков и аналитиков принять участие в одном из трёх соревнований
                </div>
                <div class="news">
                    <div class="news-header">
                        #ПульсМарафон
                    </div>
                    <News 
                        header="Отложение высвобождает пегматитовый сталагмит"
                        content="Базис эрозии, основываясь большей частью на сейсмических данных, глобален. Эоловое засоление ослабляет комплекс.  Лагуна, так же, как и в других..."
                        link="#"
                    />
                    <News 
                        header="Плато смещает аллит, что, однако, не уничтожило доледниковую"
                        content="Пока магма остается в камере, углефикация сдвигает меловой мусковит. Вулканическое стекло, скажем, за 100 тысяч лет, сменяет глетчерный приток, причем, вероятно..."
                        link="#"
                    />
                    <a class="to-new" href="#">Ко всем новостям</a>
                </div>
                
            </div>
        )
    }
}



class App extends React.Component {
    render() {
        return (
            <div style={{height: '100%'}}>
                <Header />
                <Marathon />
            </div>
        )
    }
}

export default App
