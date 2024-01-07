import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

import axios from 'axios';
import TypeIt from "typeit-react";
import GitHubCalendar from 'react-github-calendar';

import dotenv from 'dotenv';
require('dotenv').config();
console.log('Clé API OpenAI:', process.env.OPENAI_KEY);
console.log('Chargement dotenv réussi');

import "98.css";
import "/styles/system32/windows/window.sass";
import "/styles/system32/windows/whoami.sass";


const Whoami = ({ closeWindow, onClick, zIndex }) => {
    const isMobileScreen = () => window.innerWidth <= 600;

    const getRandomPosition = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const x = Math.floor(Math.random() * (windowWidth - 350));
        const y = Math.floor(Math.random() * (windowHeight - 220));

        return { x, y };
    };

    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');

    const handleCommand = async () => {
        try {
            console.log('Clé API OpenAI après handlecommand:', process.env.OPENAI_KEY);
            const apiKey = process.env.OPENAI_KEY;
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            const messages = [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: input },
            ];

            const apiResponse = await axios.post(apiUrl, {
                messages,
                max_tokens: 100,
                model: 'gpt-3.5-turbo',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            const gpt3Response = apiResponse.data.choices[0]?.message?.content;

            setOutput(gpt3Response);
        } catch (error) {
            console.error('Erreur lors de la requête à l\'API GPT-3 :', error.message);
            console.error('Réponse détaillée de l\'API:', error.response.data);
        }
    };

    return (
        <>
            <Rnd
                style={{
                    fontFamily: 'Arial, sans-serif',
                    zIndex: zIndex,
                }}
                default={{
                    ...getRandomPosition(),
                    width: 350,
                    height: 220,
                }}
                minWidth={350}
                minHeight={380}
                className="window"
                onClick={onClick}
                position={isMobileScreen()}
                disableDragging={isMobileScreen()}
            >
                <div className="title-bar">
                    <div className="title-bar-text">WhoAmI</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" onClick={closeWindow} onTouch={closeWindow} />
                    </div>
                </div>

                <div className="window-body">


                    <GitHubCalendar username="EnioSAF" year={2024} />

                    <div className="command-section">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter your command..."
                        />
                        <button onClick={handleCommand}>Send Command</button>
                    </div>

                    <div className="output-section">
                        <p>Output:</p>
                        <img src='/Gif/EnioHead.gif'></img><p>{output}</p>
                    </div>


                </div>

                <div className="status-bar">
                    <p className="status-bar-field">AboutMe</p>
                    <p className="status-bar-field">Slide 1</p>
                    <p className="status-bar-field">CPU Usage: 14%</p>
                </div>
            </Rnd>
        </>
    );
};

export default Whoami;