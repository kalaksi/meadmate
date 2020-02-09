import React from 'react';
import './EquationCanvas.css';

export default class Equation extends React.Component {
  render() {
    return (
      <div className="row white-canvas">
        <EquationElement className="col-xs-5 col-sm-5 col-md-3" unit="g" element="C₁₂H₂₂O₁₁" description="Sucrose (sugar)" amount={this.props.sucrose}/>
        <EquationSymbol className="col-xs-1 col-sm-1 col-md-1" symbol="+"/>
        <EquationElement className="col-xs-4 col-sm-4 col-md-2" unit="l" element="H₂O" description="Water" amount={this.props.water}/>
        <EquationSymbol className="col-xs-2 col-sm-2 col-md-1" symbol="&rarr;"/>
        <EquationElement className="col-xs-6 col-sm-6 col-md-2" unit="l" element="4C₂H₅OH" description="Ethanol" amount={this.props.ethanol}/>
        <EquationSymbol className="col-xs-1 col-sm-1 col-md-1" symbol="+"/>
        <EquationElement className="col-xs-2 col-sm-2 col-md-2" unit="g" element="4CO₂" description="carbon dioxide" amount={this.props.carbon_dioxide}/>
      </div>
    );
  }
}

class EquationSymbol extends React.Component {
  render() {
    return (
      <div className={this.props.className + " white-canvas-cell"}>
        <div className="">&nbsp;</div>
        <div className="text-large">{this.props.symbol}</div>
      </div>
    );
  }
}

class EquationElement extends React.Component {
  render() {
    return (
      <div className={this.props.className + " white-canvas-cell"}>
        <div className="text-muted">{this.props.amount + ' ' + this.props.unit}</div>
        <div className="text-large">{this.props.element}</div>
        <div className="text-muted">{this.props.description}</div>
      </div>
    );
  }
}