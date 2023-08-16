import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const useFlip = () => {
  const [state, setState] = useState(true);
  const toggleState = () => {
    setState((state) => !state);
  };

  return [state, toggleState];
};

// const useAxios = (url) => {
//   const [resp, setResp] = useState({});
//   const [error, setError] = useState(null);
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//            setResp(json);
//       if (json.data) {
//         setCards((cards) => [...cards, { ...json.data, id: uuid() }]);
//       }
//       } catch (err) {
//         setError(error);
//       }
//     };
//     fetchData();
//   }, [url]);

//   return [cards, setCards];
// };
// export { useFlip, useAxios };

function useAxios(keyInLS, baseUrl) {
  const [responses, setResponses] = useLocalStorage(keyInLS);

  const addResponseData = async (
    formatter = (data) => data,
    restOfUrl = ""
  ) => {
    const response = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponses((data) => [...data, formatter(response.data)]);
  };

  const clearResponses = () => setResponses([]);

  return [responses, addResponseData, clearResponses];
}

function useLocalStorage(key, initialValue = []) {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage };
