import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Setup from "./Setup";
import Game from "./Game";

const App = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [firstTurn, setFirstTurn] = useState(true);

    return <Container className="d-flex justify-content-center">
        {!isStarted
            ?
            <Setup
                confirmFirstTurn={setFirstTurn}
                setIsStarted={setIsStarted}
            />
            :
            <Game
                firstTurn={firstTurn}
                setIsStarted={setIsStarted}
            />
        }
    </Container>
};

export default App;