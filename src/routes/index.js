import HomeScreen from '../components/HomeScreen/HomeScreen'
import LoginScreen from '../components/LoginScreen/LoginScreen'
import PageNotFound from '../components/PageNotFound/PageNotFound'
import WorkSheetScreen from '../components/WorkSheetScreen/WorkSheetScreen'

const publicRoutes = []

const otherRoutes = [
  { path: 'login', component: LoginScreen },
  { path: '*', component: PageNotFound },
]

const privateRoutes = [
  { path: '', component: HomeScreen },
  { path: 'worksheet', component: WorkSheetScreen },
]
export { publicRoutes, privateRoutes, otherRoutes }
