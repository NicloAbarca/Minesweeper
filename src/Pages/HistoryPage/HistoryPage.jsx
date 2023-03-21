

import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import _ from 'lodash';

class HistoryPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }


    render() {
        const { users, user } = this.props;
        // Data
        let dataColumns = ['Start Time', 'End Time', 'Difficulty (No mines)', 'Total time spent (sec)', 'Status'];
        let matchedUsers = users && users.items ? users.items.filter(item => { return item.id === user.id; }) : [];
        let dataRows = matchedUsers.length ? matchedUsers[0].history : [];

        dataRows = _.sortBy(dataRows, ["mineCount", "timeSpent"])

        return (
            <div>
                <table className="table table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            {dataColumns.map(function (column, i) {
                                return <th key={i}>{column}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataRows.map((row, i) =>
                            <tr key={i}>
                                <td>{row.startDate}</td>
                                <td>{row.endDate}</td>
                                <td>{row.mineCount}</td>
                                <td>{row.timeSpent}</td>
                                <td>{row.hasWon ? 'WON' : 'LOSE'}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHistoryPage = connect(mapStateToProps)(HistoryPage);
export { connectedHistoryPage as HistoryPage };
