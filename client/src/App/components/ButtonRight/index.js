import React from 'react'
import styles from './styles.css'

export default class ButtonRight extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    button: React.PropTypes.node
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.children}>
          {this.props.children}
        </div>
        <div className={styles.button}>
          {this.props.button}
        </div>
      </div>
    )
  }

}
