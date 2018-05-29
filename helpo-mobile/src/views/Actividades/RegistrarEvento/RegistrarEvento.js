import React from "react";
import { Alert } from "react-native";
import { FormValidationMessage } from "react-native-elements";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";
import SelectorUbicacion from "./SelectorUbicacion/SelectorUbicacion";
import ListaRubrosEvento from "./ListaRubrosEvento/ListaRubrosEvento";
import api from "../../../../api";
import moment from "moment";
import SelectorFechaHora from "./SelectorFechaHora/SelectorFechaHora";
import styles from "./styles";


class RegistrarEvento extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        nombre: "",
        descripcion: "",
        rubro_id: 0,
        fecha_hora_inicio: new Date(),
        fecha_hora_fin: new Date(),
        //TODO: ubicacion que pasamos por defecto debería ser la de la ONG. Ahora, Córdoba.
        ubicacion: { latitud: -31.4201, longitud: -64.1888, notas: ""},
        errors: {}
    };
    this.handleUbicacionChange = this.handleUbicacionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRubroChange = this.handleRubroChange.bind(this);
    this.handleFechaHoraInicioChange = this.handleFechaHoraInicioChange.bind(this);
    this.handleFechaHoraFinChange = this.handleFechaHoraFinChange.bind(this);
  }

  handleRubroChange(r) {
    this.setState({rubro_id: r});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.handleValidation()) {
      const evento = {
        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
        fecha_hora_inicio: this.state.fecha_hora_inicio.toISOString(),
        fecha_hora_fin: this.state.fecha_hora_fin.toISOString(),
        rubro_id: this.state.rubro_id,
        ubicacion: this.state.ubicacion
      };
      api.post("/actividades/eventos/", evento)
        .then(res => {
          console.log(res);
          console.log(res.data);
          Alert.alert(
            "Registrar evento",
            "Se registró el evento con éxito."
          );
          this.props.navigation("RegistrarNecesidades", {evento: res.data.id});
        }).catch(function (error) {
          if (error.response) { console.log(error.response); }
          else { console.log("Error: ", error.message); }
        });
    }
  }

  handleValidation(event) {
    let formIsValid = true;
    var errors = this.state.errors;

    if (!this.state.nombre) {
      formIsValid = false;
      errors.nombre = "Debe ingresar un nombre.";
    }

    if (isNaN(Date.parse(this.state.fecha_hora_inicio)) ||
        isNaN(Date.parse(this.state.fecha_hora_fin))) {
      formIsValid = false;
      errors.fechas = "Las fechas ingresadas no son válidas.";
    } else {
      const inicio = moment(this.state.fecha_hora_inicio);
      const fin = moment(this.state.fecha_hora_fin);
      const ahora = moment(new Date());
      if (moment.duration(fin.diff(inicio)).asHours() > 24 ||
          inicio < ahora ||
          moment.duration(fin.diff(inicio)).asHours() < 0) {
        formIsValid = false;
        errors.fechas = "Las fecha de fin debe ser mayor a la de inicio y " +
          "la actividad no durar más de 24 horas.";
      }
    }
    if (this.state.rubro_id === 0) {
      formIsValid = false;
      errors.rubro = "Hubo un problema al cargar los rubros.";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  handleUbicacionChange(ubi) {
    this.setState({ubicacion: ubi});
  }

  handleFechaHoraInicioChange(f_h) {
    this.setState({fecha_hora_inicio: f_h, fecha_hora_fin: f_h});
  }

  handleFechaHoraFinChange(f_h) {
    this.setState({fecha_hora_fin: f_h});
  }

  render(){
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Registrar evento</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nombre</Label>
              <Input value={this.state.nombre}
                onChangeText={(text) => this.setState({nombre: text})}/>
            </Item>
            <FormValidationMessage>{this.state.errors.nombre}</FormValidationMessage>
            <Item floatingLabel>
              <Label>Descripción</Label>
              <Input value={this.state.descripcion}
                onChangeText={(text) => this.setState({descripcion: text})}/>
            </Item>

            <ListaRubrosEvento
                name="listaRubros"
                rubro_id={this.state.rubro_id}
                onRubroChange={this.handleRubroChange} />
            <FormValidationMessage>{this.state.errors.rubro}</FormValidationMessage>

            <SelectorFechaHora
              detalle="Inicio"
              soloFecha={false}
              value={this.state.fecha_hora_inicio}
              handleChange={this.handleFechaHoraInicioChange}/>
            <SelectorFechaHora
              detalle="Fin"
              soloFecha={false}
              value={this.state.fecha_hora_fin}
              handleChange={this.handleFechaHoraFinChange}/>
            <FormValidationMessage>{this.state.errors.fechas}</FormValidationMessage>

            <Item>
              <SelectorUbicacion
                ubicacion={this.state.ubicacion}
                onUbicacionChange={this.handleUbicacionChange} />
            </Item>
            <Button block style={{ margin: 15, marginTop: 50 }}
              onPress={this.handleSubmit} >
              <Text>Guardar Evento</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default RegistrarEvento;
