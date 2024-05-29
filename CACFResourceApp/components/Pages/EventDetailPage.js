import { useState, useEffect } from "react";
import { View, Text, StyleSheet, 
         FlatList, Modal, TextInput, 
         TouchableOpacity, SafeAreaView
        } from "react-native";

          
export default function EventDetailPage({ route }) {
    const [name, setName] = useState("");
    const [nameModalVisibility, setNameModalVisibility] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [inputText, setInputText] = useState("");
    const [render, setRender] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [submitResp, setSubmitResp] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            const fetchedQuestions = await Promise.all(
                route.params.questions.map(async (question) => {
                    const response = await fetch(`http://10.0.2.2:8000/api/events/question/${question._id}`);
                    const data = await response.json();
                    return {
                        id: data.question._id,
                        question: data.question.question,
                        response: '',
                    };
                })
            );
            setQuestions(fetchedQuestions);
        };
        fetchData();
    }, []);

    const onPressItem = (item) => {
        setModalVisibility(true);
        setInputText(item.response);
        setEditItem(item.id);
        setSubmitResp("");
    }

    const onPressSaveEdit = () => {
        handleEditItem(editItem, inputText);
        setModalVisibility(false);
    }

    const handleEditItem = (editItemId, editedResponse) => {
        const newQuestions = questions.map(item => {
            if (item.id === editItemId) {
                return {
                    ...item,
                    response: editedResponse
                };
            }
            return item;
        });
        setQuestions(newQuestions);
        setRender(!render);
    }

    const handleSubmit = async () => {
        if (name == ""){
            setSubmitResp({error:"Error: Name is required", color: "red"});
        }
        try {
            for (const question of questions) {
                const response = await fetch(`http://10.0.2.2:8000/api/events/response/new/${question.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        answer: question.response
                    })
                });
                await response.json()
                .then((responseData) =>{
                    if (responseData.success){
                        setSubmitResp({success:"Successfully submitted your responses", color: "green"});
                    }else{
                        setSubmitResp({error:"Error: Unable to submit one or more responses", color: "red"});
                    }
            });
            }
        } catch (error) {
            setSubmitResp({error:"Error: Unable to submit responses", color: "red"});
            console.error(error);
        }
    };

    return (
        <SafeAreaView>
            <Text style={styles.text}>{route.params.title}</Text>
            <Text style={styles.text}>{route.params.description}</Text>
            <TouchableOpacity onPress={() => setNameModalVisibility(true)}>
                <Text style={styles.text}>My Name: {name}</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                visible={nameModalVisibility}
                onRequestClose={() => setNameModalVisibility(false)}
            >
                <View>
                    <Text style={styles.inputLabel}>Enter your name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setName(text)}
                        value={name}
                        editable={true}
                    />
                    <TouchableOpacity onPress={() => setNameModalVisibility(false)}>
                        <Text style={styles.submitButton}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <FlatList
                style={styles.text}
                data={questions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onPressItem(item)}>
                    <Text>{item.question}</Text>
                    <Text>My Response: {item.response}</Text>
                </TouchableOpacity>
                )}
                extraData={render}
            />
            <Modal
                animationType="slide"
                visible={modalVisibility}
                onRequestClose={() => setModalVisibility(false)}
            >
                <View>
                    <Text style={styles.inputLabel}>Enter Your Response</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setInputText(text)}
                        value={inputText}
                        editable={true}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={onPressSaveEdit}>
                        <Text style={styles.submitButton}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
                <Text style={{color: submitResp.color, alignSelf: "center", marginTop: 25, fontSize: 15, fontWeight: "500"}}>{submitResp.success ? submitResp.success : submitResp.error}</Text>
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.submitButton}>Submit</Text>
                </TouchableOpacity>
        </SafeAreaView>
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
    inputLabel: {
        fontSize: 25,
        marginTop: 200,
        marginBottom: 25,
        fontWeight: "500",
        alignSelf: "center",
    },
    input: {
        padding: 5,
        fontSize: 20,
        color: "black",
        borderWidth: 1.5,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "lightgrey",
    },
    submitButton: {
        padding: 10,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'blue',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
});