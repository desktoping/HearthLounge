import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import startCase from 'lodash/startCase';
import Tooltip from 'antd/lib/tooltip';
import {supported_domains} from "../utils/reddit/posts";

const selectType = (
    iconName,
    title = null,
    className = '',
    type = null,
    tooltip = false,
    tooltipPlacement = "bottom",
    domain = null,
    linkFlairText = null) => {

  const validateSet = () =>{
    switch(iconName){
      case "classic": return "hs-logo";
      case "curse-of-naxxramas": return "naxxramas";
      case "one-night-in-karazhan": return "karazhan";
      default: return _.toLower(iconName);
    }
  };
  const validateMode = iconName === "standard" ? "mammoth" : iconName;

  const iconWrapper = (icon) => {
    let iconTitle = title ? title : iconName;
    return (
        <Tooltip title={startCase(iconTitle)}
                 placement={tooltipPlacement}
                 arrowPointAtCenter={true}>
          {icon}
        </Tooltip>
    )
  };

  let icon = (name) => {
    let icon = <span className={`hs-icon icon-${name} ${className}`}></span>;
    return tooltip ? iconWrapper(icon) : icon;
  };

  let manaIcon = (name) => {
    let icon = <span className={`hs-icon icon-mana-${name} ${className}`}></span>;
    return tooltip ? iconWrapper(icon) : icon;
  };

  let redditDomainIcons = (domain) => {
    if(linkFlairText !== null){
      let flair_text = linkFlairText.toLowerCase();
      let self = domain.includes(supported_domains[2]);

      if (domain.includes(supported_domains[0]))
        return icon("battlenet");
      if (domain.includes(supported_domains[1]))
        return icon("youtube");
      if (self && flair_text !== "tournament")
        return icon("bubbles2");
      if (self && flair_text === "tournament")
        return icon("trophy");
      if (domain !== supported_domains[2]) {
        let strippedDomain = domain.replace(/\.com|clips\.|\.tv/g, "").toLowerCase();
        return icon(strippedDomain);
      }
    }
  };

  switch(type){
    case 'set': return icon(validateSet(iconName));
    case 'mode': return icon(validateMode);
    case 'mana': return manaIcon(iconName);
    case 'reddit': return redditDomainIcons(domain);
    default: return icon(iconName);
  }
};

const Icon = ({name, title, className, type, tooltip, tooltipPlacement, domain, linkFlairText}) => selectType(name, title, className, type, tooltip, tooltipPlacement, domain, linkFlairText);

export default Icon;

Icon.propTypes = {
  name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  tooltipPlacement: PropTypes.string
};