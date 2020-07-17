import styled from 'styled-components';
import { Text } from 'react-native';
import { Surface } from 'react-native-paper';

export const Texto = styled.Text`
    font-size: 18px;
    text-align: center;
    margin: 15px;
`;

export const Botao = styled.TouchableOpacity`
    background: #fff;
    margin: 18px;
    width: 90%;
    border-radius: 5px;
    height: 40px;
    align-self: center;
    align-items: center;
    justify-content: center;
`;

export const TextoMenu = styled.Text`
    font-size: 20px; 
    font-weight: bold;
    color: white;
`;


export const TextoBotao = styled.Text`
    font-size: 12; 
    font-weight: bold;
    color: #000;
`;

export const Opcao = styled(Surface)`
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
    height: auto;
    min-height: 120px;
    justify-content: center;
    flex-direction: row;
    align-items: center;

`;