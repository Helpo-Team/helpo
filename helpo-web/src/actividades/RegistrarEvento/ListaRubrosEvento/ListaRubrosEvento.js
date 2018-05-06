import React, { Component } from 'react';

// Api
import axios from 'axios';
const common = require('../../../common.js');
const config = common.config();

class ListaRubrosEvento extends Component {
  constructor(props){
    super(props);
    this.state = { 
      rubros: [{ id: 0, nombre: 'Sin rubros' }]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onRubroChange(e.target.value);
  }

  componentDidMount(){
    axios.get(config.apiUrl + '/rubros_evento')
      .then(res => {
        const rubrosData = res.data;
        this.setState({ rubros: rubrosData })
      })
      .catch(function (error) {
        if (error.response){ console.log(error.response.status) }
        else { console.log('Error: ', error.message)}
      })
  }

  render(){
    const listaRubroEventos = this.state.rubros.map((r) =>
      <option key={r.id} value={r.nombre}>{r.nombre}</option>
    );
    const rubro = this.props.rubro;
    return(
      <select
        value={rubro.id}
        className="form-control"
        onChange={this.handleChange}>
          {listaRubroEventos}
      </select>
    )
  }
}

export default ListaRubrosEvento;