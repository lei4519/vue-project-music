import storage from "good-storage";
const SEARCH_KEY = "__search__";
const PLAY_KEY = "__play__";
const SEARCH_MAX_LENGTH = 15;
const PLAY_MAX_LENGTH = 200;

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200;

function insertArray(arr, val, compare, maxLen) {
  let i = arr.findIndex(compare);
  if (i === 0) {
    return;
  }
  if (i > 0) {
    arr.splice(i, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}
function deleteFormArray(arr, compare) {
  let i = arr.findIndex(compare);
  if (i > -1) {
    arr.splice(i, 1);
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  const compare = item => item === query;
  insertArray(searches, query, compare, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, searches);
  return searches;
}
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  const compare = item => item === query;
  deleteFormArray(searches, compare);
  storage.set(SEARCH_KEY, searches);
  return searches;
}
export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return [];
}
export function loadSearch() {
  return storage.get(SEARCH_KEY, []);
}

export function savePlay(song) {
  let playHistory = storage.get(PLAY_KEY, []);
  const compare = item => item.id === song.id;
  insertArray(playHistory, song, compare, PLAY_MAX_LENGTH);
  storage.set(PLAY_KEY, playHistory);
  return playHistory;
}
export function loadPlay() {
  return storage.get(PLAY_KEY, []);
}

export function saveFavorite(song) {
  let favoriteList = storage.get(FAVORITE_KEY, []);
  const compare = item => item.id === song.id;
  insertArray(favoriteList, song, compare, FAVORITE_MAX_LENGTH);
  storage.set(FAVORITE_KEY, favoriteList);
  return favoriteList;
}
export function deleteFavorite(song) {
  let favoriteList = storage.get(FAVORITE_KEY, []);
  const compare = item => item.id === song.id;
  deleteFormArray(favoriteList, compare);
  storage.set(FAVORITE_KEY, favoriteList);
  return favoriteList;
}
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, []);
}
