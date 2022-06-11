import { Clock } from "./Clock";
export const Table = ({dataRequired, data}) => {
const dataToSearch= dataRequired.map(value => value.key);
  return(
    <table className="table__data">
      <thead>
        <tr>{dataRequired.map((header, index) => <th key={index}>{header.display}</th>)}</tr>
      </thead>
      <tbody>
     {data.length ?
        data.map((person,index) => {
        return (<TableRow key={person.id + index} person={person} dataToDisplay={dataToSearch} />);
        })
      :<tr><td>No hay datos</td></tr>}
    </tbody>

  </table>
  )
}
const TableRow = ({ person ,dataToDisplay}) => (
  <tr>
    {dataToDisplay.map(data =>
      <td key={data+person.id}>
      {data === "country"
      ? (<>
      <a href={`https://www.google.es/maps?q=${person[data]}}`}>{person[data]}</a>
      <Clock city_id={person.city_id}/>
      </>)
      : person[data]
    }</td> )
    }
  </tr>
);
