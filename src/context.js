import React from 'react';

export const LOCAL_URL = `http://localhost:8080`;
export const PRODUCTION_URL = `http://15.165.98.145:8080`;

export const MyContext = React.createContext({
    API_URL: PRODUCTION_URL,
});