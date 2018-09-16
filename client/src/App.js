import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-plotly.js';
import ExpressionTable from './ExpressionTable';
import ExpressionBoxplot from './ExpressionBoxplot';


function formatBoxplotData(data){
    const tissues = Array.from(new Set(data.map((d) => d.tissue))).sort();
    const bp = new Map(tissues.map((d) => [d, []]));
    let data_ft = []

    data.map((ele)=>{
        bp.get(ele.tissue).push(ele.expression);
    })
    bp.forEach((value, key)=>{
        data_ft.push({name:key, y:value, type:'box'})
    })
    return data_ft;

}

class App extends Component {
    constructor(props) {
        super()
        this.state = {stats: [], geo: [], gtex: []}
    }

    loadExpressionData(gene) {
        fetch(`/expressiondata/${gene}`)
            .then(function (response) {
                return response.json();
            })
            .then(({geo,gtex}) => {
                const geo_ft = formatBoxplotData(geo);
                const gtex_ft = formatBoxplotData(gtex);
                this.setState({geo:geo_ft,gtex: gtex_ft})
            });
    }

    componentDidMount() {
        fetch('/statisticstable')
            .then(function (response) {
                return response.json();
            })
            .then( (stats) => {
               this.setState({stats})
            })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">expression analysis</h1>
                </header>
                <div>
                    <div className='plot'>
                        <ExpressionBoxplot data={this.state.geo}
                                           layout={{width: '50%', height: 500, title: 'GEO data'}}/>
                    </div>
                    <div className='plot'>
                        <ExpressionBoxplot data={this.state.gtex}
                                           layout={{width: '50%', height: 500, title: 'GTEX data'}}/>
                    </div>
                </div>
                <div>
                    <ExpressionTable handleRowClick={(gene) => this.loadExpressionData(gene)} data={this.state.stats}/>
                </div>
            </div>
        );
    }
}

export default App;
