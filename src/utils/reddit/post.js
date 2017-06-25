import React from 'react';
export const createMarkup = (obj) =>{
  let html = obj.selftext_html;
  html = html.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&amp;#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace('<!-- SC_OFF -->', '')
      .replace('<!-- SC_ON -->', '')
      .replace('class', 'className');
  return {__html: html};
};

export const iframe = (src, index)=>{
  const height= 500, width= 500;
  return <iframe key={index} height={height} width={width} src={src}></iframe>
};

export const filterPosts = (props) => {
  return props.posts.filter(p => p.id === props.params.id).map((obj, index) => {
    let url = obj.url;
    let replacedYTUrl = url.replace("watch?v=", "embed/");
    let replacedYTShortenerUrl = url.replace("youtu.be/", "youtube.com/embed/");
    let replacedTwitchUrl = url.replace("https://clips.twitch.tv/", "");

    switch (obj.domain) {
      case 'self.hearthstone':
        return <div key={index} className="section-body" dangerouslySetInnerHTML={createMarkup(obj)}/>;
      case 'youtube.com':
        return iframe(replacedYTUrl, index);
      case 'youtu.be':
        return iframe(replacedYTShortenerUrl, index);
      case 'clips.twitch.tv':
        return iframe(`https://clips.twitch.tv/embed?clip=${replacedTwitchUrl}`, index);
      default:
        window.open(url);
        break;
    }
  })
};