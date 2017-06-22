import React from 'react'
import styles from './styles.css'
import {Link} from 'react-router'
import User from './User'
import Container from 'orionsoft-parts/lib/components/Container'

export default class Navbar extends React.Component {

  static propTypes = {
    scrollY: React.PropTypes.number
  }

  render () {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.content}>
            <div className={styles.logo}>
              <Link to='/'>
                Analyzer
              </Link>
            </div>
            <div className={styles.middle} />
            <div className={styles.user}>
              <User />
            </div>
          </div>
        </Container>
      </div>
    )
  }

}
