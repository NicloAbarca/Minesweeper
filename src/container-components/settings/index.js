import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as appActionCreators from '../../store/actions/app';
import Modal from '../../components/modal';
import './styles.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        rows: '',
        columns: '',
        mines: ''
      },
      minesValidation: false,
      cellsValidation: false,
      submitted: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeCustom = this.handleChangeCustom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCustom(event) {
    const { name, value } = event.target;
    const { settings } = this.state;
    this.setState({
      settings: {
        ...settings,
        [name]: value
      }
    });
  }

  handleSubmit() {
    const { settings } = this.state
    this.setState({
      submitted: true
    });
    if (settings.rows && settings.columns && settings.mines && this.validateCustomSettings()) {

      this.props.appActions.updateDifficulty('custom', this.state.settings);
      this.props.onClose();
    }
  }

  validateCustomSettings() {
    const { settings } = this.state
    let cells = parseInt(settings.rows) * parseInt(settings.columns);
    let cellsValidation = cells < 2;
    let minesValidation = cells < parseInt(settings.mines);
    this.setState({
      cellsValidation: cellsValidation,
      minesValidation: minesValidation
    })
    return !cellsValidation && !minesValidation
  }

  handleChange(difficulty) {
    this.setState({
      settings: {
        rows: '',
        columns: '',
        mines: ''
      }
    })
    this.props.appActions.updateDifficulty(difficulty);
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    const { settings, submitted, minesValidation, cellsValidation } = this.state;
    return (
      <Modal name="modal__settings">
        {this.props.isOpen &&
          <div className="settings">
            <h2>Settings</h2>
            <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="1">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle>Custom</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <div className="settings__section settings__difficulty">
                    <h3>Custom</h3>

                    <div className={'form-group' + (submitted && !settings.rows ? ' has-error' : '')}>
                      <label htmlFor="rows">Rows</label>
                      <input type="number" min="1" className="form-control" name="rows" value={settings.rows} onChange={this.handleChangeCustom} />
                      {submitted && !settings.rows &&
                        <div className="help-block">Rows is required</div>
                      }
                    </div>
                    <div className={'form-group' + (submitted && !settings.columns ? ' has-error' : '')}>
                      <label htmlFor="columns">Columns</label>
                      <input type="number" min="1" className="form-control" name="columns" value={settings.columns} onChange={this.handleChangeCustom} />
                      {submitted && !settings.columns &&
                        <div className="help-block">Columns is required</div>
                      }
                    </div>
                    <div className={'form-group' + (submitted && !settings.mines ? ' has-error' : '')}>
                      <label htmlFor="mines">Mines</label>
                      <input type="number" min="1" className="form-control" name="mines" value={settings.mines} onChange={this.handleChangeCustom} />
                      {submitted && !settings.mines &&
                        <div className="help-block">Mines is required</div>
                      }
                    </div>
                    {cellsValidation &&
                      <div className="alert alert-danger">The number of cells must be greater than one</div>
                    }
                    {minesValidation &&
                      <div className="alert alert-danger">The number of mines must be less than the number of cells</div>
                    }
                    <div className="form-group">
                      <button onClick={this.handleSubmit} className="btn btn-primary">Done</button>
                    </div>

                  </div>
                </Panel.Body>
              </Panel>
              <Panel eventKey="2">
                <Panel.Heading>
                  <Panel.Title toggle>Difficulty</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <div className="settings__section settings__difficulty">
                    <h3>Difficulty</h3>
                    {['easy', 'medium', 'hard'].map((difficulty, idx) => {
                      return (
                        <label key={idx}>
                          <input
                            type="radio"
                            name="difficulty"
                            onChange={() => this.handleChange(difficulty)}
                            checked={difficulty === this.props.difficulty}
                          />
                          {difficulty}
                        </label>
                      );
                    })}
                    <button className="btn btn-primary" onClick={this.handleClose}>
                      Done
                    </button>
                  </div>
                </Panel.Body>
              </Panel>
            </PanelGroup>
          </div>}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    difficulty: state.get('difficulty')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActionCreators, dispatch)
  };
}

Settings.propTypes = {
  difficulty: PropTypes.string,
  appActions: PropTypes.object,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool
};

Settings.defaultProps = {
  onClose() { }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
