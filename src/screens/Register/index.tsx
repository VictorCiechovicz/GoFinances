import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
//para trabalhar com a validação do formulario
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

//este componente TouchableWithoutFeedback e Keyboard faz com que quando o usuario clicar em qualquer parte
//da tela o teclado desça
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Button } from '../../components/Forms/Button'
import { Input } from '../../components/Forms/Input'
import { InputForm } from '../../components/Forms/InputForm'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'

import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType
} from './styled'

interface FormData {
  name: string
  amount: string
}

//squema para validar o formulario

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório')
    .typeError('Informe apenas palavras.'),
  amount: Yup.number()
    .typeError('Informe um valor númerico.')
    .positive('O valor não pode ser nagativo.')
    .required('Valor é obrigatório')
})

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setcategoryModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleTransactionType(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setcategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setcategoryModalOpen(false)
  }

  function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert('Selecione um tipo de transação.')

    if (category.key === 'category')
      return Alert.alert('Selecione um tipo de categoria.')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              control={control}
              name="name"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="Preco"
              control={control}
              name="amount"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionType>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionType('up')}
                isActive={transactionType === 'up'}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionType('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionType>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
