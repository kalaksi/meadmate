import React from 'react';
import './index.css';
import ParameterForm from './Components/ParameterForm';
import EquationCanvas from './Components/EquationCanvas';
import { ferment, rate_my_mead } from './ferment';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equation: {
        water: "0.00",
        sucrose: "0.00",
        ethanol: "0.00",
        carbon_dioxide: "0.00",
      },
      parameters: {
        sugar: "0",
        honey: "0",
        honeycontent: "0",
        water: "0",
      },
      result: {
        message: '',
        status: 'success',
        percentage: 0,
      },
    };

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
    let newState = { ...this.state }

    // Invalid new values are replaced with zero
    newState["parameters"][event.target.id] = parseInt(event.target.value) || 0;

    // Calculate the equation fields
    let all_sucrose = this.state.parameters.sugar + (this.state.parameters.honey * this.state.parameters.honeycontent);
    let result = ferment(all_sucrose, this.state.parameters.water);
    newState.equation.water = result.consumed.water.toFixed(2);
    newState.equation.sucrose = result.consumed.sucrose.toFixed(2);
    newState.equation.ethanol = result.product.ethanol_l.toFixed(2);
    newState.equation.carbon_dioxide = result.product.carbon_dioxide.toFixed(2);

    // Rate the mead
    let rating = rate_my_mead(
      parseFloat(result.product.ethanol_l),
      // Water left after the process
      (parseFloat(newState.parameters.water) - result.consumed.water)
    );
    newState.result = {...rating }
    newState.result.percentage = newState.result.percentage.toFixed(1);

    this.setState(newState);
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
        <div className="progress">
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
    let glyphiconClass = "glyphicon-menu-down";
    return (
      <div>
        <div className="row">
          <a data-toggle="collapse" href="#reference-list" aria-expanded="false" aria-controls="reference-list">
            <span className={"glyphicon " + glyphiconClass}></span>
            References
          </a>
        </div>
        <div id="reference-list" className="row collapse">
          <div>
            [1] http://www.chegg.com/homework-help/a-small-scale-approach-to-organic-laboratory-techniques-3rd-edition-chapter-16-solutions-9781111789411 <br />
            [2] http://prosessitekniikka.kpedu.fi/doc-html/alkoholi.html <br />
            [3] http://periodic.lanl.gov/index.shtml
          </div>
        </div>

      </div>
    );
  }
}
