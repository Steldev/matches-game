import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"


const Game = props => {
    return <div id="game">Game Component</div>
};

Game.defaultProps = {
    firstTurn: PropTypes.bool.isRequired,
    setIsStarted: PropTypes.func.isRequired
};

export default Game;