import React from 'react';

export default class Equation extends React.Component {
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