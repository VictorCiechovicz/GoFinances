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
import { Loading2 } from './src/components/Loadind2'

import theme from './src/global/styles/theme'

import { Routes } from './src/routes'

import { AuthProvider } from './src/hooks/auth'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <Loading2 />
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}
