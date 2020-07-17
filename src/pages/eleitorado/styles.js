import styled from 'styled-components';
import { Text } from 'react-native';
import { Surface } from 'react-native-paper';
export const Texto = styled.Text`
    text-align: justify;
    font-family: Arial;
    font-size: 25px;
`;

export const TextoMenu = styled.Text`
    font-size: 20px; 
    font-weight: bold;
    color: white;
`;

export const SubTitulo = styled.Text`
    font-size: 18px; 
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-color: #FFF;
    text-align: center;
    margin: 10px 0;
    color: #FFF;
    padding: 12px;
    font-weight: bold;
`;



export const TextoBotao = styled.Text`
    font-size: 18px; 
    font-weight: bold;
`;

export const Opcao = styled.View`
    margin: 5px 0px;
    padding: 15px;
    height: auto;
    background: #fff;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 10px;
    justify-content: space-between;
    color: #000;

`;

export const Pickers = styled.View`
    border-color: black;
    width: 100%;
    margin: 10px 0;
    background: #fff;
    border-radius: 8px;
    padding-left: 10px;
`;

export const Botao = styled.TouchableOpacity`
    background: #fff;
    width: 35%;
    border-width: 1px;
    border-radius: 5px;
    height: 40px;
    align-items: center;
    justify-content: center;
`;
