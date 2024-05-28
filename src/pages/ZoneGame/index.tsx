import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppIntroSlider from 'react-native-app-intro-slider';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

import { DeckCardProps } from '../Dashboard';

interface CardProps {
    item: DeckCardProps
}

export default function ZoneGame() {

    const [cartaSelecionada, setCartaSelecionada] = useState({});
    const [cartas, setCartas] = useState<DeckCardProps[] | []>([]);

    const [meusPontos, setMeusPontos] = useState(0);
    const [pontosAdversario, setPontosAdversario] = useState(0);

    const [showSlider, setShowSlider] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    useEffect(() => {

        async function getStorage() {
            const infoStorageUser = await AsyncStorage.getItem('@deckplay');
            const info = JSON.parse(infoStorageUser || '[]');

            console.log('=================================================');
            console.log('=================================================');
            console.log('=================================================');

            console.log(info)
            setCartas(info)
            console.log(info.length)

            if (info.length === 0) {
                setShowSlider(true);
            } else {
                setShowSlider(false);
            }

        }

        getStorage();


    }, []);

    function somarM() {
        if (meusPontos < 0) {
            setMeusPontos(0)
        } else {
            setMeusPontos(meusPontos + 1)
        }
    }

    function diminuirM() {
        if (meusPontos <= 0) {
            setMeusPontos(0)
        } else {
            setMeusPontos(meusPontos - 1)
        }
    }

    function somarA() {
        if (pontosAdversario < 0) {
            setPontosAdversario(0)
        } else {
            setPontosAdversario(pontosAdversario + 1)
        }
    }

    function diminuirA() {
        if (pontosAdversario <= 0) {
            setPontosAdversario(0)
        } else {
            setPontosAdversario(pontosAdversario - 1)
        }
    }

    function handleEncerrar() {

        if(meusPontos > pontosAdversario){
            Alert.alert("Resuldado:", "Você ganhou o jogo!");
        } else if(meusPontos === pontosAdversario){
            Alert.alert("Resuldado:", "Jogo empatado!")
        } else {
            Alert.alert("Resuldado:", "Você perdeu o jogo!")
        }
        navigation.popToTop();
    }

    function renderSlides({ item }: CardProps) {
        return (
            <View style={styles.container}>
                <View style={styles.containerItem}>

                </View>
                <Text style={styles.text}>{item.descricao}</Text>
                <Image
                    style={styles.img}
                    source={{ uri: `http://192.168.0.83:3333/files/${item.img_carta}` }}
                />

                <View style={styles.linha}></View>


                <View style={styles.containerPoder}>
                    <Text style={styles.textPoder}>Ataque: </Text><Text style={styles.textAtaque}>{item.poder_ataque}</Text>
                    <Text style={styles.textPoder}>Defesa: </Text><Text style={styles.textDefesa}>{item.poder_defesa}</Text>
                </View>

                <View style={styles.controlePontos}>

                    <View>
                        <Text style={styles.textTitle}>Meus pontos</Text>
                        <Text style={styles.textSubtitle}>{meusPontos}</Text>

                        <View style={styles.containerBotao}>

                            <TouchableOpacity style={styles.button} onPress={somarM}>
                                <Text style={styles.textTitle}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={diminuirM}>
                                <Text style={styles.textTitle}>-</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View>
                        <Text style={styles.textTitle}>Pontos adversário</Text>
                        <Text style={styles.textSubtitle}>{pontosAdversario}</Text>

                        <View style={styles.containerBotao}>

                            <TouchableOpacity style={styles.button} onPress={somarA}>
                                <Text style={styles.textTitle}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={diminuirA}>
                                <Text style={styles.textTitle}>-</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </View>
        )
    }


    if (showSlider) {
        return (
            <ScrollView style={styles.containerScroll}>
                <View style={styles.container}>
                <Text>Você precisa gerar um deck!</Text>
                </View>
            </ScrollView>
        )
    } else {

        return (
            <AppIntroSlider
                renderItem={renderSlides}
                data={cartas}
                activeDotStyle={{
                    backgroundColor: '#009cff',
                    width: 30
                }}
                renderNextButton={() => <Text style={styles.textControles}>Próximo</Text>}
                renderDoneButton={() => <Text style={styles.textControles}>Encerrar</Text>}
                onDone={handleEncerrar}
            />
        )

    }


}

const styles = StyleSheet.create({
    containerScroll: {
        backgroundColor: '#7b2e7c',
    },
    container: {
        flex: 1,
        backgroundColor: '#7b2e7c',
        alignItems: 'center',
    },
    containerItem: {
        marginTop: '30%'
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30
    },
    img: {
        height: 300,
        width: 300
    },
    containerPoder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    textPoder: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    textAtaque: {
        color: 'green',
        marginLeft: -70,
        fontSize: 28
    },
    textDefesa: {
        color: 'red',
        marginLeft: -70,
        fontSize: 28
    },
    linha: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
        height: 1,
        width: '80%',
        backgroundColor: '#fff',
        marginVertical: 20
    },
    textControles: {
        color: '#fff',
        fontSize: 25,
        alignItems: 'center'
    },
    controlePontos: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        marginTop: 30
    },
    containerBotao: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textTitle: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    },
    textSubtitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        height: 50,
        backgroundColor: '#57037E',
        borderRadius: 20,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})