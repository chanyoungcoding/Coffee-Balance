import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';

import Home from "../screens/Home";
import Search from "../screens/Search";
import MyPage from "../screens/MyPage";
import { BasicColor, ChocolateColor, NomalColor, WhiteCoffeeColor } from "../colors";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();

const LogoImg = () => (
  <Image
    source={require('../assets/coffee/removebgCoffee.png')}
    style={{ width: 60, height: 60 }}
  />
);

const Tabs = () => {
  
  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
      <Tab.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: () => LogoImg(),
        headerStyle: {
          backgroundColor: "white",
          shadowOpacity: 0, 
          borderBottomWidth: 0, 
        },
        tabBarActiveTintColor: BasicColor,
        tabBarInactiveTintColor: ChocolateColor,
        tabBarStyle: {
          backgroundColor: WhiteCoffeeColor,
          paddingTop: 2,
          margin: 10,
          borderRadius: 100,
          shadowColor: "rgba(0, 0, 0, 0.15)",
          shadowOffset: {
            width: 1.95,
            height: 1.95,
          },
          shadowOpacity: 1, // 그림자의 불투명도 100%로 설정
          shadowRadius: 2.6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5
        }
      }}>

        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="home" size={24} color={focused ? BasicColor : ChocolateColor}/>
            )
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={Search}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="search1" size={24} color={focused ? BasicColor : ChocolateColor}/>
            )
          }}
        />
        <Tab.Screen 
          name="MyPage" 
          component={MyPage}
          options={{
            tabBarIcon: ({focused}) => (
              <Feather name="coffee" size={24} color={focused ? BasicColor : ChocolateColor}/>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default Tabs