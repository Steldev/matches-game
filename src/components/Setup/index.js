import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"


const Setup = props => {
    return <div id="setup">Setup Component</div>
};

Setup.defaultProps = {
    confirmFirstTurn: PropTypes.func.isRequired,
    setIsStarted: PropTypes.func.isRequired
};

export default Setup;