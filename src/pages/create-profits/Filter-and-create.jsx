import { FaPlus } from "react-icons/fa";
import propTypes from "prop-types"

export function FilterAndCreate({ createProfit }) {
	return (
		<div className="flex justify-center">
			<div className="w-[50rem] flex justify-between my-6 items-center">
				<select className="w-32 h-6 px-3 rounded">
					<option>Todos</option>
					<option>2024</option>
				</select>

				<button
					className="flex justify-center items-center h-10 w-44 gap-2 bg-lime-400 text-lime-950 rounded-lg cursor-pointer"
					onClick={() => createProfit()}
				>
					Criar novo lucro
					<FaPlus size={16} />
				</button>
			</div>
		</div>
	);
}

FilterAndCreate.propTypes = {
	createProfit: propTypes.func.isRequired,
}