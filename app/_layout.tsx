import "@/global.css";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>

      {/* Hide tabs route from drawer */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          swipeEnabled: false,
          drawerLabel: () => null,
          title: "",
          drawerItemStyle: { display: "none" },
        }}
      />

      {/* Example extra screen */}
      <Drawer.Screen name="shopping" options={{ title: "Shopping" }} />

    </Drawer>
  );
}