"use client"
import { GrMore } from "react-icons/gr";
import Editor from "./Editor";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

type TaskProps = {
    title: string,
    description?: string,
    unique: number,
    status: boolean,
    setTasks: Function,

}

export default function Task({ title, description, unique, status, setTasks }: TaskProps): JSX.Element {
    const [done, setDone] = useState(status);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const putData = async () => {
            try {
                const response = await axios.put(`http://localhost:8000/api/v1/${unique}`, {
                    status: done
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                const data = response.data;
                console.log(data);

            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        putData();
    }, [done, unique])



    const calculateRowSpan = useCallback((description?: string) => {
        const length = description?.length || 1;
        if (length > 400) return 4;
        if (length > 300) return 3;
        if (length > 200) return 2;
        if (length > 100) return 1;
        return 1;
    }, [])

    return (
        <div className={`bg-yellow-200 relative p-4 rounded-xl h-min`}>
            <div className="flex justify-between align-baseline items-baseline gap-12">
                {done ? <s><h1 className="font-bold text-x pb-3">{title}</h1></s> : <h1 className="font-bold text-x pb-3">{title}</h1>}
                <GrMore className="text-lg text-nowrap" onClick={() => setEdit(!edit)} />
            </div>
            {done ? <s><p className="text-sm">{description}</p></s> : <p className="text-sm">{description}</p>}
            <div className="w-full flex justify-end pt-3 items-center  gap-1 align-baseline">
                <input onClick={() => setDone(!done)} type="checkbox" checked={done ? true : false} id={`checkbox${unique}`} />
                <label htmlFor={`checkbox${unique}`} className=" rounded-lg text-sm" >Done</label>
            </div>
            {edit && <Editor id={unique} setEdit={setEdit} setTasks={setTasks} />}
        </div >
    )
}