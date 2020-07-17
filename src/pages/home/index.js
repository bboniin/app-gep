import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ImageBackground,
    ScrollView
} from 'react-native';
import {
    Surface,
} from 'react-native-paper'

import { withNavigation } from 'react-navigation'

import agenda from './../../images/agenda.png';
import eleitores from './../../images/eleitores.png';
import cadastro from './../../images/cadastro.png';
import info from './../../images/info.png';
import fundo from './../../images/fundo.png';
import Foto from './../../images/lincoln.png'


import { Texto, TextoMenu, TextoBotao, Opcao } from './styles'

export default class Home extends Component{
    constructor(props){
        super(props);
            this.state ={
                usuario: {foto: ''},
                error: true
            }
    }


    async componentDidMount(){
        const user = await AsyncStorage.getItem('usuario')
        this.setState({usuario: JSON.parse(user)})
    }

    render(){
        
        const usuario = this.state.usuario
        
        return(
            <ImageBackground source={fundo} style={{flex: 1}}>
                <View style={{ height: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <TextoMenu>HOME</TextoMenu>
                </View>
                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center'}}>

                        <View style={{height: 135, width: 135, borderRadius: 85,  marginTop: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFF'}}>
                        <Image source={(!usuario.foto) ? (Foto) : ({uri: usuario.foto})} style={{width: 125, height: 125, borderRadius: 75}}/> 
                        </View>
                          <View  style={{height: 'auto', margin: 35, marginBottom: 0,  paddingBottom: 30, width: '82%', borderBottomWidth: 1, borderColor: '#B5B5B5'}}>
                        <Texto style={{fontSize: 18, fontWeight: 'bold', fontStyle: 'normal', color: '#FFF', textAlign: 'center'}}>{`Bem-Vindo ${usuario.nome}.\nFOQUE NA SUA META FINAL!`}</Texto>
                    </View>
                        <TouchableOpacity style={{width: '82%', borderBottomWidth: 1, borderColor: '#B5B5B5'}} onPress={()=>{this.props.navigation.navigate('Informacoes')}}>
                                <Image source={info} style={{width: 300, height: 100, resizeMode: 'contain'}}/> 
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '82%', borderBottomWidth: 1, borderColor: '#B5B5B5'}} onPress={()=>{this.props.navigation.navigate('Eleitorado')}}>
                                <Image source={eleitores} style={{width: 300, height: 100, resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '82%', borderBottomWidth: 1, borderColor: '#B5B5B5'}} onPress={()=>{this.props.navigation.navigate('Agenda')}}>
                                <Image source={agenda} style={{width: 300, height: 100, resizeMode: 'contain'}}/>        
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '82%', borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 100}} onPress={()=>{this.props.navigation.navigate('Cadastro')}}>
                                <Image source={cadastro} style={{width: 300, height: 100, resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}