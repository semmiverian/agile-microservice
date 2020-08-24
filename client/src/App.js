import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import client from './config/apolloClient'
import './tailwind.css'
import Navigation from './components/Navigation'
import Home from './containers/Home'
import LocalUser from './containers/LocalUser'
import AddUser from './containers/AddUser'
import Detail from './containers/Detail'
import BookSubscription from './containers/BookSubscription'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Navigation />

          <div className="w-3/4 mx-auto">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>

              <Route path="/localUser">
                <LocalUser />
              </Route>

              <Route path="/subscription">
                <BookSubscription />
              </Route>

              <Route path="/add">
                <AddUser />
              </Route>

              <Route path="/:id">
                <Detail />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
