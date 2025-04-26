import { Stack } from "expo-router";

export default function StackLayout() {
    return(
        <Stack>

        <Stack.Screen name='(tabs)' options={{headerShown : false, headerTitle : ""}}></Stack.Screen>
        <Stack.Screen name='searchBars' options={{ headerShown : false, presentation: "modal"}}></Stack.Screen>
        <Stack.Screen name='gameEvents' options={{ headerShown : false, presentation: "modal"}}></Stack.Screen>
        </Stack>
    )


}