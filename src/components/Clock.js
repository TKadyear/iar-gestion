import { useEffect,useState } from "react";
export const Clock = ()=> {
  const [hour,setHour]= useState(new Date());
  useEffect(()=>{
    const clock= setInterval(()=>{
      console.log("entra")
      setHour(new Date())
    },1000);
    return () => clearInterval(clock);
  },[])
  return(
    <p>{hour.toUTCString()}</p>
  )
};
