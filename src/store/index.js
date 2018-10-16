import Vue from 'vue';
import Vuex from 'vuex';
import state from '@/store/src/state';
import mutations from '@/store/src/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state,
  mutations,
	strict: process.env.NODE_ENV !== 'production'
});
