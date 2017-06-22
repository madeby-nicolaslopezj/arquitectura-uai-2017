import React from 'react'
import styles from './styles.css'

export default class Logo extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <div className={styles.logoContainer}>
        <img className={styles.logo} src='http://regenerativa.cl/img/colab/uai.png' />
      </div>
    )
  }

}
