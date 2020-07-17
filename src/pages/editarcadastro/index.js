import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Picker,
    Image,
    AsyncStorage,
    ScrollView,
    ImageBackground
} from 'react-native';

import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text
} from 'react-native-paper';


import fundo from './../../images/fundo.png';
import { format } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from './../../services/firebase'
import back from './../../images/back.png'

import { TextoMenu, Opcao, Helper, TextoBoto , Input, TextoPicker, Pickers, BoxInput, Botao, TextoBotao } from './styles'

export default class EditarCadastro extends Component{ 
    
    constructor(props){
        super(props);
            this.state ={
                usuario: [],
                eleitores: [],
                exibireleitores: [],
                error: false,
                nome: '',
                visibleeleitor: false,
                titulo: '',
                profissao: '',
                bairro: '',
                nascimento: '',
                voto: '',
                numero: '',
                relacao: '',
                key: '',
                observacao: '',
                error: false
            }
            this.handlerCadastrarEleitor = this.handlerCadastrarEleitor.bind(this)
    }

  handlerCadastrarEleitor(){
        
        let dados = this.state
        if(dados.nome == undefined){
            dados.nome = ''
        }
        if(dados.telefone == undefined){
           dados.telefone = ''
        }
        if(dados.titulo == undefined){
           dados.titulo = ''
        }
        if(dados.profissao == undefined){
           dados.profissao = ''
        }
        
        if(dados.bairro == undefined){
          dados.bairro = ''
       }
        if(dados.voto == undefined){
           dados.voto = ''
        }
        if(dados.observacao == undefined){
           dados.observacao = ''
        }
        if(dados.relacao == undefined){
           dados.relacao = ''
        }

        firebase.database().ref('eleitores').child(dados.numero).child(dados.key).update({
            nome: dados.nome,
            telefone: dados.telefone,
            bairro: dados.bairro,
            titulo: dados.titulo,
            profissao: dados.profissao,
            voto: dados.voto,
            observacao: dados.observacao,
            relacao: dados.relacao
        })
        this.setState({visibleeleitor: true})
    }

    async componentDidMount(){
        const user = await AsyncStorage.getItem('usuario')
        this.setState({usuario: JSON.parse(user)})
        let dados = this.state.usuario
        firebase.database().ref('eleitores').child(dados.numero).on('value', (item)=>{
            let dados = this.state;
            dados.exibireleitores = []
            dados.exibireleitores[0] = {nome: 'Selecione uma opção'}
            dados.exibireleitores[1] = {nome: 'Nenhuma Relação'}
            item.forEach((data)=>{
                dados.exibireleitores.push({
                    nome: data.val().nome
                })
            })
            dados.eleitores = dados.exibireleitores;
            this.setState(dados);
        })
        dados = this.state
        dados.key = this.props.navigation.getParam('key')
        dados.numero = this.props.navigation.getParam('numero')
        this.setState({dados});
        firebase.database().ref('eleitores').child(dados.key).on('value', (data)=>{
          this.setState({
                  key: data.key,
                  nome: data.val().nome,
                  titulo: data.val().titulo,
                  telefone: data.val().telefone,
                  bairro: data.val().bairro,
                  voto: data.val().voto,
                  profissao: data.val().profissao,
                  relacao: data.val().relacao,
                  observacao: data.val().observacao
          })
          })
    }

     render(){ 
        const dados = this.state
        return(
            <ImageBackground source={fundo} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{ height: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Eleitorado')
                    }}
                    style={{width:'32%', marginLeft: 14}}>
                    <Image source={back} style={{width: 25, height: 25, float: 'left'}}/>
                    </TouchableOpacity> 
                    <TextoMenu>EDITAR ELEITOR</TextoMenu>
                </View>
                <ScrollView style={{ padding: 25}}>
                
                    <View>
                    <Opcao>
                        
                    <BoxInput style={{width: '48%'}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Nome"
                        value={dados.nome}
                        onChangeText={(texto)=>{this.setState({nome: texto})}}
                    ></Input>
                  
                    </BoxInput>

                    <BoxInput  style={{width: '48%'}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        keyboardType='phone-pad'
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Telefone"
                        value={dados.telefone}
                        onChangeText={(texto)=>{this.setState({telefone: texto})}}
                    ></Input>
                    
                    </BoxInput>

                    <BoxInput   style={{width: '48%'}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        keyboardType="numeric"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Título de Eleitor"
                        value={dados.titulo}
                        onChangeText={(texto)=>{this.setState({titulo: texto})}}
                    ></Input>
                    </BoxInput>    

                    <BoxInput   style={{width: '48%'}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Profissão"
                        value={dados.profissao}
                        onChangeText={(texto)=>{this.setState({profissao: texto})}}
                    ></Input>
                    </BoxInput>

                    
                    <BoxInput >
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Bairro"
                        value={dados.bairro}
                        onChangeText={(texto)=>{this.setState({bairro: texto})}}
                    ></Input>
                  
                    </BoxInput>


                    <BoxInput  style={{marginBottom: 10}}>
                    <Pickers
                    style={{ height: 55, borderRadius: 8, elevation: 3, justifyContent: 'center'}}>            
                        <Picker
                        style={{margin: -8, opacity: 0.5}}
                        selectedValue={dados.voto}
                        onValueChange={(item)=>{this.setState({voto: item})}}
                        >   
                            <Picker.Item key={0} value={null} label="Voto" />
                            <Picker.Item key={1} value='Certo' label="Votos Certo" />
                            <Picker.Item key={2} value='A Confirmar' label="Voto A Confirmar" />
                            <Picker.Item key={3} value='A Conquistar' label="Voto A Conquistar" />
                            <Picker.Item key={4} value='Perdido' label="Voto Perdido" />
                        </Picker>
                     </Pickers>
                    </BoxInput>

                    <BoxInput style={{ marginBottom: 0, marginTop: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                        placeholder="Relação"
                        value={dados.pesquisa}
                        
                        onChangeText={async (text)=>{
                          let dados = this.state
                          dados.pesquisa = text
                          dados.exibireleitores = []
                          dados.exibireleitores[0] = {nome: 'Selecione uma opção'}
                          dados.exibireleitores[1] = {nome: 'Nenhuma Relação'}
                          dados.eleitores.map((item, index)=>{
                              if(index != 0 && index != 1){
                                  if(dados.pesquisa == String(item.nome).substr(0,dados.pesquisa.length)){
                                  dados.exibireleitores.push(item)
                                }
                              }
                          })
                          this.setState({dados})
                        }}
                    ></Input>
                    </BoxInput>
                    <BoxInput style={{ marginBottom: 0}}>
                    <Pickers
                    style={{ height: 55, borderRadius: 8, elevation: 3, justifyContent: 'center', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>            
                        <Picker
                        style={{margin: -8, opacity: 0.5}}
                        selectedValue={dados.relacao}
                        onValueChange={(item)=>{this.setState({relacao: item})}}
                        >  
                            {
                              this.state.exibireleitores.map((item, index)=>{
                                if(index == 0){
                                  return  <Picker.Item key={index} value={null} label={item.nome} />
                                }
                                return  <Picker.Item key={index} value={item.nome} label={item.nome} />
                              })
                            }
                        </Picker>
                     </Pickers>
                    </BoxInput >
                    <BoxInput  style={{marginTop: 10}}>
                    <Input
                        multiline={true}
                        numberOfLines={4}
                        selectionColor="black"
                        underlineColor="white"
                        style={{ backgroundColor: '#fff', margin: 0}}
                        placeholder="Observação"
                        value={dados.observacao}
                        onChangeText={(texto)=>{this.setState({observacao: texto})}}
                    ></Input>
                    </BoxInput>

                    </Opcao>
                    <Botao
                        onPress={()=> this.handlerCadastrarEleitor()}
                    >
                        <TextoBoto>SALVAR</TextoBoto>
                    </Botao>
                    </View>

                </ScrollView>
                <Portal>
                    <Dialog
                    visible={this.state.visibleeleitor}>
                    <Dialog.Title>Parabéns</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>{`Eleitor editado com sucesso!!`}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <TouchableOpacity
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 4, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                          this.props.navigation.navigate("Eleitorado")
                        }}><Text style={{color: '#ffcc00', fontSize: 16,  margin: 15, marginRight: 15,fontWeight: 'bold'}}>ELEITORADO</Text></TouchableOpacity>
                        <TouchableOpacity
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 4, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                         let dados = this.state
                        dados.visibleeleitor = false
                         this.setState({dados})
                        }}><Text style={{color: '#ffcc00', fontSize: 16,  marginLeft: 5, marginRight: 15,fontWeight: 'bold'}}>FECHAR</Text></TouchableOpacity>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
            </ImageBackground>
        );
    }
}