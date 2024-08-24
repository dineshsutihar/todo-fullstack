import { GrMore, GrTrash } from "react-icons/gr";

type TaskProps = {
    title: string,
    description: string
}

export default function Task({ title, description }: TaskProps): JSX.Element {

    function calculateRowSpan(description: string): number {
        const length = description.length;
        if (length > 300) return 4;
        if (length > 200) return 3;
        if (length > 100) return 2;
        return 1;
    }
    const bentoGrid: number = calculateRowSpan(description);

    return (
        <div className={`bg-yellow-200 p-4 rounded-xl min-h-min lg:row-span-${bentoGrid}`}>
            <div className="flex justify-between align-baseline items-baseline gap-12">
                <h1 className="font-bold text-x pb-3">{title}</h1>
                <GrMore />
            </div>
            <p className="text-sm">{description}</p>
            <div className="w-full flex justify-end pt-3">
                <button className=" rounded-lg flex text-sm justify-center items-center align-baseline gap-1"  > <input type="checkbox" />Done</button>
            </div>
        </div >
    )
}