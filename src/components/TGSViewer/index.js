import React from 'react';
import '@lottiefiles/lottie-player/dist/tgs-player';

const TSGViewer = ({ sticker, style = {} }) => {
  return (
    <tgs-player
      autoplay={false}
      loop
      mode='normal'
      src={sticker}
      style={{ width: 100, height: 100, ...style }}
    ></tgs-player>
  );
};

export default TSGViewer;
