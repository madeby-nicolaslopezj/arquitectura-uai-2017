import React from 'react'
import styles from './styles.css'
import WorldIcon from 'react-icons/lib/fa/globe'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'

export default class DataLocale extends React.Component {

  static propTypes = {
    world: React.PropTypes.bool,
    country: React.PropTypes.bool
  }

  render () {
    const Icon = this.props.world ? WorldIcon : WorldIcon
    const content = this.props.world ? 'This value takes global information' : 'Country data'
    return (
      <Tooltip content={content}>
        <Icon size={18} className={styles.icon} />
      </Tooltip>
    )
  }

}
