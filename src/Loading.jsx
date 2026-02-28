import React from "react";
import { ClipLoader } from "../node_modules/react-spinners";

export default function Loading() {
  return (
    <div className="h-screen bg-transparent text-black flex justify-center items-center">
      <ClipLoader></ClipLoader>
    </div>
  );
}
