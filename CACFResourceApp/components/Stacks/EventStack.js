import { createStackNavigator } from '@react-navigation/stack';

// Pages
import EventsPage from "../Pages/EventsPage";
import EventDetailPage from "../Pages/EventDetailPage";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "maroon",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
};

function EventStack(){
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Events Home" component={EventsPage} options={{ headerShown: false }} />
            <Stack.Screen name="Event Details" component={EventDetailPage} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
};

export default EventStack;