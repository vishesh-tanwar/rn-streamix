import VideoCard from '@/components/videoCard'
import React from 'react'
import { FlatList, View } from 'react-native'

const home = () => {
  return (
    <View>
      <FlatList renderItem={({ item }) => <VideoCard />}
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => item.toString()} />
    </View >
  )
}

export default home