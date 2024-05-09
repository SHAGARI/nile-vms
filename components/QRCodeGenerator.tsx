import React from 'react';
import { View } from 'react-native';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';

interface myProps {
  data:  any
}

const QRCodeGenerator = (props : QRCodeProps & myProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode
        value={props.data}
        size={200} // adjust the size as needed
       {...props}
      />
    </View>
  );
};

export default QRCodeGenerator;
