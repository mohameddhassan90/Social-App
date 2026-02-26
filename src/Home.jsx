import axios from "axios";
import Loading from "./Loading";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "./CreatePost";
import { useState } from "react";

export default function Home() {


  function getUserData() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }); 
  }

  // data for other user 
  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: [`posts`],
    queryFn: getPosts,
    
  });

  function getPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  if (isLoading) return <Loading></Loading>;
  if (isError) return <h1>Some Error</h1>;

  return (
    <>
    <div className="md:container w-full md:w-1/2 md:mx-auto">
      <CreatePost></CreatePost>
      <div className="grid grid-col-1 gap-5">
      {data?.data?.data?.posts?.map((post) => (
        <PostCard key={post._id} post={post} isHome></PostCard>
      ))}
    </div> 
    </div>
    </>
  );
}
