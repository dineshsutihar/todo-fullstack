import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Task from "@/components/Task";
import Image from "next/image";

export default function Home() {
  const tasks = [
    { title: 'Title 1', description: 'A short description.' },
    { title: 'Title 2', description: 'A medium-length description that is a bit longer.' },
    { title: 'Title 3', description: 'A very long description that is significantly longer and could potentially take up more space.' },
    { title: 'Title 4 this is just a randowm ', description: 'A very long description that is significantly longer and could potentially take up more space.  adn i will take more space to check weather this works fine or it creates any issue lets write more content in faith of that the this will work perfect without any issues ' },
    // Add more tasks as needed
  ];
  return (
    <main className="p-11">
      <Nav />

      <section className="flex">
        <Sidebar />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {tasks.map((task, index) => (
            <Task key={index} title={task.title} description={task.description} />
          ))}
        </section>
      </section>
    </main>
  );
}
