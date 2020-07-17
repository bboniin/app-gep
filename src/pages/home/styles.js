import styled from 'styled-components';
import { Text } from 'react-native';
import { Surface } from 'react-native-paper';
export const Texto = styled.Text`
    text-align: center;
    font-family: Arial;
    font-weight: bold;
    font-size: 28px;
    letter-spacing: 3px;
    line-height: 25px;
`;

export const TextoMenu = styled.Text`
    font-size: 20px; 
    font-weight: bold;
    font-family: Roboto;
    color: white;
`;


export const TextoBotao = styled.Text`
    font-size: 18px; 
    font-weight: bold;
`;

export const Opcao = styled(Surface)`
    padding: 12px;
    height: 90px;
    flex-direction: row;
    align-items: center;
    elevation: 4;

`;