import React from 'react'
import Layout from './Layout'
import NotFound from './Misc/NotFound'
import Auth from './Auth'
import {Route} from 'react-router'
import Home from './Home'

export default (
  <Route>
    {Auth}
    <Route component={Layout}>
      <Route path='/' component={Home} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
)
