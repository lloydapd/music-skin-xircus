import React from 'react'
import globalHook from './globalHook'
import actions from './actions'

const initialState = {
  item: false,
  items: []
}

const useGlobal = globalHook(React, initialState, actions)
export default useGlobal
