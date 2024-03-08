import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Gestão'
    },
    {
      title: 'Usuarios',
      icon: AccountPlusOutline,
      path: '/register/users',
      openInNewTab: false
    },
    {
      title: 'Pagamentos',
      icon: CreditCardOutline,
      path: '#'
    },
    {
      icon: CubeOutline,
      title: 'Produtos',
      path: '#'
    },    
    {
      sectionTitle: 'Outros'
    },
    {
      title: 'Ajuda',
      icon: AlertCircleOutline,
      path: '#',
      openInNewTab: false
    },
  ]
}

export default navigation
