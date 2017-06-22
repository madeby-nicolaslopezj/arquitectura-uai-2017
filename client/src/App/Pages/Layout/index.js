import React from 'react'
import Navbar from './Navbar'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'

export default class Layout extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className={styles.body}>
          <br />
          <Container>
            {this.props.children}
          </Container>
        </div>
      </div>
    )
  }

}
