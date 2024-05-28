import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { DeckCardProps } from '../../pages/Dashboard';

interface CardProps {
    options: DeckCardProps[];
}

interface ArrayImg {
    descricao: string;
    url: string;
}


export function CardCards({ options }: CardProps) {

    /*
    const imagesCards = {
        'pikachu.png': require('../../assets/cards/pikachu.png'),
        'pichu.png': require('../../assets/cards/pichu.png'),
        'dragonite.png': require('../../assets/cards/dragonite.png'),
        'psyduck.png': require('../../assets/cards/psyduck.png'),
        'charmander.png': require('../../assets/cards/charmander.png'),
        'bulbasaur.png': require('../../assets/cards/bulbasaur.png'),
        'squirtle.png': require('../../assets/cards/squirtle.png'),
        'arcanine.png': require('../../assets/cards/arcanine.png'),
        'ponyta.png': require('../../assets/cards/ponyta.png'),
        'gyarados.png': require('../../assets/cards/gyarados.png'),
        'eevee.png': require('../../assets/cards/eevee.png'),
        'aerodactyl.png': require('../../assets/cards/aerodactyl.png'),
        'chikorita.png': require('../../assets/cards/chikorita.png'),
        'cyndaquil.png': require('../../assets/cards/cyndaquil.png'),
        'totodile.png': require('../../assets/cards/totodile.png'),
        'suicune.png': require('../../assets/cards/suicune.png'),
        'celebi.png': require('../../assets/cards/celebi.png'),
        'lugia.png': require('../../assets/cards/lugia.png'),
        'ninetales.png': require('../../assets/cards/ninetales.png'),
        'pidgeot.png': require('../../assets/cards/pidgeot.png'),
    }
    */

    const lista = options.map((item, index) => (
        <View key={index} style={styles.container}>

            <Text style={styles.textDescricao}>{item.descricao}</Text>


            <Image
                style={styles.img}
                source={{ uri: `http://192.168.0.83:3333/files/${item.img_carta}` }}
                //source={imagesCards[item.img_carta as keyof typeof imagesCards]}
            />


            <View style={styles.linha}></View>


            <View style={styles.containerPoder}>
                <Text style={styles.textPoder}>Ataque: </Text><Text style={styles.textAtaque}>{item.poder_ataque}</Text>
                <Text style={styles.textPoder}>Defesa: </Text><Text style={styles.textDefesa}>{item.poder_defesa}</Text>
            </View>



        </View>
    ))

    return (
        <View>
            {lista}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#57037E',
        marginTop: 0,
        marginHorizontal: '5%',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },
    textDescricao: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    containerPoder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    textPoder: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textAtaque: {
        color: 'green',
        marginLeft: -70,
        fontSize: 20,
    },
    textDefesa: {
        color: 'red',
        marginLeft: -70,
        fontSize: 20
    },
    img: {
        height: 300,
        width: 300
    },
    linha: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20
    }
})