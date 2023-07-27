'use client';
import React, {useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useStore from "../../store";


const Dashboard = () => {
  const router = useRouter();
  const user = useStore(state => state.user);
  // useEffect(() => {
  //   // checks if the user is authenticated
  //   authContext.isUserAuthenticated()
  //   ? router.push("/dashboard")
  //   : router.push("/");
  // }, [router]);
  return (

    <div className="bg-Image">
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to your  dashboard!
      </h1>
      <div className="flex justify-center space-x-4 mb-8">
        <Link href="/dashboard/testimonies" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a className="text-white">Testimonies</a>
          </button>
        </Link>
        <Link href="/dashboard/todo" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a className="text-white">Todo</a>
          </button>
        </Link>
        {/* <Link href="/dashboard/add-project" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a className="text-white">Add a Project</a>
          </button>
        </Link> */}
        <Link href="/dashboard/notes" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a className="text-white">Notes</a>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
