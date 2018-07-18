import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {
  Button,
  Container,
  Header,
  Left,
  Body,
  Title,
  Content,
  Separator,
  ListItem,
  Icon,
  Text,
  Label,
  View,
  Fab,
  IconNB,
  ActionSheet,
} from 'native-base';
import { openDrawer } from '../../../actions/drawer';
import styles from './styles';

class ConsultaEvento extends React.Component {

  static propTypes = {
    evento: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      fabActive: false,
    };
  }

  render() {
    const deleteButtons = [
      { text: 'Colaborar', icon: 'trash', iconColor: '#fa213b' },
    ];
    const evento = this.props.evento;
    let listaContactos;
    if (evento.contacto.length > 0) {
      listaContactos = evento.contacto.map(contacto =>
        <ListItem key={contacto.nombre}>
          <Text>{contacto.nombre} - {contacto.telefono}</Text>
        </ListItem>
      );
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Evento - {evento.nombre}</Title>
          </Body>
        </Header>
        <Content>
          <Separator bordered noTopBorder>
            <Text>Información</Text>
          </Separator>
          <ListItem>
            <Label style={styles.label}>Nombre</Label>
            <Text>{evento.nombre}</Text>
          </ListItem>
          <ListItem>
            <Label style={styles.label}>Descripción</Label>
            <Text>{evento.descripcion}</Text>
          </ListItem>
          <ListItem>
            <Label style={styles.label}>Rubro</Label>
            <Text>{evento.rubro.nombre}</Text>
          </ListItem>
          <Separator bordered noTopBorder>
            <Text>Fecha</Text>
          </Separator>
          <ListItem>
            <Label style={styles.label}>Inicio</Label>
            <Text>{moment(evento.fecha_hora_inicio).format('DD/MM/YYYY HH:mm')}</Text>
          </ListItem>
          <ListItem>
            <Label style={styles.label}>Fin</Label>
            <Text>{moment(evento.fecha_hora_fin).format('DD/MM/YYYY HH:mm')}</Text>
          </ListItem>
          {listaContactos ? (
            <View>
              <Separator bordered noTopBorder>
                <Text>Contactos</Text>
              </Separator>
              {listaContactos}
            </View>
            ) : undefined
          }
        </Content>
        <View style={{ flex: 0.1 }}>
          <Fab
            direction="left"
            containerStyle={{}}
            active={this.state.fabActive}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ fabActive: !this.state.fabActive })}
          >
            <IconNB name="md-add" />
            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={() => {this.handleEdit()}}
            >
              <Icon name="color-filter" />
            </Button>
            <Button
              style={{ backgroundColor: '#FD3C2D' }}
              onPress={() => {
                ActionSheet.show(
                  {
                    options: deleteButtons,
                    cancelButtonIndex: 1,
                    destructiveButtonIndex: 0,
                    title: '¿Está seguro que desea eliminar el evento?',
                  },
                  (buttonIndex) => {
                    this.handleConfirmDelete(deleteButtons[buttonIndex]);
                  });
              }}
            >
              <Icon name="trash" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(ConsultaEvento);