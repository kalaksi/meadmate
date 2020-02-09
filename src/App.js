import React from 'react';
import './index.css';
import ParameterForm from './Components/ParameterForm';
import ferment from './ferment';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equation: {
        water: 0.0,
        sucrose: 0.0,
        ethanol: 0.0,
        carbon_dioxide: 0.0,
      },
      parameters: {
        sugar: 0,
        honey: 0,
        honeycontent: 83,
        water: 0,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div id="content" className="container-fluid fill">
        <div id="header" className="row">
          <HeaderText/>
        </div>
        <div className="row">
          <div id="parameters" onChange={this.handleChange}>
            <ParameterForm onChange={this.handleChange}
                           sugar={this.state.parameters.sugar}
                           honey={this.state.parameters.honey}
                           honeycontent={this.state.parameters.honeycontent}
                           water={this.state.parameters.water} />
          </div>
          <div id="equation" className="col-xs-12 col-md-8">
            <Equation water={this.state.equation.water}
                      sucrose={this.state.equation.sucrose}
                      ethanol={this.state.equation.ethanol}
                      carbon_dioxide={this.state.equation.carbon_dioxide} />
          </div>
          <div id="result" className="col-xs-12 col-md-8">
            <ResultBox/>
          </div>
        </div>
        <div id="references" className="row">
          <References/>
        </div>
      </div>
    );
  }

  handleChange(event) {
    let newState = {
      parameters: this.state.parameters,
      equation: this.state.equation,
    }

    newState["parameters"][event.target.id] = parseFloat(event.target.value).toFixed(1);

    // Calculate the equation fields
    let all_sucrose = this.state.parameters.sugar + (this.state.parameters.honey * this.state.parameters.honeycontent);
    let result = ferment(all_sucrose, this.state.parameters.water);
    newState["equation"]["water"] = result.consumption.water.toFixed(2);
    newState["equation"]["sucrose"] = result.consumption.sucrose.toFixed(2);
    newState["equation"]["ethanol"] = result.product.ethanol.toFixed(2);

    console.log(newState);
    this.setState(newState);
  }
}

class HeaderText extends React.Component {
  render() {
    return (
      <h1>MeadMate</h1>
    );
  }
}

class EquationSymbol extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="row">&nbsp;</div>
        <div className="row text-large">{this.props.symbol}</div>
      </div>
    );
  }
}

class EquationElement extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="row text-muted">{this.props.amount}</div>
        <div className="row text-large">{this.props.element}</div>
        <div className="row text-muted">{this.props.description}</div>
      </div>
    );
  }
}

class Equation extends React.Component {
  render() {
    return (
      <div className="row">
        <EquationElement className="col-xs-6 col-sm-3 col-md-3" element="C₁₂H₂₂O₁₁" description="Sucrose (sugar)" amount={this.props.sucrose}/>
        <EquationSymbol className="col-xs-1 col-sm-1 col-md-1" symbol="+"/>
        <EquationElement className="col-xs-4 col-sm-2 col-md-2"  element="H₂O" description="Water" amount={this.props.water}/>
        <EquationSymbol className="col-xs-2 col-sm-1 col-md-1" symbol="&rarr;"/>
        <EquationElement className="col-xs-6 col-sm-2 col-md-2" element="4C₂H₅OH" description="Ethanol" amount={this.props.ethanol}/>
        <EquationSymbol className="col-xs-1 col-sm-1 col-md-1" symbol="+"/>
        <EquationElement className="col-xs-4 col-sm-2 col-md-2" element="4CO₂" description="... and carbon dioxide" amount={this.props.carbon_dioxide}/>
      </div>
    );
  }
}


class ResultBox extends React.Component {
  static defaultProps = {
    "progress": 0,
  }

  render() {
    const barStyle = {
      "width": "1%"
    };
    return (
      <div>
        <span>&nbsp;</span>
        <div className="progress">
          <div className="progress-bar progress-bar-success" role="progressbar" style={barStyle}>
          {this.props.progress}%
          </div>
        </div>
      </div>
    );
  }
}

class References extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-xs-12">
            <a data-toggle="collapse" href="#reference-list" aria-expanded="false" aria-controls="reference-list">
              <span className="glyphicon glyphicon-menu-down"></span>
              References
            </a>
          </div>
        </div>
        <div id="reference-list" className="row collapse">
          <div className="col-xs-12">
            [1] http://www.chegg.com/homework-help/a-small-scale-approach-to-organic-laboratory-techniques-3rd-edition-chapter-16-solutions-9781111789411 <br />
            [2] http://prosessitekniikka.kpedu.fi/doc-html/alkoholi.html <br />
            [3] http://periodic.lanl.gov/index.shtml
          </div>
        </div>
      </div>
    );
  }
}
