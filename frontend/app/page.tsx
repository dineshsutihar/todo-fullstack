import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-11">
      <Nav />
      <Sidebar />
    </main>
  );
}
