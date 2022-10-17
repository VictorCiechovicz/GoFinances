//este componente vai ser apresentado no comeco da aplicao antes do carregamento total.

import { View } from 'react-native'
import LottieView from 'lottie-react-native'

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LottieView
        source={require('../../assets/Loading.json')}
        autoPlay
        loop
        style={{ width: 300 }}
      />
    </View>
  )
}
