import React from 'react'
import { LoadContainer } from './styles'

import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

export function Loading2() {
  const theme = useTheme()
  return (
    <LoadContainer>
      <ActivityIndicator color={'#000'} size={34} />
    </LoadContainer>
  )
}
