import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Pressable, SafeAreaView, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Image } from 'expo-image';
import { Text } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // if (!session) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" color="#1C4DA1" /></View>

  // if (!session || !session.user) return <Redirect href="/auth" />

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: false,
        header: () => (
          <SafeAreaView style={{ alignSelf: "stretch", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
            <Image style={{ width: 100, height: 100 }} source={require("@/assets/images/nile-logo-jpeg.jpeg")} />
            {/* <Text style={{ fontSize: 32, fontWeight: "800" }}>VMS</Text> */}
          </SafeAreaView>
        )
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => focused ? <Ionicons name='home' size={24} /> : <Ionicons name='home-outline' size={24} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors['light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name='history' size={24} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => focused ? <FontAwesome name='user-circle-o' size={24} /> : <FontAwesome name='user-circle' size={24} />,
        }}
      />
    </Tabs>
  );
}
