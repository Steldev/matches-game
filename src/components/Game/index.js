import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner, Image, Form, Button } from "react-bootstrap";
import styles from "./styles";
import bot, {MATCHES_COUNT, MATCHES_PER_TURN} from "../../bot";

// Задержка перед ходом компьютера (для вида)
const BOT_TIMEOUT = 500;

const Game = props => {
    const { firstTurn, setIsStarted } = props;

    // Чей ход
    const [userTurn, setUserTurn] = useState(firstTurn);
    // Количество спичек, которые остались на столе
    const [matchesLeft, setMatchesLeft] = useState(MATCHES_COUNT);
    // Количество спичек на руках у бота и игрока
    const [userHand, setUserHand] = useState(0);
    const [botHand, setBotHand] = useState(0);
    // Поле выбора количества спичек для хода
    const [currentInput, setCurrentInput] = useState(MATCHES_PER_TURN);
    const [inputError, setInputError] = useState("");
    // Логи игры
    const [gameLog, setGameLog] = useState([]);

    // Прекращение игры и ход бота
    useEffect(() => {
        if (!matchesLeft) {
            setGameLog(gameLog.concat(`Игра окончена. Игрок ${userHand % 2 ? 'проиграл' : 'победил'}`));
        }
        else if (!userTurn) {
            bot(matchesLeft, botHand)
                .then((turn) => {
                    setTimeout(() => {
                        setGameLog(gameLog.concat(`Компьютер взял ${turn} и теперь у него ${botHand + turn} спичек`));
                        setBotHand(botHand + turn);
                        setMatchesLeft(matchesLeft - turn);
                        setUserTurn(!userTurn);
                    }, BOT_TIMEOUT);
                })
                .catch((e) => setGameLog(gameLog.concat(e)));
        }
    },[userTurn]);

    // Ход игрока
    const confirmTurn = (turn) => {
        if (validate()) {
            setGameLog(gameLog.concat(`Игрок взял ${turn} и теперь у него ${userHand + turn} спичек`));
            setUserHand(userHand + turn);
            setMatchesLeft(matchesLeft - turn);
            setUserTurn(!userTurn);
        }

    };

    // Валидация поля выбора количества спичек
    const validate = () => {
        if (currentInput > MATCHES_PER_TURN || currentInput < 1 || currentInput > matchesLeft) {
            setInputError(`Количество спичек должно быть в диапазоне от 1 до ${MATCHES_PER_TURN < matchesLeft ? MATCHES_PER_TURN : matchesLeft}`);
            return false;
        }
        else setInputError("");
        return true;
    };

    // Создание массива спичек (визуальная часть приложения)
    const createMatchesArray = (left, total) => {
        let content = [];
        for (let i = 0; i < total; i++) {
            content.push(<div style={styles.match} className="match" key={i}>
                <Image fluid src={i < left ? "match.svg" : "match-2.svg"} />
            </div>)
        }
        content = <div style={styles.matches} className="d-flex justify-content-center matches">
            {content.map(e => e)}
        </div>;
        return content;
    };

    return <div id="game">
        <Button
            className="mt-2"
            variant="outline-secondary"
            onClick={() => setIsStarted(false)}
        >
            Вернуться
        </Button>
        {createMatchesArray(matchesLeft, MATCHES_COUNT)}
        {userTurn || !matchesLeft
            ?
            <Form id="matches-input" className="d-flex justify-content-center">
                <div style={styles.amountInput}>
                    <Form.Label>Колиичество спичек</Form.Label>
                    <Form.Control
                        disabled={!matchesLeft}
                        type="number"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value - 0)}
                        isInvalid={!!inputError}
                    />
                    <Form.Text className="text-danger">
                        {inputError}
                    </Form.Text>
                </div>
                <div style={styles.buttonContainer}>
                    <Button
                        disabled={!matchesLeft}
                        variant="outline-primary"
                        onClick={confirmTurn.bind(this, currentInput)}
                    >
                        Сделать ход
                    </Button>
                </div>
            </Form>
            :
            <Spinner className="mx-auto d-block" animation="border" role="status" />

        }
        <hr/>
        <div id="logs" className="text-center">
            <div className="logs-info-item"> Всего у компьютера: {botHand}</div>
            <div className="logs-info-item"> Всего у игрока: {userHand}</div>
            <div className="logs-info-item"> Осталось: {matchesLeft}</div>
            <hr/>
            {gameLog.map((e, i) => <div key={i}>{e}</div>)}
        </div>
    </div>
};

Game.defaultProps = {
    firstTurn: PropTypes.bool.isRequired,
    setIsStarted: PropTypes.func.isRequired
};

export default Game;