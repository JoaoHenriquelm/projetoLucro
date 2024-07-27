import { FaPlus } from "react-icons/fa";

export function FilterAndCreate() {
	return (
		<div className="flex justify-center">
			<div className="w-50 flex justify-between my-6 items-center">
				<select className="w-32 h-6 px-3 rounded">
					<option>Todos</option>
					<option>2024</option>
				</select>

				<div className="flex justify-center items-center h-10 w-44 gap-2 bg-lime-400 text-lime-950 rounded-lg cursor-pointer">
					<button>Criar novo lucro</button>
					<FaPlus size={16} />
				</div>
			</div>
		</div>
	);
}
