import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Home from "../screens/Home";
import Search from "../screens/Search";
import MyPage from "../screens/MyPage";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Search" component={Search}/>
      <Tab.Screen name="MyPage" component={MyPage}/>
    </Tab.Navigator>
  )
}

export default Tabs