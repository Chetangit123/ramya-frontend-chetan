// auth.js
import axios from 'axios';

export const getJwtToken = async () => {
  const { data } = await axios.post(
    'https://apigateway.bluedart.com/in/authenticator/token/v1/login', // endpoint name for example
    {
      LoginID: process.env.BLUE_DART_LOGIN,
      LicenceKey: process.env.BLUE_DART_KEY
    }
  );
  return data.token;
};
