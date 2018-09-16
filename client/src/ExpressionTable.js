import ReactTable from 'react-table'
import React, {Component} from 'react';
import 'react-table/react-table.css'


const columns = [{
    Header: 'symbol',
    accessor: 'symbol' // String-based value accessors!
}, {
    Header: 'targetclass',
    accessor: 'targetclass'
}, {
    id: 'zscore_prostate',
    Header: 'zscore prostate', // Required because our accessor is not a string
    accessor: d => d.zscore_prostate.toFixed(2)

}, {
    id: 'zscore_kidney',
    Header: 'zscore kidney', // Required because our accessor is not a string
    accessor: d => d.zscore_kidney.toFixed(2)

}, {
    id: 'zscore_liver',
    Header: 'zscore prostate', // Required because our accessor is not a string
    accessor: d => d.zscore_prostate.toFixed(2)

}, {
    id: 'zscore_salgland',
    Header: 'zscore salivary gland', // Required because our accessor is not a string
    accessor: d => d.zscore_salgland.toFixed(2)

}];

class ExpressionTable extends Component {
    constructor(props) {
        super()
        this.state = {}
    }

    handleRowClick(row) {
        this.props.handleRowClick(row['symbol']);
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.data}
                    columns={columns}
                    getTrProps={(e, rowInfo) => {
                        return {
                            onClick: (e) => {
                                this.handleRowClick(rowInfo.row)

                            }
                        }

                    }}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default ExpressionTable;




