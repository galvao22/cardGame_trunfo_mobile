import React, { useState, createContext, ReactNode } from 'react';
import { Alert } from 'react-native';

import { api } from '../services/api';

type AuthContextData = {
    usuario: UsuarioProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    logOut: () => void;
}

type UsuarioProps = {
    id: string;
    user: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    login: string;
    senha: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioProps>({
        id: '',
        user: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false);

    const isAuthenticated = !!usuario.user;

    async function signIn({ login, senha }: SignInProps) {
        setLoadingAuth(true);

        try {

            const response = await api.post('/login', {
                login,
                senha
            })

            //info
            console.log('-----------/info login/------------')
            console.log(response.data)

            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

            setUsuario({
                id: response.data.id,
                user: response.data.login,
                token: response.data.token
            })

            setLoadingAuth(false);

        } catch (err) {
            console.log('erro ao acessar', err);
            setLoadingAuth(false);
        }

    }

    async function sessionTimeOut() {

        setUsuario({
            id: '',
            user: '',
            token: ''
        })

    }

    //metodo para logout
    async function logOut() {
        setLoadingAuth(true);

        try {

            sessionTimeOut();
            setLoadingAuth(false);

        } catch (err) {
            Alert.alert("Atenção", "Erro ao acessar o servidor de dados. Por favor, tente novamente mais tarde!")
            sessionTimeOut();
            setLoadingAuth(false);
        }

    }

    return (
        <AuthContext.Provider value={{ usuario, isAuthenticated, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}