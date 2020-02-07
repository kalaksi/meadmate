import React from 'react';
import './index.css';
import ParameterForm from './Components/ParameterForm';

export default class App extends React.Component {
  render() {
    return (
      <div id="content" className="container-fluid fill">
        <div className="row">
          <HeaderText/>
        </div>
        <div className="row">
          <ParameterForm/>
          <div className="col-xs-12 col-md-8">
            <Equation/>
          </div>
          <div className="col-xs-12 col-md-8">
            <AlcoholBar/>
          </div>
        </div>
        <div className="row">
          <References/>
        </div>
      </div>
    );
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
  static defaultProps = {
    "amount": 0,
  }
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
        <EquationElement className="col-xs-6 col-sm-3 col-sm-3" element="C₁₂H₂₂O₁₁" description="Sucrose (sugar)"/>
        <EquationSymbol className="col-xs-1 col-sm-1 col-md-1" symbol="+"/>
        <EquationElement className="col-xs-4 col-sm-2 col-sm-2"  element="H₂O" description="Water"/>
        <EquationSymbol className="col-xs-2 col-xs-offset-1 col-sm-1 col-sm-offset-0 col-md-1" symbol="&rarr;"/>
        <EquationElement className="col-xs-9 col-sm-5 col-sm-5" element="4 C₂H₅OH + 4 CO₂" description="Ethanol and carbon dioxide"/>
      </div>
    );
  }
}


class AlcoholBar extends React.Component {
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
