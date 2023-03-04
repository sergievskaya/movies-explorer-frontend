import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container">
                <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
                <p className="about-project__info-text">
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>
                <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__info-text">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </p>
            </div>
            <div className="about-project__diagram">
                <p className="about-project__diagram-time">1 неделя</p>
                <p className="about-project__diagram-time about-project__diagram-time_frontend">4 недели</p>
                <h4 className="about-project__diagram-description">Back-end</h4>
                <h4 className="about-project__diagram-description">Front-end</h4>
            </div>
        </section>
    );
}

export default AboutProject;