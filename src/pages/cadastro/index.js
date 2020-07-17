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

import { format, addDays } from 'date-fns'
import fundo from './../../images/fundo.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from './../../services/firebase'
import back from './../../images/back.png'

import { TextoMenu, Opcao, Helper, TextoBoto , Input, TextoPicker, Pickers, BoxInput, Botao, TextoBotao } from './styles'

export default class Cadastro extends Component{ 
    
    constructor(props){
        super(props);
            this.state ={
                usuario: [],
                eleitores: [],
                exibireleitores: [],
                error: false,
                tipo:  null,
                nome: '',
                data: '',
                visible: false,
                visibleeleitor: false,
                visibleerror: false,
                visiblevereador: false,
                telefone: '',
                titulo: '',
                profissao: '',
                bairro: '',
                nascimento: '',
                voto: '',
                relacao: '',
                observacao: '',
                nomeurna: '',
                foto: '',
                numero: '',
                partido: '',
                metafinal: '',
                user: '',
                senha: '',
                foto: '',
                error: false
            }
    }

    handlerCadastrarEleitor(){
        
        let dados = this.state
        if( !dados.nome || !dados.telefone || !dados.bairro ||
          !dados.voto || !dados.observacao || !dados.relacao){
             this.setState({error: true, visibleerror: true})
         }else{
        const usuarios = firebase.database().ref('eleitores').child(dados.usuario.numero);
        let chave = usuarios.push().key;
        usuarios.child(chave).set({
            nome: dados.nome,
            telefone: dados.telefone,
            bairro: dados.bairro,
            profissao: dados.profissao,
            nascimento: dados.data,
            titulo: dados.titulo,
            voto: dados.voto,
            relacao: dados.relacao,
            observacao: dados.observacao
        })
        this.setState({ 
        visibleeleitor: true,
        nome: '',
        telefone: '',
        bairro: '',
        titulo: '',
        profissao: '',
        data: '',
        voto: '',
        relacao: '',
        observacao: '',
        error: false})
         }
    }

    handlerCadastrarUsuario(){
        let dados = this.state
        if( !dados.nome || !dados.telefone || !dados.bairro ||  !dados.metafinal || !dados.partido || 
          !dados.nomedeurna || !dados.user || !dados.senha || !dados.numero){
             this.setState({error: true, visibleerror: true})
         }else{
                const usuarios = firebase.database().ref('usuarios');
                let chave = usuarios.push().key;
                usuarios.child(chave).set({
                    nome: dados.nome,
                    telefone: dados.telefone,
                    bairro: dados.bairro,
                    nomedeurna: dados.nomedeurna,
                    partido: dados.partido,
                    foto: dados.foto,
                    numero: dados.numero,
                    metafinal: dados.metafinal,
                    usuario: dados.user,
                    senha: dados.senha,
                    tipo: dados.tipo,
                    foto: dados.foto
                })
                this.setState({
                visiblevereador: true,
                nome: '',
                telefone: '',
                bairro: '',
                numero: '',
                foto: '',
                nomedeurna: '',
                foto: '',
                partido: '',
                metafinal: '',
                usuario: '',
                senha: '',
                tipo: ''})
        }
    }


    async componentDidMount(){
        const user = await AsyncStorage.getItem('usuario')
        this.setState({usuario: JSON.parse(user)})
        let dados = this.state.usuario
        firebase.database().ref('eleitores').child(dados.numero).on('value', (item)=>{
            let dados = this.state;
            dados.exibireleitores.push({
              nome: 'Selecione uma opção'
            })
            dados.exibireleitores.push({
              nome: 'Nenhuma Relação'
           })
            item.forEach((data)=>{
                dados.exibireleitores.push({
                    nome: data.val().nome
                })
            })
            dados.eleitores = dados.exibireleitores;
            this.setState(dados);
        })
    }

     render(){ 
        const dados = this.state
        return(    
           <ImageBackground source={fundo} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{height: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Home')
                    }}
                    style={{width:'32%', marginLeft: 18}}>
                    <Image source={back} style={{width: 25, height: 25, float: 'left'}}/>
                    </TouchableOpacity> 
                    <TextoMenu>CADASTRO</TextoMenu>
                </View>
                <ScrollView style={{ padding: 25}}>
                <Opcao style={{borderBottomWidth: 1, marginBottom: 20, borderColor: '#b6b6b6'}}>
                    <TextoPicker>O que deseja cadastrar?</TextoPicker>  
                    {
                      dados.usuario.tipo == 'Vereador' ? 
                      (
                        <Pickers style={{marginTop: 8, marginBottom: 20}}>            
                        <Picker
                        selectedValue={dados.tipo}
                        onValueChange={(item)=>{this.setState({tipo: item})}}
                        >   
                            <Picker.Item key={0} value={null} label="Selecione uma opção" />
                            <Picker.Item key={1} value='Eleitor' label="Eleitor" />
                        </Picker>
                       </Pickers>
                      )
                      :
                      (
                        <Pickers style={{marginTop: 8, marginBottom: 20}}>            
                        <Picker
                        selectedValue={dados.tipo}
                        onValueChange={(item)=>{this.setState({tipo: item})}}
                        >   
                            <Picker.Item key={0} value={null} label="Selecione uma opção" />
                            <Picker.Item key={1} value='Eleitor' label="Eleitor" />
                            <Picker.Item key={2} value='Vereador' label="Vereador" />
                        </Picker>
                     </Pickers>
                      )
                    }
                   
                </Opcao>
                {
                    dados.tipo == 'Eleitor' && 
                    (
                    <View>
                    <Opcao>
                        
                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Nome"
                        value={dados.nome}
                        onChangeText={(texto)=>{this.setState({nome: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.nome}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        keyboardType='phone-pad'
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Telefone"
                        value={dados.telefone}
                        onChangeText={(texto)=>{this.setState({telefone: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.telefone}
                    >
                      Campo obrigatório
                    </Helper>
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

                    <BoxInput style={{ marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0}}
                        placeholder="Bairro"
                        value={dados.bairro}
                        onChangeText={(texto)=>{this.setState({bairro: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.bairro}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput   style={{width: '48%'}}>
                        <TouchableOpacity
                        style={{backgroundColor: '#FFF', height: 55, borderRadius: 8, elevation: 3, justifyContent: 'center'}}
                        onPress={()=>{this.setState({visible: true})}}>
                            {this.state.data ==  ''
                             ? 
                             <Text style={{fontSize: 15, opacity: 0.4, marginLeft: 12}}>Data de Nascimento</Text> 
                             :
                             (
                                <View>
                             <Text style={{fontSize: 16, marginLeft: 14}}>{format(addDays(new Date(this.state.data), 1), 'dd/MM/yyyy')}</Text>
                                </View>
                             )
                             }
                        </TouchableOpacity>
                    </BoxInput>
                    
                    {
                        this.state.visible && (
                            <DateTimePicker
                            mode="date"
                            value={new Date()}
                            onChange={(event, day)=>{
                                let data = format(new Date(day), 'yyyy-MM-dd')
                                this.setState({data: data, visible: false})}}
                            />
                        )
                    }
                    

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Pickers
                    style={{ height: 55, borderRadius: 8, elevation: 3, justifyContent: 'center'}}>            
                        <Picker
                        style={{margin: -8, opacity: 0.5}}
                        selectedValue={dados.voto}
                        onValueChange={(item)=>{this.setState({voto: item})}}
                        >   
                            <Picker.Item key={0} value={null} label="Voto" />
                            <Picker.Item key={1} value='Certo' label="Voto Certo" />
                            <Picker.Item key={2} value='A Confirmar' label="Voto A Confirmar" />
                            <Picker.Item key={3} value='A Conquistar' label="Voto A Conquistar" />
                            <Picker.Item key={4} value='Perdido' label="Voto Perdido" />
                        </Picker>
                     </Pickers>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.voto}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{ marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                        placeholder="Relação"
                        value={dados.pesquisa}
                        
                        onChangeText={(text)=>{
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
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.relacao}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>
                    <BoxInput>
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
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.observacao}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>
                    </Opcao>
                    <Botao
                        onPress={()=> this.handlerCadastrarEleitor()}
                    >
                        <TextoBoto>CADASTRAR ELEITOR</TextoBoto>
                    </Botao>
                    </View>
                    )
                }
                
                {
                    dados.tipo == 'Vereador' && 
                    (
                    <View>
                    <Opcao>
                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Nome"
                        value={dados.nome}
                        onChangeText={(texto)=>{this.setState({nome: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.nome}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Nome de Urna"
                        value={dados.nomedeurna}
                        onChangeText={(texto)=>{this.setState({nomedeurna: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.nomedeurna}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        keyboardType="numeric"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Número"
                        value={dados.numero}
                        onChangeText={(texto)=>{this.setState({numero: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.numero}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Partido"
                        value={dados.partido}
                        onChangeText={(texto)=>{this.setState({partido: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.partido}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Bairro"
                        value={dados.bairro}
                        onChangeText={(texto)=>{this.setState({bairro: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.bairro}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        keyboardType="numeric"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Meta Final"
                        value={dados.metafinal}
                        onChangeText={(texto)=>{this.setState({metafinal: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.metafinal}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        keyboardType="numeric"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Telefone"
                        value={dados.telefone}
                        onChangeText={(texto)=>{this.setState({telefone: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.telefone}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>
                    
                    <BoxInput style={{ marginBottom: 2}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Foto"
                        value={dados.foto}
                        onChangeText={(texto)=>{this.setState({foto: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.foto}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 0}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Usúario"
                        value={dados.usuario}
                        onChangeText={(texto)=>{this.setState({user: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.user}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    <BoxInput style={{width: '48%', marginBottom: 2}}>
                    <Input
                        underlineColor="white"
                        selectionColor="black"
                        style={{ backgroundColor: '#fff', margin: 0 }}
                        placeholder="Senha"
                        value={dados.senha}
                        onChangeText={(texto)=>{this.setState({senha: texto})}}
                    ></Input>
                    <Helper
                      type="error"
                      visible={this.state.error && !this.state.senha}
                    >
                      Campo obrigatório
                    </Helper>
                    </BoxInput>

                    </Opcao>
                    <Botao
                        onPress={()=> this.handlerCadastrarUsuario()}
                    >
                        <TextoBoto>CADASTRAR VEREADOR</TextoBoto>
                    </Botao>
                    </View>
                    )
                }
                </ScrollView>
                <Portal>
                    <Dialog
                    visible={this.state.visibleeleitor}>
                    <Dialog.Title>Párabens</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>{'Eleitor cadastrado com Sucesso!!'}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 4, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                         let dados = this.state
                        dados.visibleeleitor = false
                         this.setState({dados})
                        }}>FECHAR</Button>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Portal>
                    <Dialog
                    visible={this.state.visibleerror}>
                    <Dialog.Title>Cuidado</Dialog.Title>
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
                <Portal>
                    <Dialog
                    visible={this.state.visiblevereador}>
                    <Dialog.Title>Parabéns</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>{'Usúario cadastrado com Sucesso!!'}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <TouchableOpacity
                        color="black"
                        labelStyle={{borderWidth: 1, padding: 4, borderRadius: 5, color: 'black', fontSize: 16, fontWeight: 'bold' }}
                        onPress={() =>{
                         let dados = this.state
                        dados.visiblevereador = false
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