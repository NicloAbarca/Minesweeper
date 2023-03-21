

import React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { userActions } from '../../actions';
import createStore from '../../store/create-store';
import { newGame, addUser } from '../../store/actions/app';
import App from '../../container-components/app';



const store = createStore();

class GamePage extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        store.dispatch(newGame());
        store.dispatch(addUser(this.props.user))
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleSaveGame(params) {
        userActions.saveGame(params)
    }

    render() {
        const { user } = this.props;
        return (
            <Provider store={store}>
                <App currentUser={user} handleSaveGame={this.handleSaveGame} />
            </Provider>
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

const connectedGamePage = connect(mapStateToProps)(GamePage);
export { connectedGamePage as GamePage };