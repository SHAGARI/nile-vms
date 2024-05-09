import { ActivityIndicator, Alert, FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
import { Link, Redirect } from 'expo-router';
import { Image } from 'expo-image';
import { Button, Text } from '@rneui/base';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import useProfile from '@/hooks/use-profile';
import VisitorCard from '@/components/VisitorCard';
import useVisitors from '@/hooks/use-visitors';

export default function HomeScreen() {
  const { username, loading } = useProfile()
  const { visitors, loading: visitorsLoading } = useVisitors()

  // if (!session?.user) <Redirect href="/auth" />


  if (loading || visitorsLoading) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" color="#1C4DA1" /></View>

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Link href="/auth">
        <Text style={{ color: "#fff" }}>Go to Auth</Text>
      </Link> */}
      <View style={{ alignSelf: "stretch", paddingVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
        <Text style={{ fontWeight: "700", paddingHorizontal: 8 }} h4>Hello, {username}</Text>
      </View>
      <Link href="/register-visitor" asChild>
        <Button style={{ padding: 8, width: 200 }} color="#1C4DA1" size='md' radius='sm'>
          Register Visitor
        </Button>
      </Link>
      <View>
        <Text style={{ fontWeight: "500", paddingHorizontal: 8 }} h4>Recent Visitors</Text>
        <FlatList
          data={visitors.slice(0, 10)}
          renderItem={({ item: visitor }) => (
            <Link 
                href={{
                  pathname: "/visitor/[id]",
                  params: { id: visitor.id }
                }}
                asChild
                key={visitor}
              >
                <Pressable>
                  <VisitorCard name={visitor.visitor_name} date={new Date(visitor.created_at)} status={visitor.status} />
                </Pressable>
              </Link>
          )}
          contentInset={{ bottom: 200 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    gap: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
