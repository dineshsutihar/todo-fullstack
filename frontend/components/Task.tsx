"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation" // Fixed import from next/navigation
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
    setTasks: (tasks: any) => void  // Improved type definition
}

interface EditorProps {
    id: number
    setEdit: (edit: boolean) => void
    setTasks: (tasks: any) => void
    title: string
    description?: string
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
                            'Content-Type': 'application/json'  // Fixed content type
                        }
                    }
                )
                console.log(response.data)
            } catch (error) {
                console.error("Error updating task:", error)
                setDone(!done) // Revert state on error
            }
        }
        putData()
    }, [done, unique, setDone])

    const calculateRowSpan = useCallback((description?: string) => {
        if (!description) return 1
        const length = description.length
        if (length > 400) return 4
        if (length > 300) return 3
        if (length > 200) return 2
        return 1
    }, [])

    return (
        <Card
            className={`p-4 flex flex-col justify-between overflow-hidden ${done ? 'bg-gray-100 dark:bg-gray-800' : 'bg-yellow-100 dark:bg-yellow-900'
                }`}
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
                            <DropdownMenuItem onClick={() => setEdit(true)}>
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
            {edit && (
                <Editor
                    id={unique}
                    setEdit={setEdit}
                    setTasks={setTasks}
                    title={title}
                    description={description}
                />
            )}
        </Card>
    )
}

function Editor({ id, setEdit, setTasks, title, description }: EditorProps) {
    const router = useRouter()
    const [taskTitle, setTaskTitle] = useState(title)
    const [taskDescription, setTaskDescription] = useState(description)
    const [isSaving, setIsSaving] = useState(false)

    const saveChanges = async () => {
        if (!taskTitle.trim()) {
            alert("Title cannot be empty")
            return
        }

        setIsSaving(true)
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/update/${id}`,
                {
                    title: taskTitle.trim(),
                    description: taskDescription?.trim(),
                    id
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            setTasks((prevTasks: any[]) =>
                prevTasks.map(task =>
                    task.id === id
                        ? { ...task, title: response.data.title, description: response.data.description }
                        : task
                )
            )
            setEdit(false)
            router.refresh() // Using refresh instead of reload
        } catch (error) {
            console.error("Error updating task:", error)
            alert("Failed to save changes. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700"
                    placeholder="Task title"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    value={taskTitle}
                    disabled={isSaving}
                />
                <textarea
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 min-h-[100px]"
                    placeholder="Task description"
                    onChange={(e) => setTaskDescription(e.target.value)}
                    value={taskDescription}
                    disabled={isSaving}
                />

                <div className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => setEdit(false)}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={saveChanges}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    )
}