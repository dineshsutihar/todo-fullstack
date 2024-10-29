export default function Sidebar(): JSX.Element {
    return (
        <aside className="w-52 hidden md:block">
            <nav>
                <ul className="space-y-4">
                    <li className="flex items-center space-x-2 p-2 rounded-lg shadow">
                        <div
                            className="rounded-full h-8 w-8"
                            style={{ backgroundColor: " #7845ed" }}
                        ></div>
                        <p className="text-gray-700">Work</p>
                    </li>
                    <li className="flex items-center space-x-2 p-2 rounded-lg shadow">
                        <div
                            className="rounded-full h-8 w-8"
                            style={{ backgroundColor: "#40c5f2" }}
                        ></div>
                        <p className="text-gray-700">Study</p>
                    </li>
                    <li className="flex items-center space-x-2 p-2 rounded-lg shadow">
                        <div
                            className="rounded-full h-8 w-8"
                            style={{ backgroundColor: "#e55757" }}
                        ></div>

                        <p className="text-gray-700">Entertainment</p>
                    </li>
                    <li className="flex items-center space-x-2 p-2 rounded-lg shadow">
                        <div
                            className="rounded-full h-8 w-8"
                            style={{ backgroundColor: "#00aa00" }}
                        ></div>
                        <p className="text-gray-700">Family</p>
                    </li>
                </ul>
            </nav>
        </aside>

    );
}