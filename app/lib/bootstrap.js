import axios from 'axios';
import config from '../../config';
import Stats from '../components/Stats';

export default function(state, req) {
  let requests = [];
  if (state.components.includes(Stats)) requests.push({store: 'StatsStore', url: `${config.apiBaseUrl}/stats`, key: 'stats'});

  return axios.all(requests.map(r => {return axios.get(r.url)})).then(data => {
    let stores = {}
    data.forEach((d, i) => {
      stores[requests[i].store] = {};
      stores[requests[i].store][requests[i].key] = d.data;
    });
    return JSON.stringify(stores);
  });
};
