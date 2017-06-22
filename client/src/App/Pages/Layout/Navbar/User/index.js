import React from 'react'
import styles from './styles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MenuIcon from 'react-icons/lib/md/expand-more'
import SendDataIcon from 'react-icons/lib/md/send'
import DashboardIcon from 'react-icons/lib/md/dashboard'
import autobind from 'autobind-decorator'
import {Link} from 'react-router'
import sleep from 'orionsoft-parts/lib/helpers/sleep'

export default class User extends React.Component {

  static propTypes = {
  }

  state = {open: false}

  componentDidMount () {
    window.addEventListener('mouseup', this.closeMenu, false)
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.closeMenu)
  }

  @autobind
  async closeMenu (event) {
    if (!this.state.open) return true
    await sleep(100)
    this.setState({open: false})
  }

  @autobind
  toggleMenu () {
    this.setState({open: !this.state.open})
  }

  renderMenu () {
    if (!this.state.open) return
    return (
      <div className={styles.menu} key='menu'>
        <Link to='/' className={styles.menuLink}>
          <SendDataIcon size={20} />
          <span>Test data</span>
        </Link>
        <Link to='/' className={styles.menuLink}>
          <DashboardIcon size={20} />
          <span>Dashboard</span>
        </Link>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        <MenuIcon className={styles.icon} size={30} onClick={this.toggleMenu} />
        <ReactCSSTransitionGroup
          transitionName='user-menu'
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.renderMenu()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}
