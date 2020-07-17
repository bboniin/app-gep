import styled from 'styled-components';
import { Text, TouchableOpacity, View } from 'react-native';
import { Surface, HelperText } from 'react-native-paper';

export const Data = styled.TouchableOpacity`
    elevation: 4;
    width: 100%;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 0%;
    background: #fff;
`;

export const Label = styled.Text`
    font-size: 15px;
    margin: 15px;
    opacity: 0.5;
`;

export const Texto = styled.Text`
    text-align: justify;
    font-family: Arial;
    font-size: 25px;
`;

export const TextoMenu = styled.Text`
    font-size: 20px; 
    font-weight: bold;
    color: #fff;
`;


export const TextoBoto = styled.Text`
    font-size: 12px; 
    font-weight: bold;
    color: #000;
`;

export const Input = styled.TextInput`
    color: #000;
    elevation: 2;
    border-radius: 8px;
    padding: 10px;
`;

export const Opcao = styled.View`
    height: auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

`;


export const BoxInput = styled.View`
width: 100%;
margin-bottom: 2;
`; 


export const Pickers = styled.View`
    border-color: black;
    width: 100%;
    margin-bottom: 4%;
    background: #fff;
    padding: 10px 0px 0px 10px;
`;

export const TextoPicker = styled.Text`
    opacity: 0.5;
`;

export const BordaPicker = styled.View`
    border-bottom-width: 1px;
    border-color: #000;
    margin: 0 30px 0 30px;
`;

export const Botao = styled.TouchableOpacity`
    background: #fff;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    height: 40px;
    align-items: center;
    justify-content: center;
`;

export const Helper = styled(HelperText)`
    padding: 0;
    color: #000;
    font-size: 12px;
    margin: 4px;
    
`;