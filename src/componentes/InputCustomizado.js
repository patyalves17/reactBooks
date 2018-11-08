import React, { Component } from 'react';

export default class InputCustomizado  extends Component{
    render(){
         return (
            <div className="pure-control-group">
            <label htmlFor="nome">{this.props.label}</label>
            <input type="text" id={this.props.id} type={this.props.type} name={this.props.nome} 
                value={this.props.value} onChange={this.props.onChange }/>
          </div>
         );
    }
}
