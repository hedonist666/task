import React from 'react';
import rosneft_logo from './materials/rosneft_logo.svg';
import hexagon2 from './materials/hexagon-gradient-4.svg';
import hexagon1 from './materials/hexagon-gradient-2.1.svg';
import year_image from './materials/Vector.svg';
import big_hexagon from './materials/Hexagon-Vector.svg';
import little_hexagon from './materials/Little-hexagon.svg';
import three_lines from './materials/Three-lines.svg';
import marathon_back from './materials/Marathon-back.svg';
import vk_logo from './materials/Vk-logo.svg';
import facebook_logo from './materials/Facebook-logo.svg';
import instagram_logo from './materials/Instagram-logo.svg';
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
            <div class="news-header">
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
                <div className="marathon-logo">
                    <div className="main-txt">
                        Марафон <br /> ИТ-соревнований
                    </div>
                    <img className="year-img" src={year_image} alt="2020" />
                    <img className="big-hexagon" src={big_hexagon} alt="hexagon" />
                    <img className="three-lines" src={three_lines} alt="3 lines" />
                    <img className="little-hexagon" src={little_hexagon} alt="hexagon" />
                    <div className="sub-txt">
                        Роснефть приглашает разработчиков и аналитиков принять участие в одном из трёх соревнований
                    </div>
                </div>
                <img className="marathon-back" src={marathon_back} alt="hexagon" />
                <div className="news">
                    <div className="news-main-header">
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
                    <a className="to-all-news" href="#">Ко всем новостям</a>
                    <div className="contacts">
                        <p>По всем вопросам: </p>
                        <a className="mail-link" href="#">rd.knpk@bnipi.rosneft.ru</a>
                    </div>
                    <div className="social-media">
                        <a className="social-link" href="#"><img className="social-logo" src={vk_logo} alt="vk" /></a>
                        <a className="social-link" href="#"><img className="social-logo" src={facebook_logo} alt="facebook" /></a>
                        <a className="social-link" href="#"><img className="social-logo" src={instagram_logo} alt="instagram" /></a>
                    </div>
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
