//este documento serve para sobreescreves nossos temas que foram criados no arquivo de theme.ts assim estamos typando nosso tema dentro da aplicação
//para conseguir utilizar 

import 'styled-components';
import theme from './theme';


declare module 'styled-components'{
  type ThemeType = typeof theme



  export interface DefaultTheme extends ThemeType{}
}