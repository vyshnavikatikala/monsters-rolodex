import React, { Component } from "react"; //react library allows us to write html inside js file and understands it.
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

/*
Component allows to use class to return a html code.
We can have access to state by using class component.
*/
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      /*
       to store the value typed and use it to filter, we need to store it as a state.
      */
      searchField: "",
    };
  }

  /*
    This performs the function only after the react component is mounted.
  */
  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users") // api call
      .then((response) => response.json()) // converting the response into json so that js can unserstand and use.
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }

  /*
    Whenever setState func is called, the render function is also called again as the state has got updated.
    It is a unidirectional flow.
  */
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div
        className="App"
        /*
        The curly brackets says it is a Javascript expression.
        And it dynamically access the string.
        Key is required to uniquely identify the state change and re-renders only that element.
        */
      >
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
