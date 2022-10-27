import React from 'react'
//este componente do styled componentes cria um contexto de tema em nossa aplicação na qual construimos la no theme
import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'expo-status-bar'

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { Loading } from './src/components/Loading/Loading'

import theme from './src/global/styles/theme'

import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <Loading />
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}
