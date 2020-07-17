import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Picker,
    TextInput,
    ScrollView,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import {
    Dialog,
    Paragraph,
    Portal,
    Button,
    Text,
    Searchbar,
} from 'react-native-paper'
import firebase from './../../services/firebase'
import back from './../../images/back.png'
import edit from './../../images/edit.png'


import fundo from './../../images/fundo.png';
import { TextoMenu, Opcao, Pickers, Botao, SubTitulo } from './styles'

export default class Eleitorado extends Component{ 
    
    constructor(props){
        super(props);
            this.state ={
                exibireleitores: [],
                eleitores: [],
                usuario: {},
                pesquisa: '',
                visible: '',
                mensagem: '',
                key: '',
                error: true,
                tipo: null
            }
    }


    async componentDidMount(){
        const user = await AsyncStorage.getItem('usuario')
        this.setState({usuario: JSON.parse(user)})
        let dados = this.state.usuario
        firebase.database().ref('eleitores').child(dados.numero).on('value', (item)=>{
            let dados = this.state;
            item.forEach((data)=>{
                dados.exibireleitores.push({
                    key: data.key,
                    nome: data.val().nome,
                    titulo: data.val().titulo,
                    telefone: data.val().telefone,
                    bairro: data.val().bairro,
                    voto: data.val().voto,
                    profissao: data.val().profissao,
                    referencia: data.val().relacao,
                    observacao: data.val().observacao
                })
            })
            dados.eleitores = dados.exibireleitores;
            this.setState(dados);
        })
    }

    handlerFiltrar(tipo){
        let ok = tipo
        let dados = this.state
        dados.tipo = tipo
        if(tipo != "Todos"){
            dados.exibireleitores = [];
            dados.eleitores.map((item)=>{
                if(tipo == item.voto){
                    dados.exibireleitores.push(item)
                }
        })
        }else{
            dados.exibireleitores = dados.eleitores
        }
        this.setState({dados})
    }

     render(){ 
        const dados = this.state
        const state = this.state.usuario
        return(
            <ImageBackground source={fundo} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{ height: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Home')
                    }}
                    style={{width:'32%', marginLeft: 18}}>
                    <Image source={back} style={{width: 25, height: 25, float: 'left'}}/>
                    </TouchableOpacity> 
                    <TextoMenu>ELEITORES</TextoMenu>
                </View>
                <ScrollView style={{padding: 25, paddingBottom: 0}}>
                <View>
                    <Text style={{color: '#FFF'}}>Filtro</Text>   
                    <Pickers> 
                        <Picker
                        selectedValue={dados.tipo}
                        onValueChange={(tipo)=>{this.handlerFiltrar(tipo)}}
                        >   
                            <Picker.Item key={0} value='Todos' label="Todos" />
                            <Picker.Item key={1} value='Certo' label="Votos Certos" />
                            <Picker.Item key={2} value='A Confirmar' label="Votos A Confirmar" />
                            <Picker.Item key={3} value='A Conquistar' label="Votos A Conquistar" />
                            <Picker.Item key={4} value='Perdido' label="Votos Perdidos" />
                            <Picker.Item key={5} value='Nome' label="Nome" />
                            <Picker.Item key={6} value='Bairro' label="Bairro" />
                            <Picker.Item key={6} value='Relação' label="Relação" />
                        </Picker>
                    
                    </Pickers> 
                    {
                        dados.tipo == "Nome" && (
                            <TextInput
                        onChangeText={(text)=>{
                            let dados = this.state
                            dados.pesquisa = text
                            dados.exibireleitores = []
                            dados.eleitores.map((item)=>{
                                if(dados.pesquisa == String(item.nome).substr(0,dados.pesquisa.length)){
                                    dados.exibireleitores.push(item)
                                }
                            })
                            this.setState({dados})
                        }}
                        style={{borderRadius: 5, backgroundColor: '#fff', height: 55, paddingLeft: 15}}
                        value={dados.pesquisa}
                        placeholder="Digite o nome"
                    />     
                        )
                    }
                     {
                        dados.tipo == "Bairro" && (
                            <TextInput
                        onChangeText={(text)=>{
                            let dados = this.state
                            dados.pesquisa = text
                            dados.exibireleitores = []
                            dados.eleitores.map((item)=>{
                                if(dados.pesquisa == String(item.bairro).substr(0,dados.pesquisa.length)){
                                    dados.exibireleitores.push(item)
                                }
                            })
                            this.setState({dados})
                        }}
                        style={{borderRadius: 5, backgroundColor: '#fff', height: 55, paddingLeft: 15}}
                        value={dados.pesquisa}
                        placeholder="Digite o bairro"
                    />     
                        )
                    }
                     {
                        dados.tipo == "Relação" && (
                            <TextInput
                        onChangeText={(text)=>{
                            let dados = this.state
                            dados.pesquisa = text
                            dados.exibireleitores = []
                            dados.eleitores.map((item)=>{
                                if(dados.pesquisa == String(item.referencia).substr(0,dados.pesquisa.length)){
                                    dados.exibireleitores.push(item)
                                }
                            })
                            this.setState({dados})
                        }}
                        style={{borderRadius: 5, backgroundColor: '#fff', height: 55, paddingLeft: 15}}
                        value={dados.pesquisa}
                        placeholder="Digite a relação "
                    />     
                        )
                    }
                    
                </View>
                        <SubTitulo>{this.state.exibireleitores.length} ELEITORES CADASTRADOS</SubTitulo>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginBottom: 50}}>
                        {
                            this.state.exibireleitores.map( (item, index ) => {
                                return (
                                    <Opcao>
                                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <View style={{ width: '65%'}}>
                                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>Nome: {item.nome}</Text>
                                                <Text style={{fontSize: 10, fontWeight: 'bold'}}>Bairro: {item.bairro}</Text>
                                                <Text style={{fontSize: 10, fontWeight: 'bold'}}>Relação: {item.referencia}</Text>
                                            </View>
                                                <Botao
                                                 onPress={()=>{ 
                                                    let mensagem = `Nome: ${(!item.nome) ? ' ---------------------' : (item.nome)}\nStatus do Voto: ${(!item.voto) ? ' ---------------------' : (item.voto)}\nTelefone: ${(!item.telefone) ? ' ---------------------' : (item.telefone)}\nProfissão: ${(!item.profissao) ? ' ---------------------' : (item.profissao)}\nBairro: ${(!item.bairro) ? ' ---------------------' : (item.bairro)}\nTitulo: ${(!item.titulo) ? ' ---------------------' : (item.titulo)}\nRelação: ${(!item.referencia) ? ' ---------------------' : (item.referencia)}\nObservação: ${(!item.observacao) ? ' ---------------------' : (item.observacao)}`
                                                    this.setState({visible: true, mensagem, key: item.key})
                                                 
                                                 }}>
                                                    <Text style={{fontSize: 12, textAlign: 'center'}} >{item.detalhes ? 'Ocultar' : 'Exibir'} Detalhes</Text>
                                                </Botao>
                                        </View>
                                        <View>
                                               
                                        </View>
                                        </Opcao>
                                )
                                
                                }
                            )
                        }
                </View>
                </ScrollView>
                
                <Portal>
                    <Dialog
                    visible={this.state.visible}>
                    <Dialog.Title>Dados Eleitor</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>{this.state.mensagem}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <TouchableOpacity
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 5, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                            this.props.navigation.navigate("EditarCadastro", {key: `${dados.usuario.numero}/${this.state.key}`,  numero: state.numero})
                        }}><Image source={edit} style={{width: 75, height: 40, marginRight: 15, marginBottom: 0, resizeMode: 'contain'}}/></TouchableOpacity>
                        <TouchableOpacity
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 5, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                         let dados = this.state
                        dados.visible = false
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