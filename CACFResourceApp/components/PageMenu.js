import  Ionicons  from "@expo/vector-icons/Ionicons"
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Pages
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import GivingPage from "./Pages/GivingPage";
import MediaPage from "./Pages/MediaPage";

// Stacked Pages
import AnnouncementStack from"./Stacks/AnnouncementStack";
import EventStack from "./Stacks/EventStack";

// Route Names
const Home = "Home";
const Events = "Events";
const Media = "Media";
const Give = "Give";
const Contact = "ContactUs";
const About = "AboutUs";

const Tab = createBottomTabNavigator();

function PageMenu(){
    return(
        <Tab.Navigator
            initialRouteName={Home}
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    
                    if (route.name === Home) {
                        iconName = focused ? "home" : "home-outline"
                    }else if (route.name === Events) {
                        iconName = focused ? "list" : "list-outline"
                    }else if (route.name === Media) {
                        iconName = focused ? "image" : "images-outline"
                    }else if (route.name === Give){
                        iconName = focused ? "wallet" : "wallet-outline"
                    }else if (route.name === Contact){
                        iconName = focused ? "mail" : "mail-outline"
                    }else if (route.name === About){
                        iconName = focused ? "information" : "information-circle-outline"
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "firebrick",
                tabBarInactiveTintColor: "antiquewhite",
                tabBarStyle: {
                    backgroundColor: "black",
                    bordercolor: "red",
                },
                headerStyle: { backgroundColor: "maroon" },                
                headerTitleStyle:{ color: "white" }                
            })}
            >
                
            <Tab.Screen name={Home} component={AnnouncementStack} />
            <Tab.Screen name={Events} component={EventStack} />
            {/* <Tab.Screen name={Media} component={MediaPage} />
            <Tab.Screen name={Give} component={GivingPage} />
            <Tab.Screen name={Contact} component={ContactUsPage} />
            <Tab.Screen name={About} component={AboutUsPage} /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default PageMenu;