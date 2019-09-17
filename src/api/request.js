import axios from "axios";
import { Message } from "element-ui";

axios.defaults.timeout = 6000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API + "/myblog/";
// axios.defaults.withCredentials = true

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log('config', config)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    const { code, msg } = response.data;
    if (code === "200") {
      if (msg)
        Message({
          message: msg,
          type: "success"
        });
    } else {
      if (msg) Message.error(msg);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

const getData = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postData = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        Message.error("请求出错，请刷新页面！");
        reject(err);
      }
    );
  });
};

const deleteData = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const putData = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

export { getData, postData, deleteData, putData };
