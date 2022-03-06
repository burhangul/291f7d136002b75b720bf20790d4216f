import Vue from "vue";
import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error.response.data && error.response.data.msg
        ? error.response.data.msg
        : error.response.data;
    Vue.$toast.error(message);
    return Promise.reject(error);
  }
);

export default axios;
