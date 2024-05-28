import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

import { api } from '../../services/api';

import { CardCards } from '../../components/CardCards';

import { AuthContext } from '../../contexts/AuthContext';

export type DeckCardProps = {
    descricao: string;
    id: string;
    img_carta: string;
    poder_ataque: string;
    poder_defesa: string;
}

export default function Dasboard() {

    const [listDeck, setListDeck] = useState<DeckCardProps[] | []>([]);
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const { usuario, logOut } = useContext(AuthContext);

    async function handleGerarDeck() {

        try {

            const response = await api.get('/listar_deck/5');

            //info
            console.log('-----------/info deck/------------')
            console.log(response.data);


            //criar os cards e salvar no asyncStorage
            setListDeck(response.data)



        } catch (err) {
            console.log('erro ao acessar', err);
        }

    }

    async function handleJogar(){
        await AsyncStorage.setItem('@deckplay', JSON.stringify(listDeck));

        navigation.navigate('ZoneGame');

    }

    async function handleSair(){

        logOut();

    }

    return (
        <ScrollView style={styles.containerScroll}>
            <View style={styles.container}>
                <View style={styles.containerFuncao}>

                    <Text style={styles.text}>Usuario: {usuario.user}</Text>

                    <TouchableOpacity style={styles.button} onPress={handleGerarDeck}>
                        <Text style={styles.buttonText}>Gerar Deck</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleJogar}>
                        <Text style={styles.buttonText}>Jogar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSair}>
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.linha}></View>

                <CardCards
                    options={listDeck}
                />

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerScroll: {
        backgroundColor: '#7b2e7c',
    },
    container: {
        flex: 1,
        backgroundColor: '#7b2e7c',
        alignItems: 'center'
    },
    containerFuncao: {
        marginTop: '10%',
        width: '90%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30
    },
    button: {
        height: 50,
        backgroundColor: '#57037E',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 15
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    linha: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 20,
        height: 1,
        width: '90%',
        backgroundColor: '#fff'
    }
})