import React, { useContext, useState } from 'react'
import { Loading } from '../../components/Loading/Loading'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styled'

import LogoSvg from '../../../assets/logo.svg'
import GoogleSvg from '../../../assets/google.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { SingInSocialButton } from '../../components/SingInSocialButton'
import { useAuth } from '../../hooks/auth'
import { Alert } from 'react-native'

export function SingIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInGoogle } = useAuth()

  async function handleSignInGoogle() {
    try {
      setIsLoading(true)
      await signInGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
    } finally{
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>

          <SignInTitle>
            Faça seu login com{'\n'}
            sua conta abaixo
          </SignInTitle>
        </TitleWrapper>
      </Header>

      <Footer>
        <FooterWrapper>
          <SingInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInGoogle}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
