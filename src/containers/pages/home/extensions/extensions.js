import React from 'react';
import _ from 'lodash';
import Carousel from 'antd/lib/carousel';
import {Link} from 'react-router-dom';
import {expansion_details} from "../../../../data/expansion-details";
import {adventure_details} from "../../../../data/adventure-details";
import 'antd/lib/carousel/style/index.css';

const ExtensionsBlock = () => {
  const adventures = _.takeRight(adventure_details, 2);
  const expansions = _.takeRight(expansion_details, 2);
  let extensions = _.flatten(_.zip(adventures, expansions));

  const mapExtensions = () => {
    return extensions.reverse().map(extension => {
          const {url, overview} = extension;
          const {img} = overview;
          let extensionType = _.keys(extension)[0];

          return (
              <Link key={url} to={`/${extensionType}s/${url}/overview`}>
                <img src={img} alt={`${url}'s art`}/>
              </Link>
          )
        }
    )
  };

  return (
      <div className="slider">
       <Carousel autoplay
                 autoplaySpeed={5000}>
         {mapExtensions()}
       </Carousel>
      </div>
  );
};

export default ExtensionsBlock;