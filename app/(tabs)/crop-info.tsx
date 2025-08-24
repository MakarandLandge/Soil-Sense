// app/(tabs)/crop-info.tsx

import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const cropData = [
  { name: 'Wheat', pH: '6.0 - 7.5' },
  { name: 'Rice', pH: '5.5 - 6.5' },
  { name: 'Sugarcane', pH: '6.0 - 8.0' },
  { name: 'Cotton', pH: '6.0 - 8.0' },
  { name: 'Maize (Corn)', pH: '5.5 - 7.5' },
  { name: 'Groundnut', pH: '5.5 - 6.5' },
  { name: 'Grapes', pH: '6.5 - 7.5' },
  { name: 'Banana', pH: '6.0 - 7.5' },
  { name: 'Tomato', pH: '6.0 - 7.0' },
  { name: 'Potato', pH: '5.0 - 6.5' },
  { name: 'Soybean', pH: '6.0 - 7.5' },
];

export default function CropInfoTab() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ScrollView style={{ padding: 16, marginTop: insets.top }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Ideal Soil pH for Common Crops
      </Text>
      <View style={{
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        overflow: 'hidden'
      }}>
        <View style={{ flexDirection: 'row', backgroundColor: theme.colors.card }}>
          <Text style={{ flex: 1, padding: 12, fontWeight: 'bold' }}>Crop</Text>
          <Text style={{ flex: 1, padding: 12, fontWeight: 'bold' }}>Ideal pH</Text>
        </View>
        {cropData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              backgroundColor: index % 2 === 0 ? '#fff' : '#f0f0f0'
            }}
          >
            <Text style={{ flex: 1, padding: 12 }}>{item.name}</Text>
            <Text style={{ flex: 1, padding: 12 }}>{item.pH}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
