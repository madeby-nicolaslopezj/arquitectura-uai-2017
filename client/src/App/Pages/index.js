import React from 'react'
import Layout from './Layout'
import NotFound from './Misc/NotFound'
import Auth from './Auth'
import {Route, Redirect} from 'react-router'
import Bands from './Bands'
import Users from './Users'
import Query from './Bands/Query'
import Account from './Account'
import Search from './Search'
import Band from './Band'
import Status from './Status'

export default (
  <Route>
    {Auth}
    <Route component={Layout}>
      {Account}
      {Band}
      {Bands}
      {Users}
      {Search}
      <Route path='/status' component={Status} />
      <Route path='/query' component={Query} />
    </Route>
    <Redirect path='/' to='/query' />
    <Route path='*' component={NotFound} />
  </Route>
)
