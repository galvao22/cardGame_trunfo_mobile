import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/auth.routes';

export default function SignIn() {

    const { signIn } = useContext(AuthContext);

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleLogin() {
        if (login === '' || senha === '') {
            return;
        }

        await signIn({ login, senha })

    }

    function handleRegister(){
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />

            <View style={styles.inputContainer}>

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

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Conectar</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.linkRegistrar} onPress={handleRegister}>
                    <Text style={styles.textoCentralizado} allowFontScaling={true} maxFontSizeMultiplier={1.3}>
                        Para primeiro acesso, registre-se aqui!
                    </Text>
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
    },
    textoCentralizado: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        textDecorationLine: "underline"
    },
    linkRegistrar: {
        marginTop: 10
    }
})