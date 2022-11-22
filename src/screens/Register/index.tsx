import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
//para trabalhar com a validação do formulario
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

//este componente TouchableWithoutFeedback e Keyboard faz com que quando o usuario clicar em qualquer parte
//da tela o teclado desça
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Button } from '../../components/Forms/Button'

//Primeiro passo para utilizar o input controlado com hookform+yup
import { InputForm } from '../../components/Forms/InputForm'

import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'

import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'

import AsyncStorage from '@react-native-async-storage/async-storage'
//esta lib cria uuid para cada objeto
import uuid from 'react-native-uuid'

import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType
} from './styled'
import { useAuth } from '../../hooks/auth'

type NavigationProps = {
  navigate: (screen: string) => void
}

//Quarto passso tipar os inputs do objeto que vai ser enviado
interface FormData {
  name: string
  amount: string
}

//Terceiro passo para utilizar o input controlado com hookform+yup, criar o schema para o useForm
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

  const navigation = useNavigation<NavigationProps>()

  const { user } = useAuth()

  //Segundo passo para utilizar o input controlado com hookform+yup criar essa const com o useForm
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleTransactionType(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setcategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setcategoryModalOpen(false)
  }
  //Quinto passo criar uma funçaõ que envia os dados dos inputs
  //Sexto envolver o botão com o handleSubmit para controle dele quando voce aperta-lo
  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert('Selecione um tipo de transação.')

    if (category.key === 'category')
      return Alert.alert('Selecione um tipo de categoria.')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    //abaixo estamos utilizando o AsyncStorage para persistir com os nossos dados
    //salvando assim no dispositivo do usuário.
    try {
      //criamos esta chave para utilizar no AsyncStorage
      const dataKey = `@gofinances:transactions_user:${user.id}`

      //primeiro criamos uma função async, depois criamos este try catch  que vai
      //pegar o que esta salvo no asyncstorage e verificar se tiver algo ele converte para um objeto,
      //se não ele reotorna um objeto vazio
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []
      //aqui a const pega todos os valor que estão no asyncstorage e acrescenta mais o que foi colocado pelo usuario no formulario.
      const dataFormatted = [...currentData, newTransaction]

      //aqui ele espera e transforma em um string, pelo fato de que o asyncstorage so recebe uma string de dados
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Category'
      })
      navigation.navigate('Listagem')
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar.')
    }
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
                onPress={() => handleTransactionType('positive')}
                isActive={transactionType === 'positive'}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionType('negative')}
                isActive={transactionType === 'negative'}
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
