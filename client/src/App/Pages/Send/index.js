import React from 'react'
import styles from './styles.css'
import random from 'lodash/random'
import autobind from 'autobind-decorator'
import numeral from 'numeral'
import Camera from './Camera'

const url = 'https://jasyy97d72.execute-api.us-east-1.amazonaws.com/dev/api/newData'

export default class Send extends React.Component {

  static propTypes = {

  }

  state = {
    numTrucks: 5,
    running: false,
    sentData: []
  }

  componentWillMount () {
    this.interval = setInterval(this.sendData, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  async post (data) {
    const response = await window.fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    console.log(result)
  }

  @autobind
  sendData () {
    if (!this.state.running) return
    const newPoint = []
    for (let i = 0; i < this.state.numTrucks; i++) {
      const extraTemp = random(this.state.sentData.length * 0.5)
      const speed = random(40, 70)
      newPoint.push({
        index: i,
        temperature: random(25, 28) + extraTemp + random(speed * 0.2),
        speed,
        traveled: this.state.sentData.length
      })
    }
    this.post(newPoint)
    this.setState(({sentData}) => {
      sentData.push(newPoint)
      return {sentData}
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <Camera setDriving={running => this.setState({running})} />
        <p>
          {numeral(this.state.sentData.length).format('0,0')} points sent
        </p>
      </div>
    )
  }

}
