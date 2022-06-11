import { Table } from './components/Table';
import {useState,useEffect} from "react";
function App() {
const [data,setData] = useState([]);

const dataToDisplay = [
  {key: "name", display: "Nombre"},
  {key: "surname1", display: "Apellido"},
  {key: "age", display: "Edad"},
  {key: "height", display: "Altura"},
  {key: "weight", display: "Peso"},
  {key: "city", display: "Ciudad"},
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
        country: requiredCountry.countryName,
        studies: requiredStudies ? requiredStudies.level :"-----",
        gender: requiredGender.type,
        bloodtype: requiredBloodtype.bloodName,
      };
    });
    setData(newData);
  }).catch(() => setData([]));
},[]);

  return (
    <div className="App">
      <Table dataRequired={dataToDisplay} data={data}/>
    </div>
  );
}

export default App;
