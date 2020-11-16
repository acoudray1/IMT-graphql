import { List } from 'antd'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

export function BeerList() {
  // TODO: Replace me by appropriate useQuery call
  const { data, loading, error } = useQuery(
    gql`
      query {
        beers {
          id, name, tagline, favorite
        }
      }
    `,
  )

  if (loading) return 'Loading...'
  if (error) return `${error}`

  const { beers } = data

  return (
    <List
      itemLayout="horizontal"
      dataSource={beers}
      renderItem={(beer) => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/beers/${beer.id}`}>{beer.name}</Link>}
            description={beer.tagline}
            avatar={beer.favorite ? '⭐️' : '⛈'}
          />
        </List.Item>
      )}
    />
  )
}
