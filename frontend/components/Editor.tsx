import axios from "axios";
import { useCallback } from "react";
import { GrEdit, GrTrash } from "react-icons/gr";

type Edit = {
    id: Number,
    setEdit: Function,
    setTasks: Function,
}
export default function Editor({ id, setEdit, setTasks }: Edit) {

    const deletePost = useCallback(async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/${id}`)
            const data = response.data
            console.log(data)
            setTasks(data.todos)
            setEdit(false)

        } catch (error) {
            console.error("Error deleting Todo:", error)
        }
    }, [id, setEdit, setTasks])


    return (
        <div className="bg-slate-50 absolute top-8 right-3 rounded-lg p-3 w-40">
            <div className="flex flex-nowrap gap-2 justify-start items-center cursor-pointer hover:bg-slate-300 rounded-md p-1"><GrEdit /> <span>Edit</span></div>
            <div onClick={deletePost} className="flex flex-nowrap gap-2 justify-start items-center hover:bg-slate-300 p-1 rounded-md cursor-pointer"><GrTrash /> <span>Delete</span></div>
        </div>
    )
}