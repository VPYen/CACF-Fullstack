// Dependencies
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

// Components
import Header from './components/Header';
import PageMenu from './components/PageMenu';

// Admin Components
// import AboutUsAdmin from './components/Pages/AdminPages/AboutUsAdmin';
// import AnnouncementAdmin from './components/Pages/AdminPages/AnnouncementsAdmin';
// import EventsAdmin from './components/Pages/AdminPages/EventsAdmin';
// import MediaAdmin from './components/Pages/AdminPages/MediaAdmin';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer >
      <Header />
      <PageMenu />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
