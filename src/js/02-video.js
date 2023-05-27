import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function onPlay({ seconds }) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
}

player.on('timeupdate', throttle(onPlay, 1000));

let seconds = JSON.parse(localStorage.getItem('videoplayer-current-time'));
if (seconds) {
  player.setCurrentTime(seconds);
}
