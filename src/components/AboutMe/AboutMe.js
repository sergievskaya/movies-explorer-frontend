import React from "react";
import './AboutMe.css';
import studentPhoto from '../../images/student-photo.jpg'

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info-container">
                    <h3 className="about-me__name">Екатерина</h3>
                    <p className="about-me__job">Фронтенд-разработчик, 20 лет</p>
                    <p className="about-me__description">
                        Я родилась и живу в Новосибирске, закончила колледж Олимпийского резерерва. После окончания колледжа поняла,
                        что хочу сменить сферу деятельности. Решила, что хочу работать и развиваться в сфере IT и поступила
                        на курс веб-разработки в Яндекс.Практикум. Сейчас я активно развиваюсь в направлении веб-разработки, 
                        стараюсь большую часть времни посвящать программированию, чтобы стать востребованным специалистом.
                    </p>
                    <ul className="about-me__links">
                        <li>
                            <a className="about-me__link" href="https://github.com/sergievskaya" target="_blank" rel="noreferrer">Github</a>
                        </li>
                        <li>
                            <a className="about-me__link" href="https://t.me/fllow_ks" target="_blank" rel="noreferrer">Telegram</a>
                        </li>
                    </ul>
                </div>
                <img className="about-me__photo" src={studentPhoto} alt="Фотография студента"/>
            </div>
        </section>
    );
}

export default AboutMe;