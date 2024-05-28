import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/auth.routes';

export default function SignIn() {

    const { signIn } = useContext(AuthContext);

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleRegister() {

        try {
            if (login === "" || senha === "") {
                Alert.alert("Preencha todos os campos!")
            } else {
                console.log(login, senha)
                await api.post('/usuario', {
                    login: login,
                    senha: senha
                })
                Alert.alert("Cadastrado com sucesso!");
                setLogin('');
                setSenha('');
                navigation.popToTop();
            }
        } catch (err) {
            console.log(err);
            Alert.alert("Erro ao cadastrar usuario!");
        }

    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />

            <View style={styles.inputContainer}>

                <Text style={styles.tituloPagina}>Faça seu cadastro!</Text>

                <TextInput
                    placeholder='Digite seu login'
                    style={styles.input}
                    value={login}
                    onChangeText={setLogin}
                />

                <TextInput
                    placeholder='Digite sua senha'
                    style={styles.input}
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7b2e7c'
    },
    tituloPagina: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 25
    },
    logo: {
        marginBottom: 18
    },
    logoText: {
        color: '#fff',
        fontSize: 16
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#f8f8f8',
        marginBottom: 12,
        borderRadius: 20,
        paddingHorizontal: 8,
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#57037E',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})