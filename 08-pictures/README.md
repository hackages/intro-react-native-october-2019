The goal is here to get familiar with camera and pictures.

By the end of this exercise, your app should look as follows:

<table style="width:100%;display:table">
  <tr>
    <th>iOS</th>
    <th>Android</th>
  </tr>
  <tr>
    <td><img src="ios.gif" width="300"/></td>
    <td><img src="android.gif" width="300"/></td>
  </tr>
</table>

For the 'camera' (left) button:

- Take a picture with [Expo's ImagePicker API](https://docs.expo.io/versions/latest/sdk/imagepicker/) (you could also use Expo's raw [Camera](https://docs.expo.io/versions/latest/sdk/camera/) but you'd have to modify the Camera view itself to add a snap button etc)
- Save the picture in the device's [Camera Roll](https://facebook.github.io/react-native/docs/cameraroll) and show it on the screen with an Image component

For the 'import an image' (right) button:

- [Launch the image library](https://docs.expo.io/versions/latest/sdk/imagepicker/#imagepickerlaunchimagelibraryasyncoptions)
- Select a picture and show it on the screen intead of the previous one (taken with the camera)

Icons: https://expo.github.io/vector-icons/
List of colors: https://facebook.github.io/react-native/docs/colors

PS: Don't forget to check the permissions
