import React, { Component } from "react";

const AppContext = React.createContext();
const AppConsumer = AppContext.Consumer;

class AppProvider extends Component {
  state = {
    name: "React Context API"
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export { AppProvider, AppConsumer };
