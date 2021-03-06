import React from 'react';
import PropTypes from 'prop-types';
import ExtensionBlock from "../../../../components/extension-blocks/extension-block";
import Art from "../../../../components/extension-blocks/overview-blocks/art";
import Rewards from "../../../../components/extension-blocks/overview-blocks/rewards";
import Cinematic from "../../../../components/extension-blocks/overview-blocks/cinematic";
import Gameboard from "../../../../components/extension-blocks/overview-blocks/gameboard";

const Overview = ({adventure, adventureCardbacks}) => {
  const {overview, name} = adventure;
  const {cinematic, gameboard, img} = overview;

  const adventureArt = <Art src={img} name={name} />;
  const adventureRewards = <Rewards extensionCardbacks={adventureCardbacks} />;
  const adventureCinematic = <Cinematic src={cinematic} />;
  const adventureGameboard = <Gameboard src={gameboard} adventureName={name} />;

  return (
      <ul className="container__blocks">
        <ExtensionBlock page="overview" title="art" element={adventureArt}/>
        <ExtensionBlock page="overview" title="cardbacks" element={adventureRewards} />
        <ExtensionBlock page="overview" title="cinematic" element={adventureCinematic}/>
        <ExtensionBlock page="overview" title="gameboard" element={adventureGameboard}/>
      </ul>
  );
};

export default Overview;

Overview.propTypes = {
  adventure: PropTypes.string.isRequired,
  adventureCardbacks: PropTypes.array.isRequired,
};