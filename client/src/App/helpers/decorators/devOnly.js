import React from 'react'
import includes from 'lodash/includes'

export default function (ComposedComponent) {
  return class WithRoles extends React.Component {

    static contextTypes = {
      me: React.PropTypes.object
    }

    render () {
      const me = this.context.me
      if (!me) return <span />
      if (!includes(me.roles || [], 'dev')) return <span />
      return <ComposedComponent {...this.props} />
    }
  }
}
