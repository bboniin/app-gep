import React from 'react'
import {
    View,
    Text,
} from 'react-native';



import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './routes';

export default function App(){
    return(
    <PaperProvider>
        <Routes/>
    </PaperProvider>
    )
}