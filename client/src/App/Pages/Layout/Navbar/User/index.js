import React from 'react'
import styles from './styles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import AccountIcon from 'react-icons/lib/md/account-circle'
import LogoutIcon from 'react-icons/lib/md/exit-to-app'
import UsersIcon from 'react-icons/lib/md/person'
import QueryIcon from 'react-icons/lib/md/trending-up'
import ErrorsIcon from 'react-icons/lib/md/error'
// import BandsIcon from 'react-icons/lib/md/music-note'
import autobind from 'autobind-decorator'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import {Link} from 'react-router'
import {logout} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import includes from 'lodash/includes'

@withGraphQL(gql`query getMe {
  me {
    _id
    email
    profile {
      name
    }
    roles
    approved
  }
}`, {
  loading: null
})
@withApollo
export default class User extends React.Component {

  static propTypes = {
    me: React.PropTypes.object,
    client: React.PropTypes.object
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

  @autobind
  async logout () {
    await logout(this.props.client)
  }

  renderDevLinks () {
    /* return [
      <Link to='/search' className={styles.menuLink}>
        <BandsIcon size={20} />
        <span>Bands</span>
      </Link>
    ] */
  }

  renderAdminLinks () {
    if (!includes(this.props.me.roles, 'admin')) return
    return [
      <Link to='/users' className={styles.menuLink}>
        <UsersIcon size={20} />
        <span>Users</span>
      </Link>,
      <Link to='/reports' className={styles.menuLink}>
        <ErrorsIcon size={20} />
        <span>Errors</span>
      </Link>
    ]
  }

  renderProLinks () {
    if (!this.props.me.approved) return
    return (
      <Link to='/query' className={styles.menuLink}>
        <QueryIcon size={20} />
        <span>Query</span>
      </Link>
    )
  }

  renderMenu () {
    if (!this.state.open) return
    return (
      <div className={styles.menu} key='menu'>
        <Link to='/account' className={styles.account}>
          <div className={styles.email}>{this.props.me.email}</div>
        </Link>
        {this.renderDevLinks()}
        {this.renderProLinks()}
        {this.renderAdminLinks()}
        <a onClick={this.logout} className={styles.menuLink}>
          <LogoutIcon size={20} />
          <span>Sign Out</span>
        </a>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        <AccountIcon className={styles.icon} size={30} onClick={this.toggleMenu} />
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
