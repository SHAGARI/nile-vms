import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSupabase } from '@/contexts/supabase-provider';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VisitorPass } from '@/types';
import { isPassExpired } from '@/utils/functions';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { session } = useSupabase();
  const [pass, setPass] = useState<VisitorPass | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifLoading, setVerifLoading] = useState(false);
  const [scanning, setScanning] = useState(false)


  if (!permission) {
    // Camera permissions are still loading
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" color="#1C4DA1" /></View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const checkPass = async (phoneNumber: string) => {
    setLoading(true)
    try {
        const { data: visitor_pass } = await supabase
            .from("visitor_passes")
            .select("*")
            .eq("visitor_phone_number", phoneNumber)
            .order('created_at', { ascending: false })
            .single()

        setPass({
          id: visitor_pass.id,
          created_at: visitor_pass.created_at,
          visitor_name: visitor_pass.visitor_name,
          visitor_email: visitor_pass.visitor_email,
          visitor_phone_number: visitor_pass.visitor_phone_number,
          visitor_plate_number: visitor_pass.visitor_plate_number,
          expires_at: visitor_pass.expires_at,
          pass_code: visitor_pass.pass_code,
          status: visitor_pass.status
        })

        // setScanned(true)
    } catch (error) {
        console.error(error)
        Alert.alert("An error occured. Please try again")
    } finally {
        setLoading(false)
        setScanning(false)
    }
}

  const verifyPass = async () => {
    setVerifLoading(true)
    try {
        const { error } = await supabase
            .from("visitor_passes")
            .update({ status: 'verified'})
            .eq("id", pass?.id)

        if (error) throw error

        setPass(null)

        // setScanned(true)
    } catch (error) {
        console.error(error)
        Alert.alert("An error occured. Please try again")
    } finally {
        setVerifLoading(false)
    }
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#1C4DA1" />
          </View>
        ) : (
          <Camera 
            style={styles.camera} 
            type={type}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={(data) => {
              if (scanning) {
                checkPass(data.data)
              }
            }}        
          >
            {
              !scanning && 
              <TouchableOpacity style={styles.button} onPress={() => setScanning(true)}>
                <Text style={styles.text}>Scan</Text>
              </TouchableOpacity>
            }
          </Camera>
        )
      }
      <View style={{ flex: 1 }}>
        {
          pass && (
            !(isPassExpired(pass)) ? (
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                {
                  pass.status === 'pending' ? (
                    <>
                    <Text>Name: {pass.visitor_name}</Text>
                    <Text>Phone number: {pass.visitor_phone_number}</Text>
                    <Text>Plate Number: {pass.visitor_plate_number}</Text>
                    <Text>Pass Code: {pass.pass_code}</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} disabled={verifLoading} onPress={verifyPass}>
                      {
                        verifLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <Text style={[styles.text, { color: 'white' }]}>Verify</Text>
                        )
                      }
                    </TouchableOpacity>
                    </>
                  ): (
                    <Text style={{ color: 'green' }}>This pass has already been used</Text>
                  )
                }
              </View>
            ) : (
              <Text style={{ color: 'red' }}>Pass expired</Text>
            )
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor:"#fff"
  },
  camera: {
    // height: '60%',
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    // flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 32
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
