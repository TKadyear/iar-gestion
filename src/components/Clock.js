import { useEffect,useState, useContext} from "react";
import { CountriesContext } from "../App";

export const Clock = ({ country_id })=> {
  const [hour,setHour]= useState(new Date());
  const countries = useContext(CountriesContext);
  const getTimeZone=() => {
    if(country_id){
    const { timeZone }= [...countries].find(c => c.country_id === country_id);
    return timeZone;
    }else{
      return "en-US";
    }
  };
  useEffect(()=>{
    const clock= setInterval(()=>{
      setHour(new Date())
    },1000);
    return () => clearInterval(clock);
  },[])
  return(
    <p>{hour.toLocaleTimeString(getTimeZone(), {timeZone: "UTC", hour12: false})}</p>
  )
};
