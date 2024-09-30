"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskProps {
    title: string
    description?: string
    unique: number
    status: boolean
    setTasks: Function
}

export default function BentoTask({ title, description, unique, status, setTasks }: TaskProps) {
    const [done, setDone] = useState(status)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const putData = async () => {
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/${unique}`,
                    { status: done },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                )
                console.log(response.data)
            } catch (error) {
                console.error("Error updating task:", error)
            }
        }
        putData()
    }, [done, unique])

    const calculateRowSpan = useCallback((description?: string) => {
        const length = description?.length || 0
        if (length > 400) return 4
        if (length > 300) return 3
        if (length > 200) return 2
        return 1
    }, [])

    return (
        <Card
            className="bg-yellow-100 dark:bg-yellow-900 p-4 flex flex-col justify-between overflow-hidden"
            style={{
                gridRowEnd: `span ${calculateRowSpan(description)}`
            }}
        >
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h2 className={`font-bold text-lg ${done ? 'line-through text-gray-500' : ''}`}>
                        {title}
                    </h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEdit(!edit)}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className={`text-sm mb-4 ${done ? 'line-through text-gray-500' : ''}`}>
                    {description}
                </p>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`task-${unique}`}
                    checked={done}
                    onCheckedChange={() => setDone(!done)}
                />
                <label
                    htmlFor={`task-${unique}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Mark as done
                </label>
            </div>
            {edit && <Editor id={unique} setEdit={setEdit} setTasks={setTasks} />}
        </Card>
    )
}

interface EditorProps {
    id: number
    setEdit: (edit: boolean) => void
    setTasks: Function
}

function Editor({ id, setEdit, setTasks }: EditorProps) {
    return (
        <div className="mt-4">
            {/* Editor content */}
            <p>Editor placeholder for task {id}</p>
            <Button onClick={() => setEdit(false)}>Close Editor</Button>
        </div>
    )
}