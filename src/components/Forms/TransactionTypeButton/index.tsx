import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Container, Icon, Title } from './styled'

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-cicle'
}

interface Props extends TouchableOpacityProps {
  type: 'up' | 'down'
  title: string
  isActive: boolean
}

export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...rest
}: Props) {
  return (
    <Container 
    {...rest} 
    isActive={isActive} 
    type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  )
}