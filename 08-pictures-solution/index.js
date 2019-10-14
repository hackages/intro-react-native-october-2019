import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, View, CameraRoll, Image } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

const App = () => {
  const [imageUri, setImageUri] = React.useState(undefined);

  const handleClick = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync();
    if (result.cancelled) return;
    await CameraRoll.saveToCameraRoll(result.uri, 'photo');
    setImageUri(result.uri);
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleClick} style={{ marginRight: 30 }}>
          <Feather name="camera" size={50} color="limegreen" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (result && result.cancelled) return;
            setImageUri(result.uri);
          }}
        >
          <AntDesign name="picture" size={50} color="dodgerblue" />
        </TouchableOpacity>
      </View>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ height: 200, width: 200, marginTop: 30 }}
        />
      )}
    </View>
  );
};

export default App;
