// import React from 'react'
// // import {syncHistoryWithStore} from 'react-router-redux'
// // import { Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router'
// import Home from './pages/home/home'
// import DeckSelection from "./pages/decks/deck-selection/deck-selection"

// import Cards from './pages/cards/cards'
// // import {Forum} from './pages/forum/forum'
// import {Tournaments} from './pages/tournaments/tournaments'


// import Deck from './pages/decks/deck/deck'


// // import {ArenaPicker} from './pages/arena-picker/arena-picker'
// // import {ArenaPickerClassSelection} from './pages/arena-picker/class-selection'
// // import {ArenaPickerClassSelected} from './pages/arena-picker/class-selected'

// import Expansions from './pages/expansions/expansions'
// import Expansion from './pages/expansions/right-container/expansion'
// import ExpansionDetails from './pages/expansions/right-container/details'

// import Adventures from './pages/adventures/adventures'
// import Adventure from './pages/adventures/right-container/adventure'
// import AdventureDetails from './pages/adventures/right-container/content/details'

// import CreateDeck from './pages/create-deck/create-deck'
// import CreateDeckClassSelection from './pages/create-deck/before-class-selection/class-selection'
// import CreateDeckClassSelected from './pages/create-deck/after-class-selection/create-deck'

// // import {Streams} from './pages/streams/streams'
// // import Iframe from './pages/streams/iframe'


// import Reddit from './pages/reddit/reddit'
// import RedditPost from './pages/reddit/post/post'
// import RedditPosts from './pages/reddit/posts/posts'

// import Entry from './pages/entry/entry'
// import SignUp from './pages/entry/right-container/sign-up/sign-up'
// import SignUpUpdateProfile from './pages/entry/right-container/sign-up/second-phase/sign-up-update-profile'
// import SignIn from './pages/entry/right-container/sign-in/sign-in'

// import NotFound from './shared-assets/not-found'

// import {Dashboard} from './pages/dashboard/dashboard'
// import Rank from './pages/rank/rank'
// import Issues from './pages/issues/issues'
// import Main from './Main'

// getCurrentUserInfo(updateActiveUser)
// const App = ({store}) =>{
//   const history = syncHistoryWithStore(browserHistory, store)
//   return (
//     <Router history={history}>
//       <Route path="/"                   component={Main}>
//         <IndexRoute                     component={Home} />
//         <Redirect from="home" to="/" />
//         <Route path=""                  component={Home} />

//         <Route path="decks"             component={DeckSelection}>
//           {/*<Route path=":class/:deckId"  component={Deck}/>*/}
//           <Route path=":class/:deckId/:deckTitle"  component={Deck}/>
//         </Route>

//         <Route path="cards"             component={Cards} />

//         {/*<Redirect from="arena-picker" to="arena-picker/class-selection" />*/}
//         {/*<Route path="arena-picker"      component={ArenaPicker}>*/}
//           {/*<Route path="class-selection" component={ArenaPickerClassSelection} />*/}
//           {/*<Route path=":class"          component={ArenaPickerClassSelected} />*/}
//         {/*</Route>*/}

//         <Redirect from="expansion" to="expansions"/>
//         <Route path="expansions"        component={Expansions}>
//           <Redirect from=":expansion" to=":expansion/overview"/>
//           <Route path=":expansion"      component={Expansion}>
//             <Route path=":details"      component={ExpansionDetails} />
//           </Route>
//         </Route>

//         <Redirect from="adventure" to="adventures"/>
//         <Route path="adventures"    component={Adventures}>
//           <Redirect from=":adventure" to=":adventure/overview"/>
//           <Route path=":adventure"  component={Adventure}>
//             <Route path=":details"  component={AdventureDetails}>
//               <Route path=":detailsChild" />
//             </Route>
//           </Route>

//         </Route>

//         <Redirect from="create-deck" to="create-deck/class-selection" />
//         <Route path="create-deck"         component={CreateDeck}>
//           <Route path="class-selection"   component={CreateDeckClassSelection} />
//           <Route path=":class"            component={CreateDeckClassSelected} />

//         </Route>

//         {/*<Route path="forum"             component={Forum} />*/}
//         <Route path="tournaments"       component={Tournaments} />

//         {/*<Redirect from="twitch" to="twitch/all" />*/}
//         {/*<Route path="twitch"         component={Streams}>*/}
//           {/*<Route path=":channel"     component={Iframe}/>*/}
//         {/*</Route>*/}

//         <Redirect from="reddit" to="reddit/posts" />
//         <Route path="reddit"              component={Reddit}>
//           <Route path="posts"             component={RedditPosts} />
//           <Route path="post/:id/:post"    component={RedditPost} />
//           <Route path="post/:id"          components={RedditPost} />
//         </Route>

//         <Route path="entry"      component={Entry}>
//           <Redirect from="/sign-up/" to="/sign-up"/>

//           <Route path="/sign-in" component={SignIn} />
//           <Route path="/sign-up" component={SignUp}>
//             <Route path="update-profile" component={SignUpUpdateProfile} />
//           </Route>
//         </Route>

//         <Route path="dashboard" component={Dashboard} />
//         <Route path="rank" component={Rank} />
//         <Route path="issues" component={Issues}/>
//         <Route path="*" component={NotFound} />
//       </Route>
//     </Router>
//   )
// }

// export default App


// main will be removed

import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux'

// components
import Home from './pages/home/home'
import Navbar from './layout/navbar'
import Footer from './layout/footer'

// data
import {getActiveUser} from '../firebase/user/read'
import {signOut} from '../firebase/user/utils'
import {fetchData, fetchPatchData} from '../data/cards-data'
import 'antd/lib/tooltip/style/css'
import 'antd/lib/dropdown/style/css'
import 'antd/lib/popover/style/css'
import 'antd/lib/message/style/css'
import 'antd/lib/select/style/css'


export default connect(
  (state) => {
    const {cards, patch} = state.cards
    const {authenticated, activeUser} = state.users
    const {playerClass} = state.deckCreation
    return {cards, patch, authenticated, activeUser, playerClass}
  },
  dispatch => ({
    updateCurrentPatch: patch => dispatch({
      type: 'UPDATE_CURRENT_PATCH', patch
    }),
    updateCards: (cards) => dispatch({
      type: 'UPDATE_CARDS', cards
    }),
    updateActiveUser: (authenticated, activeUser, avatar) => dispatch({
      type: 'UPDATE_ACTIVE_USER', authenticated, activeUser, avatar
    })
  })
)(class App extends Component {
  componentDidMount() {
    getActiveUser(this.props.updateActiveUser)
    fetchPatchData(this.props.updateCurrentPatch)
    fetchData(this.props.updateCards)
  }

  render() {
    const {
      activeUser,
      match,
      playerClass,
      ...others
    } = this.props

    const navBarProps = {
      user: activeUser,
      playerClass,
      handleLogout: e => signOut(e)
    }

    return (
      <div className="container">
        <Route component={ ({ match }) => <Navbar url={match.path} { ...navBarProps } /> } />
        <Switch>
          <Route exact path="/" component={ () => <Home { ...others } /> } />
        </Switch>
        <Footer />
      </div>
    )
  }
})
