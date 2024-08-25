"use client"
import { GrMore } from "react-icons/gr";
import Editor from "./Editor";
import { useState, useEffect } from "react";
import axios from "axios";

type TaskProps = {
    title: string,
    description?: string,
    unique: number,
    status: boolean
}

export default function Task({ title, description, unique, status }: TaskProps): JSX.Element {
    const [done, setDone] = useState(status);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, [done, unique])



    function calculateRowSpan(description: string): number {
        const length = description.length;
        if (length > 300) return 4;
        if (length > 200) return 3;
        if (length > 100) return 2;
        return 1;
    }
    const bentoGrid: number = calculateRowSpan(description || "");

    return (
        <div className={`bg-yellow-200 relative p-4 rounded-xl min-h-min lg:row-span-${bentoGrid}`}>
            <div className="flex justify-between align-baseline items-baseline gap-12">
                {done ? <s><h1 className="font-bold text-x pb-3">{title}</h1></s> : <h1 className="font-bold text-x pb-3">{title}</h1>}
                <GrMore className="text-lg text-nowrap" onClick={() => setEdit(!edit)} />
            </div>
            {done ? <s><p className="text-sm">{description}</p></s> : <p className="text-sm">{description}</p>}
            <div className="w-full flex justify-end pt-3 items-center  gap-1 align-baseline">
                <input onClick={() => setDone(!done)} type="checkbox" checked={done ? true : false} id={`checkbox${unique}`} />
                <label htmlFor={`checkbox${unique}`} className=" rounded-lg text-sm" >Done</label>
            </div>
            {edit && <Editor />}
        </div >
    )
}