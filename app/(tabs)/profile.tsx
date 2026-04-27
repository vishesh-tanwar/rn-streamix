import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

const profile = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-start items-center h-25 mb-4">
        <View className="bg-gray-300 rounded-full w-24 h-24 mr-4"></View>
        <View className="mb-4">
          <Text className="text-xl font-bold">Username</Text>
          <Text className="text-gray-500">unique_handle</Text>
        </View>
      </View>
      <View className='flex-row items-center'>
        <Text className="text-xl font-bold mb-2">History</Text>
        <MaterialIcons name='arrow-right' size={26} />
      </View>
      <View>

      </View>
    </View>
  )
}

export default profile