import React from "react";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import './Main.css';

function Main() {
    return (
        <main className="main">
            <Promo />
            <AboutProject />
        </main>
    );
}

export default Main;