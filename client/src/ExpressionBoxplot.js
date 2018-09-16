import Plot from "react-plotly.js";
import React, {Component} from 'react';

class ExpressionBoxplot extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <Plot
                data={this.props.data}
                layout={this.props.layout}
            />
        )
    }
}

export default ExpressionBoxplot;
