import React from 'react'
import styles from './styles.css'
import periods from './periods'

export default class HistoryPeriod extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  renderPeriods () {
    return periods.map(period => {
      const selected = period.value === this.props.value
      const className = selected ? styles.selected : styles.period
      const onClick = () => this.props.onChange(period.value)
      return (
        <div key={period.value} className={className} onClick={onClick}>
          {period.label}
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        {this.renderPeriods()}
      </div>
    )
  }

}
