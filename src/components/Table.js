
// export const Table = styled.table`
//   width:100%;
//   background-color: white;
//   border-radius: 12px;
//   padding:1rem;
//   min-width: 790px;
//   border-collapse: collapse;
//   font-size: 0.75rem;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
//   thead tr {
//     font-size: 1rem;
//     text-align: left;
//   }
//   th,td {
//     padding: 12px 15px;
//   }
//   thead, tbody tr {
//     transition: 200ms;
//     border-bottom: 1px solid #dddddd;
//   }
//   tbody tr:last-of-type {
//     border-bottom:0;
//   }
//   tbody tr:hover{
//     /* font-weight: 500; */
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

// }
// `;
// export const TRowDnd = styled.tr`
//   transition: 0.2s;
//   cursor: move;
//   opacity: ${({ isDragging }) => isDragging ? 0 : 1};
// `;
// export const StatusBadge = styled.div`
//   color: white;
//   text-align: center;
//   background-color: ${props => props.status ? "#5ad07a" : "#e23428"};
//   padding: 0.75rem;
//   border-radius: 12px;
// `;



export const Table = ({dataRequired, data}) => {
const dataToSearch= dataRequired.map(value => value.key);
  return(
    <table>
      <thead>
        <tr>{dataRequired.map((header, index) => <th key={index}>{header.display}</th>)}</tr>
      </thead>
      <tbody>
        {data.length && data.map((person,index) => {
        return (<TableRow key={person.id + index} person={person} dataToDisplay={dataToSearch} />);
        })}
    </tbody>
  </table>
  )
}
const TableRow = ({ person ,dataToDisplay}) => (
  <tr>
    {dataToDisplay.map(data => <td key={data+person.id}>{person[data]}</td> )}
  </tr>
);
