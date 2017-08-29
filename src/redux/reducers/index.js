import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import Home from './home';
import Entry from './entry/entry'
import Users from './users';
import Cards from './cards';
import Issues from './issues';
import AdventureBoss from './adventures/adventure'
import DeckDetails from './create-deck/deck-options';
import DeckCreation from './create-deck/create-deck';
import DeckList from './decks/decks';
import DeckView from './decks/deck-view';
import RedditPosts from './reddit/posts'

const rootReducer = combineReducers({
  home: Home,
  entry: Entry,
  users: Users,
  cards: Cards,
  adventures: AdventureBoss,
  deckDetails: DeckDetails,
  deckCreation: DeckCreation,
  deckList: DeckList,
  deckView: DeckView,
  redditPosts: RedditPosts,
  issues: Issues,
  routing
});


export default rootReducer;