import * as types from "./mutations-types";
import { playMode } from "@/common/js/config";
import { mixinSetLyric } from "@/common/js/song.js";
import {
  saveSearch,
  deleteSearch,
  clearSearch,
  savePlay
} from "@/common/js/cache";
export const selectPlay = function({ commit }, { list, index }) {
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const randomPlay = function({ commit, state }, { list }) {
  commit(types.SET_PLAYLIST, list);
  commit(
    types.SET_CURRENT_INDEX,
    Math.ceil(Math.random() * state.playList.length)
  );
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_PLAY_MODE, playMode.random);
};

export const insertSong = function({ commit, state }, song) {
  const playList = state.playList.slice();
  let curIndex = state.currentIndex;
  let fpIndex = playList.findIndex(item => item.id === song.id);
  curIndex++;
  playList.splice(curIndex, 0, song);
  if (fpIndex > -1) {
    if (curIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      curIndex--;
    } else {
      playList.splice(fpIndex + 1, 1);
    }
  }
  commit(types.SET_PLAYLIST, playList);
  commit(types.SET_CURRENT_INDEX, curIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const delSong = function({ commit, state }, i) {
  let playList = state.playList.slice();
  let curIndex = state.currentIndex;
  playList.splice(i, 1);
  if (curIndex > i || curIndex === playList.length) {
    commit(types.SET_CURRENT_INDEX, curIndex - 1);
  }
  if (curIndex === i && state.mode === playMode.random) {
    const randomIndex = Math.ceil(Math.random() * playList.length)
        commit(types.SET_CURRENT_INDEX, randomIndex);

  }
  commit(types.SET_PLAYLIST, playList);
  if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false);
  }
};

export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query));
};

export const delSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
};

export const clearSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, clearSearch());
};

export const clearPlayList = function({ commit }) {
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING_STATE, false);
  commit(types.SET_FULL_SCREEN, false);
};

export const savePlayHistory = function({ commit }, query) {
  let song = mixinSetLyric(savePlay(query));
  commit(types.SET_PLAY_HISTORY, song);
};
