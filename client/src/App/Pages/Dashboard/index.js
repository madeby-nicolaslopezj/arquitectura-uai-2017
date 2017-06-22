import React from 'react'
import styles from './styles.css'

const url = 'https://jasyy97d72.execute-api.us-east-1.amazonaws.com/dev/api/getData'

export default class Dashboard extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <div className={styles.container}>
        Dashboard
        {url}
      </div>
    )
  }

}
