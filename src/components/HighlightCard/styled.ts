import styled,{css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import {Feather} from '@expo/vector-icons'

interface TypeProps{
  type: 'up' | 'down' | 'total'
}


export const Container = styled.View<TypeProps>`

${(props)=> props.type === 'up' && css`
background-color: ${({theme})=>theme.colors.shape};
`}

${(props)=> props.type === 'down' && css`
background-color: ${({theme})=>theme.colors.shape};
`}

${(props)=> props.type === 'total' && css`
background-color: ${({theme})=>theme.colors.secundary};
`}


width: ${RFValue(300)}px;
border-radius: 5px;


padding: 19px 23px;
padding-bottom: ${RFValue(42)}px;
margin-right:16px;
`;

export const Header =styled.View`
   
  flex-direction: row;
  justify-content: space-between;
  
`;

export const  Title=styled.Text<TypeProps>`
  font-family: ${({theme})=>theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  
  
  ${(props)=> props.type === 'up' && css`
  color:${({theme})=>theme.colors.text_dark}
  `}
  
  ${(props)=> props.type === 'down' && css`
  color:${({theme})=>theme.colors.text_dark}
  `}
  
  ${(props)=> props.type === 'total' && css`
  color:${({theme})=>theme.colors.shape}
  `}
`;

export const  Icon=styled(Feather)<TypeProps>`
font-size: ${RFValue(40)}px;

${(props)=> props.type === 'up' && css`
color:${({theme})=>theme.colors.sucess}
`}

${(props)=> props.type === 'down' && css`
color:${({theme})=>theme.colors.attention}
`}

${(props)=> props.type === 'total' && css`
color:${({theme})=>theme.colors.shape}
`}


`;

export const  Footer=styled.View``;

export const  Amount=styled.Text<TypeProps>`
 font-family: ${({theme})=>theme.fonts.medium};
 font-size: ${RFValue(32)}px;

 ${(props)=> props.type === 'up' && css`
color:${({theme})=>theme.colors.text_dark}
`}

${(props)=> props.type === 'down' && css`
color:${({theme})=>theme.colors.text_dark}
`}

${(props)=> props.type === 'total' && css`
color:${({theme})=>theme.colors.shape}
`}
 
 margin-top: 38px;
`;

export const  LastTransaction =styled.Text<TypeProps>`
font-family: ${({theme})=>theme.fonts.regular};
font-size: ${RFValue(12)}px;

${(props)=> props.type === 'up' && css`
color:${({theme})=>theme.colors.text}
`}

${(props)=> props.type === 'down' && css`
color:${({theme})=>theme.colors.text}
`}

${(props)=> props.type === 'total' && css`
color:${({theme})=>theme.colors.shape}
`}



`;