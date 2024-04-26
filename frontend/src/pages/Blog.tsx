import { useParams } from "react-router-dom";
import { Content } from "../components/Content";
import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
  const {id}=useParams()
  const {loading,blog}=useBlog({
    id:id || ""
  });
  if(loading){
    return <div>
      <Appbar/>
      <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <Spinner/>
      </div>
    </div>
    </div>
  }
  return (
      <div>
      <Content blog={blog}/>
      </div>
  )
}