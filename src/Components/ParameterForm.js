
import React from 'react';
import './ParameterForm.css';

export default class ParameterForm extends React.Component {

  render() {
    return (
      <div className="form-horizontal">
        <InputField id="sugar" label="How much sugar?" input_step="10" units="grams"/>
        <InputField id="honey" label="How much honey?" input_step="10" units="grams"/>
        <InputField id="honey-content" label="Content of sugar in honey" default_value="83" units="%"/>
        <InputField id="water" label="How much water?" units="litres"/>
      </div>
    );
  }
}

class InputField extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: 0};
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  static defaultProps = {
    "input_step": "any",
    "input_min": 0,
  }

  render() {
    return (
      <div className="form-group tight-bottom">
        <label htmlFor={this.props.id} className="col-sm-5 col-md-6 control-label">{this.props.label}</label>
        <div className="col-sm-5 col-md-6"><div className="input-group">
          <input id={this.props.id} type="number" step={this.props.input_step} min={this.props.input_min}
                 className="form-control input-sm" value={this.state.value} onChange={this.handleChange}></input>
          <span className="input-group-addon">{this.props.units}</span>
        </div></div>
      </div>
    );
  }
}

