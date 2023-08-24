import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = `http://localhost:8080`;

export async function postData(url: string, data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `${BASE_URL}${url}`,
    data,
  };

  try {
    const response: AxiosResponse = await axios(config);

    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("token", response?.data?.data?.token);
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        data: response.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export async function getHData(url: string) {
  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    url: `${BASE_URL}${url}`,
  };

  try {
    const response: AxiosResponse = await axios(config);

    if (response.status === 200 || response.status === 201) {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        data: response.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export async function getData(url: string) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${BASE_URL}${url}`,
  };

  try {
    const response: AxiosResponse = await axios(config);

    if (response.status === 200 || response.status === 201) {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        data: response.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}
