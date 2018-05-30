import axios from 'axios';
const api=process.env.REACT_APP_CCG_RECORDS_API_URL || "https://5b0d18bf8126c9001499756a.mockapi.io/api/v1/record";

export const getAll = () => axios.get(`${api}/api/v1/record`);