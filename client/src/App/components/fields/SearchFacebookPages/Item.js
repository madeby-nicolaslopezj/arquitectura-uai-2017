import React from 'react'
import styles from './styles.css'
import numeral from 'numeral'
import autobind from 'autobind-decorator'
import VerifiedIcon from 'react-icons/lib/md/check-circle'

export default class Item extends React.Component {

  static propTypes = {
    option: React.PropTypes.object,
    isFocused: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    onFocus: React.PropTypes.func
  }

  @autobind
  handleMouseDown (event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  @autobind
  handleMouseEnter (event) {
    this.props.onFocus(this.props.option, event)
  }

  @autobind
  handleMouseMove (event) {
    if (this.props.isFocused) return
    this.props.onFocus(this.props.option, event)
  }

  render () {
    const page = this.props.option.data
    return (
      <div
        className={this.props.isFocused ? styles.itemFocused : styles.item}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}>
        <div className={styles.image}>
          <img src={page.picture.url} />
        </div>
        <div className={styles.data}>
          <div className={styles.name}>
            {page.name}
          </div>
          <div className={styles.about}>
            {page.about}
          </div>
          <div className={styles.data}>
            <div className={styles.dataItem}>
              {page.username || page.id}
            </div>
            <div className={styles.dataItem}>
              {numeral(page.fan_count).format('0,0')} likes
            </div>
            <div className={styles.dataItem}>
              {page.category}
            </div>
            <div className={styles.dataItem}>
              {page.is_verified ? <VerifiedIcon style={{top: -2}} /> : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
