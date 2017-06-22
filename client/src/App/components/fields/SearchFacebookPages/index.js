import React from 'react'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import autobind from 'autobind-decorator'
import gql from 'graphql-tag'
import Item from './Item'
import {withApollo} from 'react-apollo'

@withApollo
export default class SearchFacebookPages extends React.Component {

  static propTypes = {
    client: React.PropTypes.object,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  state = {}

  @autobind
  async loadOptions (input) {
    if (!input) return []
    const {data: {pages}} = await this.props.client.query({
      query: gql`query getPages ($input: String!) {
        pages: searchFacebookPages (query: $input) {
          id
          name
          username
          about
          category
          is_verified
          fan_count
          picture {
            url
          }
        }
      }`,
      variables: {input}
    })
    return pages.map(item => {
      return {
        label: item.name,
        value: item.id,
        data: item
      }
    })
  }

  render () {
    return (
      <div>
        <Select
          onChange={this.props.onChange}
          value={this.props.value}
          loadOptions={this.loadOptions}
          passProps={{optionComponent: Item}} />
      </div>
    )
  }

}
