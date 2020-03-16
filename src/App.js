import React from 'react';
import './index.css';
import ParameterForm from './Components/ParameterForm';
import EquationCanvas from './Components/EquationCanvas';
import { ferment, rate_my_mead } from './ferment';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parameters: {
        sugar: "0",
        honey: "0",
        honeycontent: "83",
        water: "0",
      },
    };

    // Fill in the rest of the state ("result" and "equation") using the parameter fields.
    this.state = this.calculateFullState(this.state.parameters);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div id="content" className="container-fluid fill">
        <div id="header" className="row page-header p-5">
          <HeaderText/>
        </div>
        <div className="row">
          <div id="parameters" className="col-xs-12 col-sm-5 col-md-4" onChange={this.handleChange}>
            <ParameterForm sugar={this.state.parameters.sugar}
                           honey={this.state.parameters.honey}
                           honeycontent={this.state.parameters.honeycontent}
                           water={this.state.parameters.water} />
          </div>
          <div id="equation" className="col-xs-12 col-sm-7 col-md-8">
            <EquationCanvas water={this.state.equation.water}
                            sucrose={this.state.equation.sucrose}
                            ethanol={this.state.equation.ethanol}
                            carbon_dioxide={this.state.equation.carbon_dioxide} />
          </div>
        </div>
        <div id="result" className="row mt-4">
          <ResultBox message={this.state.result.message} status={this.state.result.status} percentage={this.state.result.percentage}/>
        </div>
        <div id="references" className="row mt-4">
          <References/>
        </div>
      </div>
    );
  }

  handleChange(event) {
    let newParameters = { ...this.state.parameters };
    // Invalid new values are replaced with zero
    newParameters[event.target.id] = parseInt(event.target.value) || 0;
    this.setState(this.calculateFullState(newParameters));
  }

  calculateFullState = (parameters) => {
    let newState = { 
      parameters: parameters,
    };

    // Calculate the equation fields
    let all_sucrose = this.state.parameters.sugar + (this.state.parameters.honey * (this.state.parameters.honeycontent / 100) );
    let result = ferment(all_sucrose, this.state.parameters.water);
    newState.equation = {
      water: result.consumed.water.toFixed(2),
      sucrose: result.consumed.sucrose.toFixed(2),
      ethanol: result.product.ethanol_l.toFixed(2),
      carbon_dioxide: result.product.carbon_dioxide.toFixed(2),
    };

    // Rate the mead
    // Leaves out water consumed in the process.
    newState.result = rate_my_mead(parseFloat(result.product.ethanol_l), (parseFloat(newState.parameters.water) - result.consumed.water));
    newState.result.percentage = newState.result.percentage.toFixed(1);
    return newState;
  } 
}

class HeaderText extends React.Component {
  render() {
    return (
      <h1 className="w-100 text-center">MeadMate</h1>
    );
  }
}

class ResultBox extends React.Component {
  render() {
    const barStyle = {
      "width": this.props.percentage + "%"
    };
    return (
      <div className="col-xs-12 col-sm-12 col-md-12">
        <div>
          {this.props.message}
        </div>
        <div className="progress" style={{height: "2.0em"}}>
          <div className={"progress-bar bg-"+this.props.status} role="progressbar" style={barStyle}>
            {this.props.percentage}%
          </div>
        </div>
      </div>
    );
  }
}

class References extends React.Component {
  render() {
    return (
      <div className="col-12">
          <a className="badge badge-secondary" data-toggle="collapse" href="#reference-list" aria-expanded="false" aria-controls="reference-list">
            References
          </a>
          <div id="reference-list" className="card card-body collapse p-3">
            • http://www.chegg.com/homework-help/a-small-scale-approach-to-organic-laboratory-techniques-3rd-edition-chapter-16-solutions-9781111789411 <br />
            • http://periodic.lanl.gov/index.shtml
          </div>

      </div>
    );
  }
}
