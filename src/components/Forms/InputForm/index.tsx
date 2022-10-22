import React from 'react'
import { Conatiner, Error } from './styled'
import { Input } from '../Input'
import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'

interface Props extends TextInputProps {
  control: Control
  name: string
  error: string
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Conatiner>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input value={value} onChangeText={onChange} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Conatiner>
  )
}
