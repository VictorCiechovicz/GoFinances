import React from 'react'
//este componente do styled componentes cria um contexto de tema em nossa aplicação na qual construimos la no theme
import {ThemeProvider } from 'styled-components'

import {
useFonts,
Poppins_400Regular,
Poppins_500Medium,
Poppins_700Bold

} from '@expo-google-fonts/poppins'


import { Loading } from './src/components/Loading'

import theme from './src/global/styles/theme'
import { Dashboard } from './src/screens/Dashboard'

export default function App() {

  const [fontsLoaded]=useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold

  })

  if(!fontsLoaded){
    return <Loading/>
  }
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  )
}
