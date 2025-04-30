import { SignIn } from "@clerk/nextjs";

export default function (){
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
    <SignIn/>
  </div> 
}