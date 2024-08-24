import { GrAdd } from "react-icons/gr";


export default function Nav(): JSX.Element {

    return (
        <nav className="flex justify-between h-14 text-3xl font-bold">
            <h2>todo</h2>
            <GrAdd />
        </nav>
    )
}