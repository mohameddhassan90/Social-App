import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import PostCard from "./PostCard";

export default function PosttDetails() {
  const { id } = useParams();  //id bta3 al post 
  const { isError, isLoading, data } = useQuery({
    queryKey: ["singlepost", id],
    queryFn: getSinglePost,
  });
console.log(`post Detaiels`,data);

  

  function getSinglePost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h1>Some Error</h1>;
  

  return (
    <div className="md:container w-full md:w-1/2 md:mx-auto my-5">
      <PostCard post={data?.data?.data?.post} isHome={false}></PostCard>
    </div>
  );
}
