import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import ZoneGame from '../pages/ZoneGame';

export type StackParamsList = {
    ZoneGame: undefined;
    Chat: undefined;
}

const Stack = createNativeStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7b2e7c',
                },
                headerTintColor: '#fff',
                headerShadowVisible: false
            }}>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="ZoneGame" component={ZoneGame} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default AppRoutes;