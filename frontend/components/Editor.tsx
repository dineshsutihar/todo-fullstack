import { GrEdit, GrTrash } from "react-icons/gr";

export default function Editor() {
    return (
        <div className="bg-slate-50 absolute top-8 right-3 rounded-lg p-4 w-40">
            <div className="flex flex-nowrap gap-2 justify-start items-center pb-2"><GrEdit /> <span>Edit</span></div>
            <div className="flex flex-nowrap gap-2 justify-start items-center"><GrTrash /> <span>Delete</span></div>
        </div>
    )
}