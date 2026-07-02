import axios from "axios"
import { useEffect } from "react"
const id="UMGsyUj-lsc"
const YOUTUBE_API_KEY="AIzaSyCfjQDjAw3CBaykfIJP6nEKmQ8ZMKw5QnE" 

function Courses() {
  async function GetYTData(){
try {
  let {data}=await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=${YOUTUBE_API_KEY}`)
  console.log(data)
} catch (error) {
  console.log(error)
}
  }
  useEffect(()=>{
GetYTData()
  },[])
  return (
    <div>
      <h1>Hello I am courses page</h1>
    </div>
  )
}

export default Courses
