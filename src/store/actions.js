import * as types from './mutations-types'
import {playMode} from '@/common/js/config'
export const selectPlay = function({commit}, {list, index}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit, state}, {list}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, Math.ceil(Math.random() * state.playList.length))
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAY_MODE, playMode.random)
}
