import { View, Text, StyleSheet } from "react-native";

export default function AnnouncementDetailPage({ route }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ route.params.subject }</Text>
            <Text style={styles.text}>{ route.params.description }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 15,
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 5,
        marginVertical: 8,
        alignSelf: "center",
        marginHorizontal: 8,
        backgroundColor: "darkgray",
    },

});