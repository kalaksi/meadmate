
import React from 'react';
import './ParameterForm.css';

export default class ParameterForm extends React.Component {
  render() {
    return (
      <div className="form-horizontal">
        <InputField id="sugar" label="How much sugar?" input_step="10" units="grams" value={this.props.sugar}/>
        <InputField id="honey" label="How much honey?" input_step="10" units="grams" value={this.props.honey}/>
        <InputField id="honeycontent" label="Content of sugar in honey" units="%" value={this.props.honeycontent}/>
        <InputField id="water" label="How much water?" units="litres" value={this.props.water}/>
      </div>
    );
  }
}

class InputField extends React.Component {
  static defaultProps = {
    input_step: "any",
    input_min: 0,
  }

  render() {
    return (
      <div className="form-row tight-bottom">
        <label htmlFor={this.props.id} className="col-form-label col-xs-12 col-sm-5 col-md-6">{this.props.label}</label>
        <div className="col-xs-12 col-sm-5 col-md-6">
          <div className="input-group">
            <input id={this.props.id} type="number" step={this.props.input_step} min={this.props.input_min}
                   className="form-control input-sm" value={this.props.value}></input>
            <div className="input-group-append">
              <span className="input-group-text">{this.props.units}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

