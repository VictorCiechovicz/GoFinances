//este documento serve para sobreescreves nossos temas que foram criados no arquivo de theme.ts assim estamos typando nosso tema denro da aplicação
//para conseguir utilizar 

import 'styled-components';
import theme from './theme';


declare module 'styled-componentes'{
  type ThemeType = typeof theme



  export interface DefaultTheme extends ThemeType {}
}