import { StyleSheet, View, Text, Image } from  "react-native";
// import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export default function Header() {

    return (
        <View style={styles.header}>
            <Image
                style={styles.logo}
                source={require('../assets/chiAlpha_cropped.png')}
            />
            <Text style={styles.headerText}>WSU Chi Alpha: Christian Fellowship</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "10%",
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },

    headerText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 14.5,
        letterSpacing: 1,
        marginLeft: "5%"
    },
    logo: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    }
});