import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import LeftContainer from './left-container';
import RightContainer from './right-container';
import {loading, success} from '../../../../utils/messages';
import {captureDecklist} from '../../../../utils/capture-decklist';
import {uniqueCards} from '../../../../utils/deck/calculate'
import {deckSimplification} from '../../../../utils/deck';
import {setDeckstringObj, encodeDeckstring} from '../../../../utils/deck/deckstring';

const CreateDeckClassSelected = ({authenticated, activeUser, updateDeckstring, cards, deck, patch, deckMechanics, editDeck, editingTool, filters, imgReadyDecklist, location, params, showDeckEditingTool, deckstring,
                                   toggleDeckMechanics, toggleFilters, toggleImgReadyDecklist, simplifiedDeck, simplifyDeck, user, updateURL}) => {
  const {allCards, cardSet} = cards;
  const {query} = location;
  const playerClass = params.class;

  const handleCardClick = (e, card) => {
    e.preventDefault();
    let ifLegendary = card.rarity !== "Legendary" ? uniqueCards(deck, card) < 2 : uniqueCards(deck, card) < 1;
    if (e.button === 0 && ifLegendary && deck.length < 30) {
      editDeck(deck.concat(card));
    }

    if (e.button === 2 && uniqueCards(deck, card) > 0) {
      editDeck(_.filter(deck, (c) => c.cardId !== card.cardId));
    }
  };

  const toggleCardAmountTooltip = (card) => {
    const CardTooltip = () =>{
      return (
          <div className="tooltip-count">
              <span>
                {uniqueCards(deck, card)}/{card.rarity !== "Legendary" ? 2 : 1}
              </span>
          </div>
      )
    };
    return (
        deck.filter(c => c.cardId === card.cardId).length > 0 ? <CardTooltip /> : null
    )
  };


  const handleKeyShortcuts = (e) => {
    // let areDeckMechanicsActive = filters === false ? true : false;
    if(e.button === 0 || e.ctrlKey) {
      toggleFilters(!filters)
    }
    // if(e.altKey){
    //   toggleDeckMechanics(filters)
    // }

    // if(e.keyCode > 64 && e.keyCode <= 90){
    //   this.setState({
    //     cards: _.filter(Data, {name: e})
    //   })
    // }
  };

  const switchDecklistClasses = (param) =>{
    toggleImgReadyDecklist(param);
    !imgReadyDecklist
        ? document.getElementById('image').className += "active"
        : document.getElementById('image').className = "";
  };

  const handleDeckMechanicsToggle = () => {
    let areActive = deckMechanics === false ? true : false;
    toggleDeckMechanics(areActive);
  };

  const handleCopyDeckStringClick = () =>{
    let deckstring = encodeDeckstring(setDeckstringObj(deck, playerClass));
    updateDeckstring(deckstring);
    success('Successfully copied deckstring to clipboard!');
  };

  const handleImgSaveClick = (e) =>{
    let target = e.currentTarget.id;
    switch(target){
      case 'save-img':
        let closeLoadingMessage = loading('Creating image...');
        captureDecklist('decklist-to-img', switchDecklistClasses, closeLoadingMessage);
        break;
      case 'cancel-img-save': return switchDecklistClasses(false);
      default: return target;
    }
  };

  const handleOptionsClick = (e, icon) => {
    let simplifiedDeck = deckSimplification(deck);
    let isEditingToolActive = editingTool === false ? true : false;
    let isDecklistReadyForCapture = imgReadyDecklist === false ? true : false;
    switch (icon) {
      case 'copy': return handleCopyDeckStringClick();
      case 'image': return switchDecklistClasses(isDecklistReadyForCapture);
      case 'download':
        !editingTool
            ? document.getElementById(e.currentTarget.id).className += "active"
            : document.getElementById(e.currentTarget.id).className = "";
        showDeckEditingTool(isEditingToolActive);
        simplifyDeck(simplifiedDeck);

        break;
      default: return icon;
    }
  };

  return (
      <div tabIndex="0" onKeyDown={(e) => handleKeyShortcuts(e)}
           className="container__page container__page--twoSided create-deck">
        <LeftContainer handleSidebarViewChange={(e) => handleKeyShortcuts(e)}
                       filtersView={filters}
                       countCards={(e) => uniqueCards(deck, e)}
                       deck={deck}
                       deckDetails={deckMechanics}
                       handleDeckMechanicsToggle={handleDeckMechanicsToggle}
                       params={params}
                       cards={cards}
                       cardSet={cardSet}
                       imgReadyDecklist={imgReadyDecklist}
                       query={query}/>

        <RightContainer filtersView={filters}
                        authenticated={authenticated}
                        query={query}
                        activeClass={params.class}
                        deckstring={encodeDeckstring(setDeckstringObj(deck, params.class))}
                        deck={deck}
                        simplifiedDeck={simplifiedDeck}
                        handleCardClick={handleCardClick}
                        handleOptionsClick={handleOptionsClick}
                        handleImgSaveClick={handleImgSaveClick}
                        toggleCardAmountTooltip={toggleCardAmountTooltip}
                        allCards={allCards}
                        patch={patch}
                        editingTool={editingTool}
                        user={user}
                        imgReadyDecklist={imgReadyDecklist}/>
      </div>
  );
};

const mapStateToProps = (state) =>{
  const {filters, editingTool, deckMechanics, imgReadyDecklist, deck, deckstring, simplifiedDeck} = state.deckCreation;
  return {
    filters,
    editingTool,
    deckMechanics,
    imgReadyDecklist,
    deck,
    deckstring,
    simplifiedDeck
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFilters: (filters) => dispatch({
      type: 'TOGGLE_FILTERS', filters
    }),
    showDeckEditingTool: (editingTool) => dispatch({
      type: 'SHOW_DECK_EDITING_TOOL', editingTool
    }),
    toggleDeckMechanics: (deckMechanics) => dispatch({
      type: 'TOGGLE_DECK_MECHANICS', deckMechanics
    }),
    toggleImgReadyDecklist: (imgReadyDecklist) => dispatch({
      type: 'TOGGLE_IMG_READY_DECKLIST', imgReadyDecklist
    }),
    updateURL: (deckUrl) => dispatch ({
      type: 'UPDATE_URL', deckUrl
    }),
    editDeck: (deck) => dispatch({
      type: 'EDIT_DECK', deck
    }),
    updateDeckstring: (deckstring) => dispatch({
      type: 'UPDATE_DECKSTRING', deckstring
    }),
    simplifyDeck: (simplifiedDeck) => dispatch({
      type: 'SIMPLIFY_DECK', simplifiedDeck
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeckClassSelected);