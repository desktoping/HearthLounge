import React, { Component } from 'react';
import {Sidebar} from './left-container/sidebar';
import {Topbar} from './right-container/topbar';
import {DecksTable} from './right-container/decks-table';
export class Decks extends Component {
  render() {
    return (
        <div className="pageContainer decks">
          <div className="left-container">
            <Sidebar/>
          </div>
          <div className="right-container">
            <Topbar/>

            <div className="top-decks">
              <div className="standard">
                <h3>Top standard decks</h3>
                <DecksTable/>
              </div>

            </div>
          </div>
        </div>
    );
  }
}