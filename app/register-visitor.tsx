import QRCodeGenerator from "@/components/QRCodeGenerator";
import { Button, Input, Text } from "@rneui/base";
import { Dialog } from "@rneui/themed"
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Share, View } from "react-native";

import { supabase } from "@/lib/supabase";
import { generateCode } from "@/utils/functions";
import { useSupabase } from "@/contexts/supabase-provider";

export default function RegisterVisitor() {
    const router = useRouter()
    const [saved, setSaved] = useState(false)
    const { session } = useSupabase()
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [plate, setPlate] = useState('')
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')

    const now = new Date()

    now.setHours(now.getHours() + 3)

    const savePass = async () => {
        setLoading(true)
        try {
            const genCode = generateCode()

            const res = await supabase
                    .from("visitor_passes")
                    .insert({
                        user: session?.user.id,
                        visitor_name: name,
                        visitor_phone_number: number,
                        visitor_plate_number: plate,
                        pass_code: genCode,
                        status: "pending",
                        expires_at: now
                    }).throwOnError()

            console.log("Res", res)

            setCode(genCode)

            setSaved(true)
        } catch (error) {
            console.error(error)
            Alert.alert("An error occured. Please try again")
        } finally {
            setLoading(false)
        }
    }

    const handleShare = async (): Promise<void> => {
        try {
          const result = await Share.share({
            title: "Nile Visitor Details",
            message: `I have generated a Nile visitor pass code for you. The code is ${code}. You can also show this QR code to the security for verification`,
            // url: `data:image/png;base64,${number}`,
          }, {})
    
          if (result.action === Share.sharedAction) {
            // Content shared successfully
          } else if (result.action === Share.dismissedAction) {
            // Share dialog dismissed
          }
        } catch (error) {
          console.error('Error sharing:', error)
        }
      }

    return (
        <View style={{ flex: 1, backgroundColor:"#fff", padding: 16 }}>
            {/* <Text>Register Visitor</Text> */}
            <View>
                <Input 
                    label="Name"
                    placeholder="Enter the visitor's name"
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
                <Input 
                    label="Phone Number"
                    placeholder="Enter the visitor's email address"
                    onChangeText={(text) => setNumber(text)}
                    value={number}
                />
                <Input 
                    label="Plate Number"
                    placeholder="Enter the visitor's plate number"
                    onChangeText={(text) => setPlate(text)}
                    value={plate}
                />
                <Button loading={loading} disabled={loading} color="#1C4DA1" onPress={savePass}>Continue</Button>
            </View>
            <Dialog
                isVisible={saved}
                onBackdropPress={() => router.replace("/(tabs)")}
            >
                <Dialog.Title title="Visitor Pass"/>
                <Text>Please share this information with your visitor.</Text>
                <View style={{ height: 360 }}>
                    <QRCodeGenerator data={number} />
                    <Text>Pass Code: {code}</Text>
                    <Button style={{ marginVertical: 8 }} onPress={handleShare}>Share Details</Button>
                    {/* <Button>Save QR Code</Button> */}
                </View>
            </Dialog>
        </View>
    )
}