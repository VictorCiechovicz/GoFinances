import React from 'react'
import { Button, ImagemContainer, Text } from './styled'
import { TouchableOpacityProps } from 'react-native'
import { SvgProps } from 'react-native-svg'

interface Props extends TouchableOpacityProps {
  title: string
  svg: React.FC<SvgProps>
}

export function SingInSocialButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImagemContainer>
        <Svg />
      </ImagemContainer>
      <Text>{title}</Text>
    </Button>
  )
}
