import axios from "axios";
import { useEffect, useState } from "react"
import LandingPage from "./components/LandingPage(1)";
import { BrowserRouter, Routes,Route } from "react-router";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup"
import Signin from "./pages/Signin";
import Courses from "./pages/Courses";
import { CounterContext, type User } from "./context/counterContext";
import { supabase } from "./utils/supabase";
import { localUser } from "./utils/Dotenv";
import { toast } from "react-toastify";
import Contact from "./pages/Contact";
const id="UMGsyUj-lsc"
// const id="PLRAV69dS1uWRH0QDzQaKLQEYD26YCQ5eS"
const YOUTUBE_API_KEY="AIzaSyCfjQDjAw3CBaykfIJP6nEKmQ8ZMKw5QnE" 
function App() {
let [user,setuser]=useState<User>()
  async function GetYTData(){
try {
  let {data}=await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=${YOUTUBE_API_KEY}`)
  console.log(data)
} catch (error) {
  console.log(error)
}
  }
  async function GetPlaylist(){
try {
  let {data}=await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${id}&maxResults=50&key=${YOUTUBE_API_KEY}`)
  console.log(data)
} catch (error) {
  console.log(error)
}

  }
  async function GetUser(){
    try {
      let {data,error}:{data:any,error:any}=await supabase.from("users").select("*")
                                .eq('email', localStorage.getItem(localUser)) // Filters where the email column matches
                                 // Optional: Returns a single object instead of an array of objects
        console.log(data)//->array-->empty
        if(data?.length==0){
          toast.error("You have not created an account please create an account first")
        }
        else if(error){
          console.log(error)
          toast.error("signin failed")
        }
        else{
          if(data[0].email){
            console.log(data[0])
      setuser(data[0])
          }
        }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem(localUser)){

      GetUser();
    }
GetYTData();
  },[])
  return (
    <>
<BrowserRouter>
<CounterContext.Provider value={{user,setuser}}>

<Navbar/>
<Routes>

<Route path="/" element={<LandingPage/>}></Route>
<Route path="/signup" element={<Signup/>}></Route>
<Route path="/signin/:email" element={<Signin/>}></Route>
<Route path="/course" element={<Courses/>}></Route>
<Route path="/contact" element={<Contact/>}></Route>
</Routes>
</CounterContext.Provider>
</BrowserRouter>
    
    
    </>
  )
}

export default App
