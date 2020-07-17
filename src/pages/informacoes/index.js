import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    AsyncStorage
} from 'react-native';

import firebase from './../../services/firebase'

import Foto from './../../images/lincoln.png'
import fundo from './../../images/fundo.png';

import { TextoMenu, Opcao, Container, Botao, Titulo, Saque} from './styles';
import back from './../../images/back.png';

export default class Informacoes extends Component{  
    
    constructor(props){
        super(props);
            this.state ={
                exibireleitores: [],
                usuario: [],
                error: true,
                progressofinal: 0
            }
    }


    async componentDidMount(){
        const user = await AsyncStorage.getItem('usuario')
        await this.setState({usuario: JSON.parse(user)})
        let dados = JSON.parse(user)
        let state = this.state;
       await firebase.database().ref('eleitores').child(dados.numero).on('value', (item)=>{
            item.forEach((data)=>{
                state.exibireleitores.push({
                    voto: data.val().voto
                })
            })  
            state.exibireleitores.map((item)=>{
            if(item.voto == "Certo"){
                state.progressofinal++
            } 
          
        })
            this.setState({state, progressofinal: state.progressofinal})
        })
       
    }

     render(){ 
        let usuario = this.state.usuario
        let state = this.state
        return(
            
            <ImageBackground source={fundo} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{ height: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Home')
                    }}
                    style={{width:'30%', marginLeft: 18}}>
                    <Image source={back} style={{width: 25, height: 25}}/>
                    </TouchableOpacity> 
                    <TextoMenu>INFORMAÇÕES</TextoMenu>
                </View>
                <ScrollView>{//({uri: usuario.foto})
                }
                <Opcao  style={{ margin: 25}}>
                    <View style={{height: 135, width: 135, borderRadius: 85, margin: 10, marginTop: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFF'}}>
                    <Image source={(!usuario.foto) ? (Foto) : ({uri: usuario.foto})} style={{width: 125, height: 125, borderRadius: 75}}/> 
                    </View>
                   
                    <View style={{ alignItems: 'center',width: '100%', margin: 0, padding: 8, borderBottomWidth: 1, borderColor: '#B5B5B5'}}>
                              <Text style={{fontSize: 18, marginTop: 13, fontWeight: 'bold' ,fontStyle: 'normal', color: '#9afc07'}}>NOME DE URNA</Text> 
                              <Text style={{fontSize: 32, fontStyle: 'normal', fontWeight: 'bold', color: '#FFF'}}>{usuario.nomedeurna}</Text>
                              <Text style={{fontSize: 18, marginTop: 13, fontWeight: 'bold' ,fontStyle: 'normal', color: '#9afc07'}}>NÚMERO DO CANDIDATO</Text> 
                              <Text style={{fontSize: 32, fontStyle: 'normal', fontWeight: 'bold', color: '#FFF'}}>{usuario.numero}</Text>
                        </View>
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <View style={{width: '100%', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#B5B5B5'}}>
                              <Text style={{fontSize: 18, fontWeight: 'bold' ,fontStyle: 'normal', color: '#9afc07'}}>META</Text> 
                              <Text style={{fontSize: 32, fontStyle: 'normal', fontWeight: 'bold', color: '#FFF'}}>{usuario.metafinal}</Text>
                        </View>
                        <View style={{width: '100%', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#B5B5B5'}}>
                              <Text style={{fontSize: 18, fontWeight: 'bold' ,fontStyle: 'normal', color: '#9afc07'}}>CONQUISTA DA META</Text> 
                              <Text style={{fontSize: 32, fontStyle: 'normal', fontWeight: 'bold', color: '#FFF'}}>{((state.progressofinal/usuario.metafinal)*100).toFixed(2)}%</Text>
                        </View>
                        <View style={{width: '100%', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#B5B5B5'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold' ,fontStyle: 'normal', color: '#9afc07'}}>VOTOS CONQUISTADOS</Text> 
                            <Text style={{fontSize: 32, fontStyle: 'normal', fontWeight: 'bold', color: '#FFF'}}>{parseInt(state.progressofinal)}</Text>
                        </View>
                    </View> 
                </Opcao>
                </ScrollView>
            </View>
            </ImageBackground>
        );
    }
}