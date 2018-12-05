import { playMode } from "@/common/js/config";

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  rank: {}
};

export default state;
