import React from 'react';
import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link
} from "react-router-dom";
import axios from 'axios';

import rosneft_logo from './materials/Header/rosneft_logo.svg';
import hexagon2 from './materials/Header/hexagon-gradient-4.svg';
import hexagon1 from './materials/Header/hexagon-gradient-2.1.svg';
import menu from './materials/Header/menu.svg'
import close from './materials/Header/close.svg'
import lang from './materials/Header/lang.svg'

import year_image from './materials/Marathon/Vector.svg';
import big_hexagon from './materials/Marathon/Hexagon-Vector.svg';
import little_hexagon from './materials/Marathon/Little-hexagon.svg';
import three_lines from './materials/Marathon/Three-lines.svg';
import marathon_back from './materials/Marathon/Marathon-back.svg';
import vk_logo from './materials/Marathon/Vk-logo.svg';
import facebook_logo from './materials/Marathon/Facebook-logo.svg';
import instagram_logo from './materials/Marathon/Instagram-logo.svg';

import date_img from './materials/Annonces/date.svg'
import award_img from './materials/Annonces/award.svg'
import place_img from './materials/Annonces/place.svg'
import hexagon_gradient1 from './materials/Annonces/background-image-1.svg'
import hexagon_gradient2 from './materials/Annonces/background-image-2.svg'

import print1 from './materials/print-1.svg'
import print2 from './materials/print-2.svg'
import print3 from './materials/print-3.svg'

import './App.css';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {menu: true}
    }

    render() {
        return (
            <div>
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
                <div 
                    className="burger-menu"
                    onClick={(event) => {
                        if (this.state.menu) {
                            document.getElementById('mobile-menu').style.display = 'flex'
                            document.querySelector('.main-header').style.border = 'none'
                        }
                        else {
                            document.getElementById('mobile-menu').style.display = 'none'
                            document.querySelector('.main-header').style.borderBottom = '1px solid #d3d2d2'
                        }
                        this.setState(state => ({menu: !state.menu}))
                    }} 
                >
                    <img src={this.state.menu && menu || close} alt="menu" />  
                </div>
            </div>
            </header>
            <div style={{
                width: '100%',
                height: '80px'
            }}></div>
            <div id="mobile-menu">
                <img className="little-hexagon-menu" src={little_hexagon} alt="hexagon" />
                <a className="header-link-mobile" href="#" rel="noopener noreferrer">Главная</a>
                <a className="header-link-mobile" href="#" rel="noopener noreferrer">Организаторы</a>
                <a className="header-link-mobile" href="#" rel="noopener noreferrer">Правила</a>
                <a className="header-link-mobile" href="#" rel="noopener noreferrer">#ПульсМарафон</a>
                <a className="header-link-mobile" href="#" rel="noopener noreferrer" style={{
                    marginTop: '0',
                    marginBottom: '23px',
                    padding: '24px',
                    borderBottom: '1px solid rgba(35, 31, 32, 0.2)'
                }}>rn.digital</a>
                <a className="header-link-mobile" href="#" rel="noopener noreferrer">Рейтинг</a>
            <a href="#" className="lang"><img src={lang} alt="language" style={{marginRight: '5px'}} />ENG</a>
                <div className="contacts">
                    <p>По всем вопросам: </p>
                    <a className="mail-link" href="#">rd.knpk@bnipi.rosneft.ru</a>
                </div>
                <div className="social-media">
                    <a className="social-link" href="#"><img className="social-logo" src={vk_logo} alt="vk" /></a>
                    <a className="social-link" href="#"><img className="social-logo" src={facebook_logo} alt="facebook" /></a>
                    <a className="social-link" href="#"><img className="social-logo" src={instagram_logo} alt="instagram" /></a>
                </div>
                <img className="marathon-back-menu" src={marathon_back} alt="hexagon" />
            </div>
            </div>
        )
    }
}

function News(props) {
    return (
        <div className="news-block">
            <div className="news-header">
                {props.header}
            </div>
            <div className="news-content">
                {props.content}
            </div>
            <a className="read-further" href={props.link}>
                Читать дальше
            </a>
        </div>
    )
}

function Marathon() {
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
                    <GradientButton
                        className="to-all-news"
                        background="rgba(255, 255, 255, 0)"
                        finalBackground="#FFD200"
                        text="Ко всем новостям"
                    />
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

class GradientButton extends React.Component {
    constructor(props) {
        super(props)
        this.background = props.background
        this.finalBackground = props.finalBackground
        this.text = props.text
        this.state = {degs: 0}
        this.className = props.className
        this.intId = 0
    }

    componentWillUnmount() {
        if (this.intId !== 0) {
            clearInterval(this.intId)
            this.intId = 0
        }
    }

    startGradient() {
        if (this.intId !== 0) {
            clearInterval(this.intId)
            this.intId = 0
        }
        this.intId = setInterval(() => {
            //console.log("start gradient: ", this.state)
            if (this.state.degs < 100) {
                this.setState(state => ({
                    degs: state.degs + 2
                }))
            }
            else {
                clearInterval(this.intId)
                this.intId = 0
            }
        }, 1)
    }

    stopGradient() {
        if (this.intId !== 0) {
            clearInterval(this.intId)
            this.intId = 0
        } 
        this.intId = setInterval(() => {
            //console.log("stop gradient: ", this.state)
            if (this.state.degs > 0) {
                this.setState(state => ({
                    degs: state.degs - 2
                }))
            }
            else {
                clearInterval(this.intId)
                this.intId = 0
            }
        }, 1)
    }
    
    render() {
        let back;
        if (this.state.degs !== 0) {
            back = `linear-gradient(90deg, ${this.finalBackground} ${this.state.degs}%, ${this.background} 100%)`
        }
        else {
            back = 'none'
        }
        return(
            <a className={this.className} href="#" 
            style={
                { background: back}
            }
            onMouseOver = {(event) => {
                this.startGradient();
            }}
            onMouseLeave = {(event) => {
                this.stopGradient();
                event.target.style.border = '2px solid rgba(35, 31, 32, 0.2)';
            }}
            onClick = {(event) => {
                event.preventDefault()
                event.target.style.border = '2px solid black'
            }}
            >{this.text}</a>
        )
    }
}

class WidthHandler extends React.Component {
    constructor(props) {
        super(props)
        this.text = props.text
        this.state = {first: props.text, second: ''}
    }
    update() {
        if (document.querySelector('.challenge-info').getBoundingClientRect().width <= 220) {
            this.setState(() => {
                let i = /[0-9]/.exec(this.text).index
                return {
                    first: this.text.slice(0, i),
                    second: this.text.slice(i)
                }
            })
        } 
        else {
            this.setState(() => ({
                first: this.text,
                second: ''
            }))
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.update.bind(this));
        this.update()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.update.bind(this));
    }
    render() {
        return(
            <div>
                {this.state.first} <br /> {this.state.second}
            </div>
        ) 
    }
}

function Annonce(props) {
    return(
        <div className="annonce-block">
            <img className="challenge-background" src={require("./materials/Annonces/" + props.background).default} alt="background" />
            <div className="break"></div>
            <img className="challenge-logo" src={require("./materials/Annonces/" + props.logo).default} alt="logo" />
            <img className="logo-background" src={require('./materials/Annonces/' + props.logoBackground).default} alt="hexagon" />
            <div className="challenge-description">
                <p className="challenge-tittle">{props.tittle}</p>
                <p className="challenge-subtittle">{props.subtittle}</p>
                <table className="challenge-info">
                    <tr>
                        <td>
                            <img className="info-item" src={date_img} alt="date" />
                        </td>
                        <td className="capture-item">
                            {props.date}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className="info-item" src={place_img} alt="date" />
                        </td>
                        <td className="capture-item">
                            {props.place}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className="info-item" src={award_img} alt="date" />
                        </td>
                        <td className="capture-item">
                            <WidthHandler
                                text={props.award}
                            />
                        </td>
                    </tr>
                </table>
                <GradientButton 
                    className='details'
                    background='rgba(255, 255, 255, 0)' 
                    finalBackground='#ffffff'
                    text='Подробнее'
                />
            </div>
        </div>
    )
}


function MainPage() {

    let annoncesInfo = [
        {
            tittle: 'Хакатон трёх городов',
            subtittle: 'Хакатон для молодых аналитиков и разработчиков. Постройте оптимальный путь по сложной поверхности',
            date: '24–25 сентября',
            place: 'Уфа, Самара и Казань',
            award: 'Призовой фонд — 289 000 ₽'
        },

        {
            tittle: 'Хакатон по робототехнике',
            subtittle: 'Хакатон для программистов-робототехников. Разработайте роботизированное решение для выполнения производственной операции',
            date: '16–17 октября',
            place: 'Уфа',
            award: 'Призовой фонд — 139 000 ₽'
        },

        {
            tittle: 'Rosneft Proppant Check Challenge',
            subtittle: 'Международные IT-соревнования в области ML. Определите размер зёрен пропанта по фотографии',
            date: 'Сентябрь–ноябрь, финал — 28 ноября',
            place: 'Москва', 
            award: 'Призовой фонд — 1 142 000 ₽'
        }
    ]

    let annoncesList = Array.from(Array(annoncesInfo.length).keys()).map(i => 
            <Annonce
                key={i}
                logo={`challenge-logo-${i + 1}.svg`}
                logoBackground={`hexagon-gradient-${i + 1}.svg`}
                tittle={annoncesInfo[i].tittle}
                subtittle={annoncesInfo[i].subtittle}
                date={annoncesInfo[i].date}
                place={annoncesInfo[i].place}
                award={annoncesInfo[i].award}
                background={`background-${i + 1}.svg`}
            />
    )
    return (
        <div style={{height: '100%', position: 'relative'}}>
            <Header />
            <img className="print-1" src={print1} alt="vector" />
            <img className="print-2" src={print2} alt="vector" />
            <img className="print-3" src={print3} alt="vector" />
            <div className="content" style={{verticalAlign: 'top', display: 'flex', height: '100%'}}>
                <Marathon />
                <div className="annonces-list">
                    <img className="hexagon-gradient-1" src={hexagon_gradient1} alt="" />
                    <img className="hexagon-gradient-2" src={hexagon_gradient2} alt="" />
                    { annoncesList }
                </div>
            </div>
        </div>
    )
}

function Test() {
    let onSubmit = (event) => {
        event.preventDefault()
        let formData = new FormData()
        formData.append('payload', event.target[0].files[0])
        formData.append('idx', 0);
        axios.post('/upload', formData , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200) alert(JSON.stringify(res.data))
            else alert(JSON.stringify(res))
        }).catch(alert)
    }
    return(
        <div style={{
            display: 'flex',
            marginTop: '30vh',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
        <form enctype="multipart/form-data" onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column'}}>
            <p style={{marginBottom: '20px'}}>Прикрептие файл для получения результатов метрик</p>
            <label style={{marginBottom: '20px'}}>
                Файл: 
                    <input type="file" name="payload" />
            </label>
            <input type="submit" value="отправить" />
        </form>
        </div>
    )
}

export default function App() {
    return(
        <Router>
          <div>
            <Switch>
              <Route path="/test">
                <Test />
              </Route>
              <Route path="/app">
                <MainPage />
              </Route>
              <Route path="/">
                <nav>
                  <ul>
                    <li>
                      <Link to="/app" onClick={(event) => {event.target.parentNode.parentNode.style.display = 'none'}}>Frontend task</Link>
                    </li>
                    <li>
                      <Link to="/test" onClick={(event) => {event.target.parentNode.parentNode.style.display = 'none'}}>Metrics test</Link>
                    </li>
                  </ul>
                </nav>
              </Route> 
            </Switch>
          </div>
        </Router>
    )
}
