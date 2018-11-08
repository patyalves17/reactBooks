import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css'
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import ButtonCustomizado from './componentes/ButtonCustomizado';

class App extends Component {

  constructor(){
    super()
    this.state={ 
      lista : [],
      nome:'',
      email:'',
      senha:'',
      confirmaSenha:''
    };
    this.enviaForm=this.enviaForm.bind(this);
    this.setNome=this.setNome.bind(this);
    this.setEmail=this.setEmail.bind(this);
    this.setSenha=this.setSenha.bind(this);
    this.setConfirmaSenha=this.setConfirmaSenha.bind(this);
  }

  componentWillMount(){

    $.ajax({
      url:'http://localhost:8080/api/autores',
      dataType: 'json',
      success:function(resposta){
        this.setState({lista:resposta});
      }.bind(this)
    });

  }

  enviaForm(evento){
    // EventTarget.
    evento.preventDefault();
    console.log(this.state.confirmaSenha);
    
    $.ajax({
      url:'http://localhost:8080/api/autores',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
      success: function(data){
        console.log("enviado com sucesso.");
        this.setState({lista:data});

      }.bind(this),
      error: function(error){
        console.log("error  ",error);
      }
      
    });

  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }
  setEmail(evento){
    this.setState({email:evento.target.value});
  }
  setSenha(evento){
    this.setState({senha:evento.target.value});
  }
  setConfirmaSenha(evento){
    this.setState({confirmaSenha:evento.target.value});
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" classNameName="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>
            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">

          <div className="header">
            <h1>Autor</h1>
            <h2>Cadastro</h2>
          </div>


            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                {
                   <form className="pure-form pure-form-aligned" method="post" onSubmit={this.enviaForm}>


                  <InputCustomizado id="nome"  name="nome" type="text" label="Nome" value={this.state.nome} onChange={this.setNome }/>
                  <InputCustomizado id="email"  name="email" type="email" label="Email" value={this.state.email} onChange={this.setEmail }/>
                  <InputCustomizado id="senha"  name="senha" type="text" label="Senha" value={this.state.senha} onChange={this.setSenha }/>
                  <ButtonCustomizado id="gravar" name="gravar" text="Gravar"/>
               
                 
                </form> 
                }

              </div>
              <div>
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    { 
                      this.state.lista.map(function(autor){
                        return(
                            <tr key={autor.id}>
                              <td>{autor.nome}</td>
                              <td>{autor.email}</td>
                            </tr>
                          );
                        })
                    }
                    
                  </tbody>
                </table>
              </div>
            </div>


        </div>
      </div>
    );
  }
}

export default App;
