import { Layout, Menu } from 'antd'
import {
  Route, Switch, Link, useLocation,
} from 'react-router-dom'
import 'antd/dist/antd.css'
import { BeerList } from './BeersList'
import { Beer } from './Beer'

const { Header, Content } = Layout

export function App() {
  const { pathName } = useLocation()

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item active={pathName === '/'}><Link to="/">All beers</Link></Menu.Item>
          <Menu.Item active={pathName === '/favorites'}><Link to="/favorites">Favorites</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className="app-content">
        <Switch>
          <Route path="/" exact>
            <BeerList />
          </Route>
          <Route path="/favorites">
            <BeerList favorites />
          </Route>
          <Route path="/beers/:beerId">
            <Beer />
          </Route>
        </Switch>
      </Content>
    </Layout>
  )
}
