"use client"
import CreateBlog from "@/components/CreateTodo";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Task from "@/components/Task";
import { UserContextProvider } from "@/context/UserContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiArrowhead } from "react-icons/gi";
import { GrTopCorner } from "react-icons/gr";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/");
        const data = response.data;
        setTasks(data.todos);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return (
    <UserContextProvider>
      <main className="p-11">
        <Nav setTask={setTasks} />
        <section className="flex">
          <Sidebar />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {
              tasks.length > 0 ? (
                tasks.map(({ title, status, description, _id }, index) => (
                  <Task key={index} unique={_id} title={title} status={status} description={description} setTasks={setTasks} />
                ))
              ) : (
                <h1 className="flex w-96 flex-nowrap absolute top-[40%] left-[40%] h-28 ">
                  No Todo, Click on Plus button to create one.
                  <GiArrowhead className="inline-block transform -rotate-90 translate-x-2 translate-y-1" />
                </h1>


              )
            }

          </section>
        </section>
      </main>
    </UserContextProvider>
  );
}
