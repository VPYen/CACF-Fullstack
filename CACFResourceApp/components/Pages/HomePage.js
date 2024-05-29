import {useState, useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";


export default function HomePage({navigation}) {
    const [announcements, setAnnouncement] = useState([]);
    // const [loading, setLoading] = useState(true);

    const url = "http://10.0.2.2:8000/api/announcements/all";

    useEffect(() => {
        fetch(url, {
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((json) => setAnnouncement(json))
            .catch((error) => console.error(error));
    },[])

    let content;
    
    const styles = StyleSheet.create({
        item: {
            padding: 10,
            fontSize: 15,
            borderWidth: 3,
            borderRadius: 5,
            marginVertical: 8,
            marginHorizontal: 8,
            backgroundColor: "darkgray"
        }
    });

    if (announcements.announcements){
        content = <FlatList 
            data={announcements.announcements} 
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Announcement Details', item)} style={styles.item} >
                    <Text>{item.subject}</Text>
                </TouchableOpacity>
            )}
        />
    }else{
        content = <Text style={styles.item}>No announcements available</Text>
    }

    return (
       <View>
        {content}
       </View> 
    );
    
}
