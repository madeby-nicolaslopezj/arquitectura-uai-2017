import React from 'react'
import styles from './styles.css'

export default class Section extends React.Component {

  static propTypes = {
    title: React.PropTypes.node,
    description: React.PropTypes.node,
    children: React.PropTypes.node,
    noBorder: React.PropTypes.bool
  }

  render () {
    return (
      <div className={this.props.noBorder ? styles.containerNoBorder : styles.container}>
        <div className='row'>
          <div className='col-xs-12 col-sm-4'>
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.description}>
              {this.props.description}
            </div>
          </div>
          <div className='col-xs-12 col-sm-8'>
            <div className={styles.children}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
