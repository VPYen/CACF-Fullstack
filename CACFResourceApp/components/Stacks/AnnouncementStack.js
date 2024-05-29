import { createStackNavigator } from '@react-navigation/stack';

// Pages
import HomePage from "../Pages/HomePage";
import AnnouncementDetailPage from "../Pages/AnnouncementDetailPage";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "maroon",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
};

function AnnouncementStack(){
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Announcements Home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Announcement Details" component={AnnouncementDetailPage} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
};

export default AnnouncementStack;