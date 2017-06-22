import React from 'react'
import Navbar from './Navbar'
import styles from './styles.css'

export default class Layout extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className={styles.body}>
          {this.props.children}
        </div>
      </div>
    )
  }

}
