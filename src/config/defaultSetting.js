export default {
  // vue-ls options
  storageOptions: {
    namespace: 'zall__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  sessionOptions: {
    namespace: 'zall__', // key prefix
    name: 'ss', // name variable Vue.[ls] or this.[$ls],
    storage: 'session' // storage name session, local, memory
  }
};
