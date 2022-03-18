const appActions = {
  setAudio: async(store, item) => {
    await store.setState({ item: item })
  },
  getItems: async(store, items) => {
    await store.setState({ items: items })
  }
}

export default appActions
