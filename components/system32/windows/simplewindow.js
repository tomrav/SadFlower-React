import Image from "next/image";
import React, { useState } from "react";
import config from "@/src/config";
import { Rnd } from "react-rnd";
import styles from '@/styles/utils/style.module.sass'
import "98.css";
import "/styles/system32/windows/window.sass";

const Window = ({ articleData, closeWindow }) => {
    const [zIndex, setZIndex] = useState(1);

    const bringToFront = () => {
        setZIndex((prevZIndex) => prevZIndex + 1);
    };

    // Fonction pour générer une position aléatoire
    const getRandomPosition = () => {
        // Obtient la largeur et la hauteur de la fenêtre
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Obtient des coordonnées aléatoires à l'intérieur de l'écran
        const x = Math.floor(Math.random() * (windowWidth - 350)); // 350 est la largeur de la fenêtre
        const y = Math.floor(Math.random() * (windowHeight - 220)); // 220 est la hauteur de la fenêtre

        return { x, y };
    };

    return (
        <>
            <Rnd
                style={{
                    fontFamily: "Arial, sans-serif",
                    zIndex: zIndex,
                }}
                default={{
                    ...getRandomPosition(), // Utilise la fonction pour définir la position initiale
                    width: 350,
                    height: 220,
                }}
                minWidth={350}
                minHeight={380}
                className="window"
                onMouseDownCapture={bringToFront}
                onDragStart={bringToFront}
                onTouchStart={bringToFront}
            >
                <div className="title-bar">
                    <div className="title-bar-text">{articleData.attributes.Title}</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" onClick={closeWindow} onTouch={closeWindow} />
                    </div>
                </div>

                <div className="window-body">
                    <div className="fenetre-article">
                        {articleData && articleData.attributes && (
                            <>
                                <h2>{articleData.attributes.Title}</h2>
                                <hr />
                                <p>{articleData.attributes.Summary}</p>
                                <hr />
                                <p>{articleData.attributes.Content}</p>
                                <Image
                                    className={`${styles.stylepourdetails} mb-50`}
                                    src={`${config.api}${articleData.attributes.FeaturedImage.data.attributes.url}`}
                                    alt="6"
                                    width="1050"
                                    height="387" />
                            </>
                        )}
                    </div>
                </div>
                <div className="status-bar">
                    <p className="status-bar-field">{articleData.attributes.Category}</p>
                    <p className="status-bar-field">Slide 1</p>
                    <p className="status-bar-field">CPU Usage: 14%</p>
                </div>
            </Rnd>
        </>
    );
};

export default Window;
