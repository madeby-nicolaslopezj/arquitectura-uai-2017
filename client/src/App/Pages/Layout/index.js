import React from 'react'
import forceLogin from 'orionsoft-parts/lib/decorators/forceLogin'
import Navbar from './Navbar'
import styles from './styles.css'

@forceLogin
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
