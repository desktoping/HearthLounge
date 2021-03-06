import React  from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router';
import {adventure_detail_tabs} from '../../../../data/adventure-details';
import {adventureWingExists, adventureBossExists} from '../../../../utils/checkIfPathExist';

const Topbar = ({adventure, details, boss}) => {

  const bossesTab = (detail) => {
    if (adventureWingExists(adventure, details) && adventureBossExists(adventure, details, boss)) {
      return `${detail.name} > ${_.startCase(details)} > ${_.startCase(boss)}`;
    }
    else return detail.name
  };

  const listDetails = () =>{
    return (
      adventure_detail_tabs.map((detail, index) =>
          <li key={index} className={`${adventure} ${detail.url === details && 'active'}`}>
            <Link to={`/adventures/${adventure}/${detail.url}`}>
              {detail.url === 'bosses' ? bossesTab(detail) : detail.name}
            </Link>
          </li>
      )
    )
  };

  return (
      <div className='topbar'>
        <ul className="topbar__extension-navigation">
          {listDetails()}
        </ul>
      </div>
  );
};

export default Topbar;

Topbar.propTypes = {
  adventure: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  boss: PropTypes.string
};