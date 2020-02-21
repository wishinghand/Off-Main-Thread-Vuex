import Vuex from "vuex";
import Vue from "vue";

const actions = new Worker('./actions.js', { type: 'module' });

Vue.use(Vuex);

function calculatePrimes(iterations, multiplier) {
  var primes = [];
  const now = Date.now();

  // Casual UI-Locking code for 2 seconds!
  while (now + 2000 >= Date.now());

  // Heavy computation!
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

const store = new Vuex.Store({
  state: {
    items: [],
    isWorking: false
  },

  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    
    SET_WORKING(state, value) {
      state.isWorking = value;
    }
  },

  actions: {
    // generateItems({ commit }) {
    //   commit("SET_WORKING", true);
      
    //   const primes = calculatePrimes(400, 1000000000);
      
    //   commit("SET_WORKING", false);
      
    //   commit("SET_ITEMS", primes);
    // },

    // async generateItems({ commit }) {
    //   // TODO: Dispatch action to the worker thread.
    //   commit('SET_WORKING', true);

    //   actions.postMessage('generateItems'); // how do we wait for the data?
    //   // actions.postMessage('generateItems', { commit }); // Can we send commit fn to the worker?

    //   commit('SET_WORKING', false);
    // },

    async generateItems({ commit }) {
      actions.postMessage('generateItems');
    }
  }
});


// Handle incoming messages as commits!
actions.onmessage = e => {
  store.commit(e.data.type, e.data.payload);
};

export default store;
