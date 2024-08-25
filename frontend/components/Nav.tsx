import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateTodo from "./CreateTodo";


export default function Nav(): JSX.Element {
    const [createTodo, setCreateTodo] = useState(false);


    return (
        <nav className="flex justify-between h-14 text-3xl font-bold">
            <h2>todo</h2>
            <GrAdd onClick={() => setCreateTodo(!createTodo)} />
            {createTodo && <CreateTodo createTodo={createTodo} setCreateTodo={setCreateTodo} />}
        </nav>
    )
}