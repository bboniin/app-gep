import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    CheckBox,
    ImageBackground
} from 'react-native';
import firebase from './../../services/firebase'
import { format, addDays } from 'date-fns'

import {
    Button,
    Dialog,
    Paragraph,
    Portal,
    Text
} from 'react-native-paper';

import agendaa from './../../images/agendaa.png'
import tarefa from './../../images/tarefa.png'

import fundo from './../../images/fundo.png';
import DateTimePicker from '@react-native-community/datetimepicker';

import back from './../../images/back.png'

import { TextoMenu, Opcao, Helper, TextoBoto , Data, Input, Label, BoxInput, Botao, TextoBotao } from './styles'

export default class AgendaCadastro extends Component{ 
    
    constructor(props){
        super(props);
            this.state ={
                usuario: [],
                usuarios: [],
                error: false,
                data: '',
                horario: '',
                tipo: '',
                ok: '',
                visibleenvio: false,
                visibleerror: false,
                visible: false,
                visibleHora: false,
                modo: 'date',
                descricao: '',
                criador: ''
            }
            this.handlerCadastrarCompromisso = this.handlerCadastrarCompromisso.bind(this);
    }

    async handlerCadastrarCompromisso(){
        let dados = this.state
        let presentes = []
        this.state.usuarios.map((item)=>{
            if(item.presente == true){
                presentes.push(item.nome)
            }
        })
        if(  !presentes || !dados.horario || !dados.data || !dados.descricao){
             this.setState({error: true})
             if(presentes.length != 0){
                this.setState({ok: 'd'})
             }else{
                this.setState({ok: ''})
             }
             this.setState({visibleerror: true})
         }else{
       
       const usuarios = firebase.database().ref('agenda');
       let chave = usuarios.push().key;
       let state = this.state
      usuarios.child(state.data).child(chave).set({
            data: state.data,
            descricao: state.descricao,
            presentes: presentes,
            tipo: state.tipo,
            horario: state.horario,
            criador: state.usuario.nome,
        })
        this.props.navigation.navigate('Agenda', {mensagem: state.tipo})
     }
    }


    async componentDidMount(){
        let tipo = this.props.navigation.getParam('tipo')
        const user = await AsyncStorage.getItem('usuario')
        this.setState({usuario: JSON.parse(user), tipo})
        let state = this.state
        if(state.usuario.tipo == "Prefeito"){
        firebase.database().ref('usuarios').on('value', (item)=>{
            let state = this.state
            item.forEach((data)=>{
                state.usuarios.push({
                    presente: false,
                    nome: data.val().nome
                })
            })
            this.setState(state);
        })
        }else{
            let state = this.state
            state.usuarios.push({
                presente: true,
                nome: state.usuario.nome
            })
            this.setState(state);
        }

    }

    

     render(){ 
        const dados = this.state
        return(
            <ImageBackground source={fundo} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{ height: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                         onPress={()=>{ this.props.navigation.navigate('Agenda')
                    }}
                    style={{width:'32%', marginLeft: 18}}>
                    <Image source={back} style={{width: 25, height: 25, float: 'left'}}/>
                    </TouchableOpacity> 
                    
                    <TextoMenu>CADASTRO</TextoMenu>
                </View>
                <ScrollView>
                    <View  style={{padding: 25}} >
                    <Opcao>
                    <BoxInput style={{width: '48%'}}>
                        <Data onPress={()=>{this.setState({mode: 'date', visible: true})}}>
                        <Label>{!dados.data && !dados.horario ? 'Data e Horário' :  format( addDays(new Date(dados.data), 1), 'dd/MM/yyyy') + "  " + dados.horario}</Label>
                        </Data>

                    <Helper
                      type="error"
                      visible={dados.error && (!dados.horario || !dados.data)}
                    >
                         Campo obrigatório
                    </Helper>

                    </BoxInput>
                    <BoxInput style={{width: '48%'}}>
                    <Data 
                    style={{flexDirection: 'row', alignItems: 'center'}}
                      disabled={true}
                        >
                          {(this.state.tipo == 'tarefa' ? (<View style={{width: 30, height: 30, margin: 10, borderRadius: 15, backgroundColor: '#44e757', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={tarefa} style={{width: 18, height: 18}}/>
                        
                      
                        </View>) : 
                        ( 
                            
                            <View style={{width: 30, height: 30, borderRadius: 15, margin: 10, backgroundColor: '#f2f43d', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={agendaa} style={{width: 18, height: 18}}/>
                            
                        </View>
                        ))}  
                        <TextoBoto>{ this.state.tipo == 'tarefa' ? 'Tarefa' : 'Agenda'}</TextoBoto>
                    </Data>
                    </BoxInput>

      {dados.visible && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={new Date()}
          mode="time"
          display='default'
          is24Hour={false}
          onChange={(e, date)=>{
            let horario = format(new Date(date), 'HH:mm')
            this.setState({horario, visible: false})}}
        />
      )}    
      
      {
                        this.state.visible && (
                            <DateTimePicker
                            mode="date"
                            value={new Date()}
                            onChange={(event, date)=>{
                            let data = format(new Date(date), 'yyyy-MM-dd')
                            this.setState({data: data, visible: false})}}
                            />
                        )
                    }       
                    {
                        dados.usuario.tipo == "Prefeito" && (
                            <View style={{width: '100%'}}>
                                        <Label style={{marginTop: 0, marginBottom: 5, color: '#FFF', opacity: 1}}>Convidados</Label>
                            <BoxInput  style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', borderWidth: 3, borderColor: 'white', borderRadius: 10, padding: 5}}>
                                
                                {
                                    this.state.usuarios.map((item, index)=>{
                                        return(
                                            <View  style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 5, margin: 5, padding: 5, width: 'auto'}}>
                                            <CheckBox
                                                
                                        onValueChange={()=>{
                                        let dados = this.state.usuarios
                                        dados[index].presente = !dados[index].presente
                                        this.setState({dados})
                                        }}
                                        value={item.presente}
                                        style={{width: 40, height: 30, marginTop: 0}}>

                                        </CheckBox>
                                            <Text>{item.nome}</Text>
                                        </View>
                                        )
                                    })
                                }
                                
                            </BoxInput>

                            <Helper
                                type="error"
                                visible={this.state.error && !this.state.ok}
                                >
                                    Campo obrigatório
                                </Helper>

                            </View>

                        )
                    }
                    
                    <BoxInput>
                    <Input
                        multiline={true}
                        numberOfLines={4}
                        underlineColor="white"
                        style={{ backgroundColor: '#fff', margin: 0}}
                        placeholder="Descrição"
                        onChangeText={(texto)=>{this.setState({descricao: texto})}}
                    ></Input>

                        <Helper
                        type="error"
                        visible={this.state.error && !this.state.descricao}
                        >
                             Campo obrigatório
                        </Helper>

                    </BoxInput>
                    </Opcao>
                    <Botao
                        onPress={()=> this.handlerCadastrarCompromisso()
                        }
                    >
                        <TextoBoto>CADASTRAR {(this.state.tipo == 'tarefa' ? 'TAREFA' : 'AGENDA')}</TextoBoto>
                    </Botao>
                    </View>
                </ScrollView>
                <Portal>
                    <Dialog
                    visible={this.state.visibleerror}>
                    <Dialog.Title>Informativo</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>{`Preencha todos os campos obrigatórios`}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <TouchableOpacity
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 4, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                         let dados = this.state
                        dados.visibleerror = false
                         this.setState({dados})
                        }}><Text style={{color: '#ffcc00', fontSize: 16,  margin: 15,fontWeight: 'bold'}}>FECHAR</Text></TouchableOpacity>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
            </ImageBackground>
        );
    }
}