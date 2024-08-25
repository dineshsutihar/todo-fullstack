import axios from "axios"
import { useCallback, useEffect, useState } from "react"

type CreateTodoProps = {
    createTodo: boolean,
    setCreateTodo: Function,
}

export default function CreateTodo({ createTodo, setCreateTodo }: CreateTodoProps): JSX.Element {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const postTodo = useCallback(async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/create", {
                title,
                description
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            const data = response.data
            console.log(data)
            // Optionally, close the modal after creating the 
            setCreateTodo(false)
        } catch (error) {
            console.error("Error creating Todo:", error)
        }
    }, [title, description, setCreateTodo])

    return (
        <div className="absolute inset-0 bg-[rgba(108,117,125,0.75)] w-full h-full z-10 flex items-center justify-center">
            <div className="bg-slate-50 rounded-lg w-96 p-6 shadow-lg text-sm">
                <h1 className="text-2xl font-bold mb-4">Create Todo</h1>
                <input
                    type="text"
                    value={title}
                    name="title"
                    id="createTitle"
                    placeholder="Write the title of Your Todo..."
                    className="w-full p-2 mb-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    name="description"
                    value={description}
                    id="createDescription"
                    rows={8}
                    placeholder="Write Your Todo Description here..."
                    className="w-full p-2 mb-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="flex justify-between gap-2">
                    <button className="bg-slate-500 text-white rounded-lg px-4 py-2 hover:bg-slate-600">Create</button>
                    <button onClick={() => setCreateTodo(!createTodo)} className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600">Cancel</button>
                </div>
            </div>
        </div>
    )
}
