import { FlatList, Pressable, View } from "react-native";
import { Text } from "@rneui/themed";
import useVisitors from "@/hooks/use-visitors";
import { Link } from "expo-router";
import VisitorCard from "@/components/VisitorCard";

export default function History() {
    const { visitors } = useVisitors()

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 }}>
            <Text style={{ paddingHorizontal: 16, fontWeight: "700" }} h2>History</Text>
            <FlatList
                data={visitors}
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
    )
}