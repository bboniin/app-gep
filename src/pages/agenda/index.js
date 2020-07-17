import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Dimensions,
    ImageBackground
} from 'react-native';
import agendaa from './../../images/agendaa.png'
import tarefa from './../../images/tarefa.png'
import back from './../../images/back.png'

import { format, addDays } from 'date-fns';
import firebase from './../../services/firebase'

import {
    Button,
    Dialog,
    Paragraph,
    Portal,
    Text
} from 'react-native-paper';
import fundo from './../../images/fundo.png';

import {LocaleConfig, CalendarList} from 'react-native-calendars';

LocaleConfig.locales['PT-BR'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabádo'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'PT-BR';

import { TextoMenu, Texto, Opcao, Botao, TextoBotao} from './styles'

export default class Agenda extends Component{ 
    
    constructor(props){
        super(props);
            this.state ={
                usuario: [],
                error: true,
                date: '',
                dataa: '',
                mensagem: '',
                visibleenvio: false,
                data: {},
                minhaAgenda: [],
                agendaDia: [],
            }
    }

    scrollToEnd = () => this.carousel.scrollToEnd({ animated: false });

    async componentDidMount(){
        let mensagem = this.props.navigation.getParam('mensagem');
        if(mensagem){
        this.setState({mensagem, visibleenvio: true})
        }
        const user = await AsyncStorage.getItem('usuario')
        this.setState({usuario: JSON.parse(user)})
        await firebase.database().ref('agenda').once('value', (item)=>{
            let state = this.state
            item.forEach((dados)=>{
                dados.forEach((valor)=>{
                let ok = valor.val().presentes
                for(let i = 0; i<=ok.length; i++){
                    if(ok[i] == state.usuario.nome){ 
                        state.minhaAgenda.push({
                            data: valor.val().data,
                            descricao: valor.val().descricao,
                            presentes: valor.val().presentes.join(" - "),
                            criador: valor.val().criador,
                            horario: valor.val().horario,
                            tipo: valor.val().tipo.toUpperCase()
                        })
                    }
                }
            
            })
            this.setState(dados);
            })
        })
        let state = this.state
        state.minhaAgenda.map((item)=>{
            if(item.tipo == 'TAREFA'){
                state.data[item.data] =  {selected: true, marked: true, selectedColor: '#44e757'}
            }else{
                state.data[item.data] =  {selected: true, marked: true, selectedColor: '#f2f43d'}
            }
        })
        let data = format(new Date(), 'yyyy-MM-dd')
        state.minhaAgenda.map((item)=>{
            if(item.data == data){
                state.agendaDia.push(item)
            }
        })
        this.setState({state})
    }

     render(){ 

        const screenWidth = Dimensions.get('window').width;
        let minhaAgenda =  this.state.minhaAgenda
        if(minhaAgenda.length == 0){
            var ok = true
        }else{
            var ok = false
        }

        return(
            <ImageBackground source={fundo} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{ height: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Home')
                    }}
                    style={{width:'36%', marginLeft: 18}}>
                    <Image source={back} style={{width: 25, height: 25, float: 'left'}}/>
                    </TouchableOpacity> 
                    <TextoMenu>AGENDA</TextoMenu>
                </View>
                <ScrollView
                 style={{marginBottom: 20}}>
                <Botao
                 style={{flexDirection: 'row'}}
                onPress={()=>{ this.props.navigation.navigate("AgendaCadastro", {tipo: 'agenda'})}}
                    >
                        <View style={{width: 30, height: 30, borderRadius: 15, marginRight: 15, backgroundColor: '#f2f43d', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={agendaa} style={{width: 18, height: 18}}/>
                        </View>
                        
                        <TextoBotao>CADASTRAR AGENDA</TextoBotao>

                </Botao>
                <Botao
                style={{marginTop: 0, flexDirection: 'row'}}
                onPress={()=>{ this.props.navigation.navigate("AgendaCadastro", {tipo: 'tarefa'})}}
                    >
                        <View style={{width: 30, height: 30, borderRadius: 15, marginRight: 15, backgroundColor: '#44e757', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={tarefa} style={{width: 18, height: 18}}/>
                        </View>
                        <TextoBotao>CADASTRAR TAREFAS</TextoBotao>
                </Botao>
                <View style={{width: '90%', alignSelf: 'center', borderRadius: 5, backgroundColor: '#FFF', padding: 5}} >
                    
                
                        <CalendarList
                        horizontal
                        calendarWidth = { 350 } 
                        markedDates={this.state.data}
                        minDate={'2020-01-20'}
                        maxDate={'2020-12-25'}
                        onDayPress={(day) => {
                            let state = this.state
                            state.date = day.dateString
                            state.dataa = `${day.day}/${day.month}/${day.year}`
                            state.agendaDia = []
                            state.minhaAgenda.map((item)=>{
                                if(item.data == state.date){
                                    state.agendaDia.push(item)
                                }
                            })
                            this.setState({state})
                        }}
                        taggedDates = {this.state.data} 
                    />
               
                </View >
                <View style={{ width: '100%', justifyContent: "center", alignItems: 'center'}}>
                    
                    {
                        
                    (this.state.agendaDia.length == 0) ? <Texto style={{width: '75%', color: '#FFF'}}>Nenhuma compromisso marcado na data {this.state.dataa}</Texto> : ( this.state.agendaDia.map((item)=>{
                           return (
                            <Opcao style={{marginBottom: 0}}>
                            <View style={{flexDirection: 'column', width: '100%', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 10}}>
                                    <Text style={{color: '#000',fontSize: 13, fontWeight: 'bold'}}>Data: {format( addDays(new Date(item.data), 1),'dd/MM/yyyy')}</Text>
                                    <Text style={{color: '#000',fontSize: 13, fontWeight: 'bold'}}>Horáro: {item.horario}</Text>
                            </View>
                                    <Text style={{color: '#000',fontSize: 13, fontWeight: 'bold'}}>Tipo: {item.tipo}</Text>
                                    <Text style={{color: '#000',fontSize: 13, fontWeight: 'bold'}}>Descrição: {item.descricao}</Text>
                                    <Text style={{color: '#000',fontSize: 13, fontWeight: 'bold'}}>Presentes: {item.presentes}</Text>
                                    <Text style={{color: '#000',fontSize: 13, fontWeight: 'bold'}}>Criador {item.criador}</Text>
                            </View>
                            
                               
                            </Opcao>
                       )
                           })   )    
                    }
                </View>
                </ScrollView>
                <Portal>
                    <Dialog
                    visible={this.state.visibleenvio}>
                    <Dialog.Content>
                    <Paragraph>{`${(this.state.mensagem == 'tarefa') ? 'Tarefa cadastrada com sucesso!!' : 'Agenda cadastrada com sucesso!!'}`}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <TouchableOpacity
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 4, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                         let dados = this.state
                        dados.visibleenvio = false
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