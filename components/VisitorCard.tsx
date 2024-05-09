import { Badge, Card, Text } from "@rneui/themed";
import { View } from "react-native";

export default function VisitorCard({
    name,
    date,
    status
} : {
    name: string,
    date: Date,
    status: "verified" | "pending" | "expired"
}) {
    return (
        <Card wrapperStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} containerStyle={{ borderRadius: 4 }}>
            <View style={{ gap: 8 }}>
                <Text h4>{name}</Text>
                <Text style={{ fontSize: 10, fontWeight: "300" }}>{date.toDateString()}</Text>
            </View>
            <Badge value={`${status[0].toUpperCase()}${status.slice(1)}`} status={ status === "pending" ? "warning" : ( status === "verified" ? "success" : "error") } />
        </Card>
    )
}