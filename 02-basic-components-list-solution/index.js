import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import { getItems } from '../common/api';

const TouchableFeedback = Platform.select({
  ios: TouchableOpacity,
  android: TouchableNativeFeedback,
});

const Card = ({ item, setItems }) => {
  const [descriptionShown, setDescriptionShown] = React.useState(false);
  return (
    <TouchableFeedback
      activeOpacity={0.5}
      onPress={() => setDescriptionShown(prevState => !prevState)}
      onLongPress={() =>
        Alert.alert(
          `Deleting ${item.label}`,
          'You just long-clicked on this item. Are you sure you want to DELETE this item ?',
          [
            {
              text: 'Yes',
              onPress: () =>
                setItems(items => items.filter(x => x.id !== item.id)),
            },
            { style: 'cancel', text: 'No' },
          ]
        )
      }
    >
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: '500' }}>{item.label}</Text>
        {descriptionShown && (
          <Text style={{ marginTop: 10 }}>{item.description}</Text>
        )}
      </View>
    </TouchableFeedback>
  );
};

const App = () => {
  const [items, setItems] = React.useState([]);
  const [refreshData, setRefreshData] = React.useState(true);

  React.useEffect(() => {
    if (!refreshData) return;

    const refreshItems = async () => {
      try {
        const result = await getItems();
        setItems(result);
      } finally {
        setRefreshData(false);
      }
    };
    refreshItems();
  }, [refreshData]);

  return (
    // We don't use SafeAreaView because of: https://github.com/facebook/react-native/issues/26108
    <View
      style={{
        flex: 1,
        paddingVertical: 30,
      }}
    >
      <FlatList
        data={items}
        refreshing={refreshData}
        onRefresh={() => setRefreshData(true)}
        style={{ flex: 1, marginHorizontal: 10 }}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: 'lightgrey' }} />
        )}
        renderItem={({ item }) => <Card item={item} setItems={setItems} />}
      />
    </View>
  );
};

export default App;
