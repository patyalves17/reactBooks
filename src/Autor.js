import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import InputCustomizado from './componentes/InputCustomizado';
import ButtonCustomizado from './componentes/ButtonCustomizado';

class FormularioAutor extends Component {
    constructor() {
        super()
        this.state = {
            nome: '',
            email: '',
            senha: '',
            confirmaSenha: ''
        };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.setConfirmaSenha = this.setConfirmaSenha.bind(this);
    }
    enviaForm(evento) {
        evento.preventDefault();
        console.log(this.state.confirmaSenha);

        $.ajax({
            url: 'http://localhost:8080/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (novaListagem) {
                PubSub.publish('atualiza-lista-autores', novaListagem);
            }.bind(this),
            error: function (error) {
                console.log("error  ", error);
            }

        });

    }


    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }
    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }
    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }
    setConfirmaSenha(evento) {
        this.setState({ confirmaSenha: evento.target.value });
    }


    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <h2>Cadastro</h2>
                {
                    <form className="pure-form pure-form-aligned" method="post" onSubmit={this.enviaForm}>
                        <InputCustomizado id="nome" name="nome" type="text" label="Nome" value={this.state.nome} onChange={this.setNome} />
                        <InputCustomizado id="email" name="email" type="email" label="Email" value={this.state.email} onChange={this.setEmail} />
                        <InputCustomizado id="senha" name="senha" type="text" label="Senha" value={this.state.senha} onChange={this.setSenha} />
                        <ButtonCustomizado id="gravar" name="gravar" text="Gravar" />
                    </form>
                }
                <br />

            </div>
        );
    }

}

class TabelaAutores extends Component {
    render() {
        return (
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
                            this.props.lista.map((autor) => {
                                return (
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
        );
    }

}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        }
        );

        PubSub.subscribe('atualiza-lista-autores', ((topico, novaLista) => {
            this.setState({ lista: novaLista })
        }).bind(this));

    }



    render() {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista} />
            </div>
        );
    }
}
