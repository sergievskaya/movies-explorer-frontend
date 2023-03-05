import React from "react";
import './AboutMe.css';
import studentPhoto from '../../images/student-photo.jpg'

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info-container">
                    <h3 className="about-me__name">Виталий</h3>
                    <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__description">
                    Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал 
                    в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами 
                    и ушёл с постоянной работы.
                    </p>
                    <ul className="about-me__links">
                        <li>
                            <a className="about-me__link" href="#about-project">Github</a>
                        </li>
                        <li>
                            <a className="about-me__link" href="#about-project">Telegram</a>
                        </li>
                    </ul>
                </div>
                <img className="about-me__photo" src={studentPhoto} alt="Фотография студента" />
            </div>
        </section>
    );
}

export default AboutMe;