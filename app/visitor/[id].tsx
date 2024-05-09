import useVisitor from "@/hooks/use-visitor";
import { Button, Text } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { Badge } from "react-native-elements";

export default function VisitorPage() {
    const { id } = useLocalSearchParams()
    const { visitor, loading } = useVisitor(id as any)
    const router = useRouter()

    if (loading) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" color="#1C4DA1" /></View>

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button type="outline" size="sm" style={{ width: 100, margin: 16, borderColor: "#000" }} buttonStyle={{ borderColor: "#000" }} titleStyle={{ color: "#000" }} onPress={() => router.back()}>&lt; Go back</Button>
            <View style={{ padding: 16 }}>
                <Text style={{ fontWeight: "700" }} h2>{visitor?.visitor_name}</Text>
            </View>
            <View style={{ padding: 16, gap: 8 }}>
                <Text style={{}}> Phone number: {visitor?.visitor_phone_number}</Text>
                <Text style={{}}> Plate number: {visitor?.visitor_plate_number}</Text>
                <Text style={{}}> Pass code: {visitor?.pass_code}</Text>
                <Text style={{}}> Expires at: {(new Date(visitor?.expires_at)).toUTCString()}</Text>
                <Text style={{}}> Registered on: {(new Date(visitor?.created_at)).toDateString()}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                    <Text style={{}}> Status: </Text>
                    <Badge value={visitor?.status ? `${visitor?.status[0].toUpperCase()}${visitor?.status.slice(1)}` : ""} status={ visitor?.status === "pending" ? "warning" : ( visitor?.status === "verified" ? "success" : "error") } />
                </View>
            </View>
        </SafeAreaView>
    )
}