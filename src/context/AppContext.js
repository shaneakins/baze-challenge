import React, { useState, useEffect } from "react";
import _ from 'lodash';

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = (props) => {

  const [state, setState] = useState({
    tilesData:[],
    currentTile:null,
    isModalActive: false,
    isLoading: false
  });

  useEffect(()=> {
    fetch("./tilesData.json")
      .then(res => res.json())
      .then(data => {
        let newData = _.shuffle(data.tilesData)
        setState(state =>({
          ...state,
          tilesData: newData
        }))
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  )
}

export {AppContext, AppProvider}