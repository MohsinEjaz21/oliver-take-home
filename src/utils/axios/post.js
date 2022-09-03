


import axios from "axios";
import { config } from "../../config";

export default function post(params) {
  const { data, url: routeTo, method = 'POST' } = params;
  console.log(`serverUrl is ${config.SERVER_URL}`);
  return (
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: method,
      url: `${config.SERVER_URL}${routeTo}`,
      data: data || {},
    })
  )
}

