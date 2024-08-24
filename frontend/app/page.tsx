"use client"
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Task from "@/components/Task";
import { UserContextProvider } from "@/context/UserContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";

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
        <Nav />

        <section className="flex">
          <Sidebar />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {tasks.map(({ title, status, description, _id }, index) => (
              console.log(title),

              <Task key={index} unique={_id} title={title} status={status} description={description} />
            ))}
          </section>
        </section>
      </main>
    </UserContextProvider>
  );
}
