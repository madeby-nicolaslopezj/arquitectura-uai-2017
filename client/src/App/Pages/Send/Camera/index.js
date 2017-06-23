import React from 'react'
import styles from './styles.css'
import Webcam from 'react-webcam'
import autobind from 'autobind-decorator'
import numeral from 'numeral'

/* global AWS */

var BASE64_MARKER = ';base64,'

function convertDataURIToBinary (dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  var base64 = dataURI.substring(base64Index)
  var raw = window.atob(base64)
  var rawLength = raw.length
  var array = new Uint8Array(new ArrayBuffer(rawLength))

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }
  return array
}

export default class Camera extends React.Component {

  static propTypes = {
    setDriving: React.PropTypes.func
  }

  state = {}

  constructor (props) {
    super(props)
    this.rekognition = new AWS.Rekognition({
      accessKeyId: 'AKIAJS7UGSPYB23P2XMA',
      secretAccessKey: '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',
      region: 'us-east-1'
    })
  }

  componentWillMount () {
    this.interval = setInterval(this.checkImage, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  @autobind
  async checkImage () {
    const image = this.refs.webcam.getScreenshot()
    const params = {
      Image: {
        Bytes: convertDataURIToBinary(image)
      },
      Attributes: ['ALL']
    }
    const {FaceDetails} = await this.rekognition.detectFaces(params).promise()
    const face = FaceDetails[0]
    this.props.setDriving(!!face)
    this.setState({face})
  }

  renderFaceData () {
    if (!this.state.face) return
    return (
      <div>
        <p>
          Driving...
        </p>
        <p>
          Bread: {this.state.face.Beard.Value ? 'Yes' : 'No'}
        </p>
        <p>
          Age: {this.state.face.AgeRange.Low} - {this.state.face.AgeRange.High}
        </p>
        <p>
          Gender: {this.state.face.Gender.Value}
        </p>
        <p>
          Smile: {this.state.face.Gender.Value ? 'Yes' : 'No'}
        </p>
        <p>
          Emotions: {this.state.face.Emotions.map(({Type, Confidence}) => `${Type} (${numeral(Confidence).format('0,0')}%)`).join(', ')}
        </p>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        <div className='row'>
          <div className='col-xs-12 col-sm-8'>
            <Webcam
              ref='webcam'
              screenshotFormat='image/png'
              audio={false} />
          </div>
          <div className='col-xs-12 col-sm-4'>
            {this.renderFaceData()}
          </div>
        </div>
      </div>
    )
  }

}
