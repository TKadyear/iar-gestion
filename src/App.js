import { Table } from './components/Table';
import { Clock } from './components/Clock';
import React,{ useState, useEffect } from "react";

export const CountriesContext = React.createContext();
function App() {
const [data,setData] = useState([]);
const [countries,setCountries] = useState([]);
const [continents,setContinents] = useState([]);

const dataToDisplay = [
  {key: "name", display: "Nombre"},
  {key: "surname1", display: "Apellido"},
  {key: "age", display: "Edad"},
  {key: "height", display: "Altura"},
  {key: "weight", display: "Peso"},
  {key: "city", display: "Ciudad"},
  {key: "country", display: "País"},
  {key: "studies", display: "Estudios"},
  {key: "gender", display: "Género"},
  {key: "bloodtype", display: "Grupo sanguíneo"}
];
useEffect(()=> {
  fetch("./data.json")
  .then(res => res.json())
  .then(res => {
    const newData= res.people.map(person => {
      const requiredCity = [...res.cities].find(city => city.city_id === person.city_id);
      const requiredCountry = [...res.countries].find(country => country.country_id === requiredCity.country_id);
      const requiredStudies = [...res.studies].find(study => study.study_id === person.study_id);
      const requiredGender = [...res.gender].find(gender => gender.gender_id === person.gender_id);
      const requiredBloodtype = [...res.bloodType].find(bloodtype => bloodtype.bloodType_id === person.bloodtype_id);
      return {
        ...person,
        id :person.person_id,
        city: requiredCity.cityName,
        country_id: requiredCountry.country_id,
        country: requiredCountry.countryName,
        studies: requiredStudies ? requiredStudies.level :"-----",
        gender: requiredGender.type,
        bloodtype: requiredBloodtype.bloodName,
      };
    });
    setData(newData);
    setCountries(res.countries);
    setContinents(res.continents);
  }).catch(() => setData([]));
},[]);
const [personToDisplay,setPersonToDisplay] = useState([]);
const [sortContinent,setSortContinent] = useState("select");
useEffect(()=> {
  if(sortContinent && sortContinent != "select" && sortContinent != "ninguno" ){
    const newList = data.filter(p => {
    const personCountry = [...countries].find(country => country.country_id === p.country_id);
    return personCountry.continent_id === sortContinent;
    });
    setPersonToDisplay(newList.length ?newList :data);
  }else{
    setPersonToDisplay(data);
  }
}, [data,sortContinent,countries])
  return (
    <CountriesContext.Provider value={countries}>
    <div className="App">
      <main className="main__container">
        <div className="main__container__options-clock">

      <select id="select_continent" value={sortContinent} onChange={(e)=> setSortContinent(e.target.value)}>
        <option disabled value="select">Selecciona un continente</option>
        {continents.map((continent,index) =>
        <option value={continent.continent_id} key={index+continent.continentName}>{continent.continentName}</option>)}
        <option value="ninguno">Ninguno</option>
      </select>
        <Clock/>
        </div>
      <Table dataRequired={dataToDisplay} data={personToDisplay}/>

      </main>
    </div>
    </CountriesContext.Provider>
  );
}

export default App;
