import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/Signin';

import Register from '../pages/Register';

export type StackParamsList = {
    SignIn: undefined;
    Register: undefined;
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AuthRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7b2e7c',
                },
                headerTintColor: '#fff',
                headerShadowVisible: false
            }}>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;