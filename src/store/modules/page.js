const page = {
  state: {
    changeModel:{ idx: 1}
  },
  mutations: {
    setChangeModel (state, changeModel) {
      state.changeModel = changeModel;
    },
    
  },
  actions: {
    changeModel ({ commit }, payload) {
      commit('setChangeModel', payload);
    }
  }
};
export default page;
