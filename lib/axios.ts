import axios from "axios";

const baseURL = process.env.PAYSTACK_URL


export const paysackInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      'accept': 'text/plain',
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
    },
  });

  paysackInstance.interceptors.request.use(
    async (config) => {
      if (process.env.PAYSTACK_SECRET_KEY) {
        config.headers.Authorization = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;
      }
      return config;
    }
  )