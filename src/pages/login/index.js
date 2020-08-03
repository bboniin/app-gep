import React, {Component} from 'react';
import {
  View,
  Image,
  TextInput,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';

import firebase from './../../services/firebase';

import {Button, Dialog, Paragraph, Portal, Text} from 'react-native-paper';
import fundo from './../../images/fundo.png';

import logo from './../../images/logo.png';
import boneco from './../../images/boneco.png';
import {Botao} from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      senha: '',
      usuarios: [],
      visible: false,
      error: true,
    };
  }

  async handlerStorage(item) {
    await AsyncStorage.setItem('usuario', JSON.stringify(item));
  }

  async componentDidMount() {
    await AsyncStorage.removeItem('usuario');
    await firebase
      .database()
      .ref('usuarios')
      .on('value', (item) => {
        let dados = this.state;
        item.forEach((data) => {
          dados.usuarios.push({
            metafinal: data.val().metafinal,
            usuario: data.val().usuario,
            tipo: data.val().tipo,
            senha: data.val().senha,
            nome: data.val().nome,
            foto: data.val().foto,
            nomedeurna: data.val().nomedeurna,
            numero: data.val().numero,
            partido: data.val().partido,
            telefone: data.val().telefone,
            endereco: data.val().endereco,
            progresso: data.val().progresso,
          });
        });
        this.setState(dados);
      });
  }

  render() {
    return (
      <ImageBackground source={fundo} style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={logo}
            style={{width: 1000, height: 150, resizeMode: 'contain'}}
          />
          <Image
            source={boneco}
            style={{width: 1000, height: 150, resizeMode: 'contain'}}
          />

          <TextInput
            value={this.state.user}
            onChangeText={(text) => {
              this.setState({user: text});
            }}
            placeholder="Usuario"
            style={{
              width: '75%',
              borderRadius: 5,
              marginTop: 25,
              paddingLeft: 12,
              fontSize: 16,
              backgroundColor: 'white',
            }}></TextInput>
          <TextInput
            value={this.state.senha}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({senha: text});
            }}
            placeholder="Senha"
            style={{
              width: '75%',
              borderRadius: 5,
              marginTop: 25,
              paddingLeft: 12,
              fontSize: 16,
              backgroundColor: 'white',
            }}></TextInput>
          <Botao
            onPress={() => {
              let dados = this.state;
              for (let i = 0; i <= dados.usuarios.length - 1; i++) {
                if (
                  this.state.user == dados.usuarios[i].usuario &&
                  this.state.senha == dados.usuarios[i].senha
                ) {
                  dados.error = false;
                  let user = dados.usuarios[i];
                  this.handlerStorage(user);
                  this.props.navigation.navigate('Home');
                }
              }
              if (dados.error == true) {
                Alert.alert('Error', 'Usuário ou Senha Inválidos');
              }
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                fontStyle: 'normal',
                color: 'black',
              }}>
              ENTRAR
            </Text>
          </Botao>
          <TouchableOpacity
            style={{
              marginTop: 15,
              opacity: 0.5,
              color: '#FFF',
            }}
            onPress={() => {
              this.setState({visible: true});
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#FFF',
                fontSize: 14,
              }}>
              ESQUECI A SENHA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 2, color: '#FFF'}}
            onPress={() => {
              Linking.openURL('https://www.gustavotutuca.rio/gep');
            }}>
            <Text
              style={{
                color: '#FFF',
                marginTop: 2,
                fontSize: 16,
                textDecorationLine: 'underline',
              }}>
              SOLICITAR ACESSO
            </Text>
          </TouchableOpacity>
          <Portal>
            <Dialog visible={this.state.visible}>
              <Dialog.Content>
                <Paragraph>
                  {'Solicite sua senha no número\n(24) 99856-5959'}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <TouchableOpacity
                  color="black"
                  labelStyle={{
                    borderWidth: 1,
                    padding: 4,
                    borderRadius: 5,
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                  onPress={() => {
                    let dados = this.state;
                    dados.visible = false;
                    this.setState({dados});
                  }}>
                  <Text
                    style={{
                      color: '#ffcc00',
                      fontSize: 16,
                      margin: 15,
                      fontWeight: 'bold',
                    }}>
                    FECHAR
                  </Text>
                </TouchableOpacity>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </ImageBackground>
    );
  }
}
