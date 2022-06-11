import { useEffect,useState, useContext} from "react";
import { CitiesContext } from "../App";
export const Clock = ({ city_id })=> {
  const [hour,setHour]= useState(new Date());
  const cities = useContext(CitiesContext);
  const getTimeZone=() => {
    if(city_id){
      const { timeZone }= [...cities].find(c => c.city_id === city_id);
      return timeZone;
    }else{
      return "UTC";
    }
  };
  useEffect(()=>{
    const clock= setInterval(()=>{
      setHour(new Date())
    },1000);
    return () => clearInterval(clock);
  },[])
  return(
    <p>{hour.toLocaleTimeString("es-ES", {timeZone: getTimeZone(), hour12: false})}</p>
  )
};
