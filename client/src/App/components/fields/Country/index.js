import React from 'react'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import list from './list'
import includes from 'lodash/includes'

export default class Country extends React.Component {

  static propTypes = {
    passProps: React.PropTypes.object,
    allowedCountries: React.PropTypes.string
  }

  render () {
    let options = list.map(item => ({label: item.name, value: item.code}))
    if (this.props.allowedCountries && this.props.allowedCountries.length) {
      options = options.filter(item => includes(this.props.allowedCountries, item.value))
    }
    return <Select {...this.props.passProps} {...this.props} options={options} />
  }

}
