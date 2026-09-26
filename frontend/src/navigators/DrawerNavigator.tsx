import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import ProfileScreen from "../screen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="TabNavigator">
            <Drawer.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Mi perfil',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                    title: 'Gestión de Entregas',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}