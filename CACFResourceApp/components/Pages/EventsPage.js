import {useState, useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";



export default function EventsPage({navigation}) {
    const [events, setEvents] = useState([]);

    const url = "http://10.0.2.2:8000/api/events/all";
    // const url_question = "http://10.0.2.2:8000/api/events/all";

    useEffect(() => {
        fetch(url, {
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((json) => setEvents(json))
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

    for (let i = 0; i < events; i++){
        for (let j = 0; j < events[i].questions; i++){
            questions.push({
                id: i,
                question: questions[i].question,
                response: ""
            });
        }
    }

    if (events.events){
        content = <FlatList 
                    data={events.events} 
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Event Details', item)} style={styles.item}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                  />
    }else{
        content = <Text style={styles.item}>No events available</Text>
    }

    return (
       <View>
        {content}
       </View> 
    );
}