import { List } from 'antd'
import { Link } from 'react-router-dom'

export function BeerList() {
  // TODO: Replace me by appropriate useQuery call
  const beers = [
    { id: 1, name: 'Une biere' },
    { id: 2, name: 'Une deuxième bière' },
  ]

  return (
    <List
      itemLayout="horizontal"
      dataSource={beers}
      renderItem={(beer) => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/beers/${beer.id}`}>{beer.name}</Link>}
            description={beer.tagline}
          />
        </List.Item>
      )}
    />
  )
}
