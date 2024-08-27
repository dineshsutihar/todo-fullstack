import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateTodo from "./CreateTodo";


type NavProps = {
  setTask: Function;
};

export default function Nav({setTask}: NavProps): JSX.Element {
    const [createTodo, setCreateTodo] = useState(false);


    return (
        <nav className="flex justify-between h-14 text-3xl font-bold">
            <h2>todo</h2>
            <GrAdd onClick={() => setCreateTodo(!createTodo)} />
            {createTodo && <CreateTodo createTodo={createTodo} setTask={setTask} setCreateTodo={setCreateTodo} />}
        </nav>
    )
}