import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList } from  "react-native";

function AboutUsPage(){
    const [aboutUs, setAboutUs] = useState([]);
    
    const url = "http://10.0.2.2:8000/api/abouts/all";

    useEffect(() => {
        fetch(url, {
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    'Content-Type': "application/json"
                }
            })
            .then((response) => response.json())
            .then((json) => setAboutUs(json))
            .catch((error) => console.error(error));
    },[])

    let content;

    if (aboutUs.abouts){
        content = <FlatList 
                    data={aboutUs.abouts} 
                    renderItem={({ item }) => (
                        <View>
                        <Image>{item.picture}</Image>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        </View>
                    )}
                  />
    }else{
        content = <Text>No profiles available</Text>
    }

    return(
        <View style= {styles.container}>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        // flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    title: {
        fontSize: 30,
        height: 80,
        flexDirection: 'row',
        // alignItems: 'center',
        paddingTop: 10
    },
    body_about: {
        fontSize: 17,
        paddingBottom: 30,
        textAlign: 'center',
    },
    body: {
        alignItems: 'center',
    },
    staff_image: {
        width: 110,
        height: 110,
        // alignItems: 'center',
    },
    staff_name: {
        textAlign: 'center'
    },
    staff_info: {
        textAlign: 'center'
    }
});

export default AboutUsPage;