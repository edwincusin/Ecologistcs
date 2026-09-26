import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ResumenScreen from "../screen/ResumenScreen";
import ListaEntregaScreen from "../screen/ListaEntregasScreen";

const Tab = createBottomTabNavigator();


export default function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="ListaEntregaScreen">
            <Tab.Screen
                name="ListaEntregaScreen"
                component={ListaEntregaScreen}
                options={{
                    title: 'Lista de Entregas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ResumenScreen"
                component={ResumenScreen}
                options={{
                    title: 'Resumen',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
