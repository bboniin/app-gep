import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/login';
import Home from './pages/home';
import Cadastro from './pages/cadastro';
import Informacoes from './pages/informacoes';
import Agenda from './pages/agenda';
import AgendaCadastro from './pages/agendaCadastro';
import Eleitorado from './pages/eleitorado';
import EditarCadastro from './pages/editarcadastro';

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login,
      Home,
      Cadastro,
      Informacoes,
      Eleitorado,
      Agenda,
      AgendaCadastro,
      EditarCadastro
    },
    {
      initialRouteName: 'Login',
      backBehavior: 'history'
    },
  )
);

export default Routes;
