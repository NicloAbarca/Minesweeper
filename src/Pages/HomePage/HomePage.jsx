

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                rows: '',
                columns: '',
                mines: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { settings } = this.state;
        this.setState({
            settings: {
                ...settings,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { settings } = this.state;
        const { dispatch } = this.props;
        if (settings.rows && settings.columns && settings.mines) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { settings, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !settings.rows ? ' has-error' : '')}>
                        <label htmlFor="rows">Rows</label>
                        <input type="number" min="1" className="form-control" name="rows" value={settings.rows} onChange={this.handleChange} />
                        {submitted && !settings.rows &&
                            <div className="help-block">Rows is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !settings.columns ? ' has-error' : '')}>
                        <label htmlFor="columns">Columns</label>
                        <input type="number" min="1" className="form-control" name="columns" value={settings.columns} onChange={this.handleChange} />
                        {submitted && !settings.columns &&
                            <div className="help-block">Columns is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !settings.mines ? ' has-error' : '')}>
                        <label htmlFor="mines">Mines</label>
                        <input type="number" min="1" className="form-control" name="mines" value={settings.mines} onChange={this.handleChange} />
                        {submitted && !settings.mines &&
                            <div className="help-block">Mines is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/game" className="btn btn-link">Let's Go</Link>
                    </div>
                </form>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}


const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };