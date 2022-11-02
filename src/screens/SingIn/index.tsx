import React, { useContext } from 'react'

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
  const { signInGoogle } = useAuth()

  async function handleSignInGoogle() {
    try {
      await signInGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
    }
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
