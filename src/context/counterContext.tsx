import { createContext } from "react";
export type User={
name:string,
email:string,
_id:string,
phone:string,
isadmin:string,
}
const InitialValue={
  user:undefined,
  setuser:()=>{},
  sidebartext:"Courses",
setsidebartext:()=>{},  
}
export let CounterContext=createContext<counterContextType>(InitialValue)
 interface counterContextType {
  //! This is the standard React type for a setState function
  // setcount:React.Dispatch<React.SetStateAction<number>>
  // count:number
user:User|undefined,
setuser:React.Dispatch<React.SetStateAction<User|undefined>>,
sidebartext:string|undefined,
setsidebartext:React.Dispatch<React.SetStateAction<string>>

  

}
