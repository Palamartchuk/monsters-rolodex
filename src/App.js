/* import logo from './logo.svg'; */
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


const App = () => {

  console.log('rendered');

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) =>response.json())
    .then((users) => setMonsters(users));
  }, []);
  
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);
  

  return (
    <div className="App">
        <h1 className='app-title'>Rolodex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder={'search monsters'} className={'search-monsters_box'}/>
        <CardList monsters={filteredMonsters}/>
    </div>
  )
}


/* class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
    console.log('constructor')
    
  }

  componentDidMount() {
    console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) =>response.json())
      .then((users) => this.setState(
        () => {
          return { monsters: users }
        },
        () => {
          console.log(this.state.monsters);
        }
      ));
  };

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(
      () => {
        return { searchField }
      },
    )
  };

  render () {
    console.log('render')

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })


    return (
      <div className="App">
        <h1 className='app-title'>Rolodex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder={'search monsters'} className={'search-monsters_box'}/>
        <CardList monsters={filteredMonster}/>
      </div>
    );
  }
} */

export default App;
