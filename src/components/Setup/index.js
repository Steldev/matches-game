import React, { useState } from "react"
import PropTypes from "prop-types"
import { Form, Image, Button, Col } from "react-bootstrap"
import styles from "./styles";

const Setup = props => {
    // Первый ход игрока
    const [firstTurn, setFirstTurn] = useState(true);

    const confirm = () => {
        props.confirmFirstTurn(firstTurn);
        props.setIsStarted(true);
    };

    return <Col id="setup" style={styles.setup} xs={12} md={9} lg={6}>
        <div id="image" style={styles.image}>
            <Image fluid id="image" src="matches.svg" />
            <h3 className="mt-2">Игра в спички</h3>
        </div>
        <div id="description" className="text-center mb-4">
            Игрок играет в игру против компьютера. Из кучки, где имеется 25 спичек, каждый берёт себе по очереди одну, две или три спички. Выигрывает тот, у кого в конце игры – после того, как все спички будут разобраны, – окажется четное число спичек.
        </div>
        <div id="first-turn-check" className="d-flex justify-content-center px-auto">
            <Form.Check
                type="checkbox"
                label="Первый ход игрока"
                checked={firstTurn}
                onChange={() => setFirstTurn(!firstTurn)}
            />
        </div>
        <Button
            id="confirm-button"
            style={styles.button}
            variant="outline-primary"
            type="button"
            onClick={confirm}>
            Играть
        </Button>
    </Col>
};

Setup.defaultProps = {
    confirmFirstTurn: PropTypes.func.isRequired,
    setIsStarted: PropTypes.func.isRequired
};

export default Setup;