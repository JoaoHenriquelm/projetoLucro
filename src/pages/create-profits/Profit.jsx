import {
	FaInfoCircle,
	FaArrowAltCircleUp,
	FaTrashAlt,
	FaSave
} from "react-icons/fa";

export function Profit() {
	return (
		<div className="w-50 bg-zinc-200 h-60 rounded-3xl shadow-shape">
			<div className="bg-zinc-600 w-[4.5rem] text-zinc-200 rounded-br-3xl rounded-tl-2xl px-2 py-1">
				<span>2024/8</span>
			</div>

			<div className="grid grid-cols-4 px-16">
				<div className="flex flex-col">
					<div>
						<label htmlFor="custo">Custo</label>
						<input
							type="number"
							id="custo"
							placeholder="Escreva o custo de produção"
							className="w-32 no-"
						/>
					</div>

					<div>
						<label htmlFor="gain">Ganho</label>
						<input type="number" id="gain" placeholder="Escreva o seu ganho" />
					</div>

					<div>
						<h3>Lucro esperado</h3>
						<p className="text-xs">1000 - 880</p>
						<p>R$ 120</p>
					</div>
				</div>

				<div>
					<div>
						<select className="text-sm">
							<option>Diário</option>
							<option>Mensal</option>
						</select>
					</div>
					<div>
						<input type="number" placeholder="Dias úteis" />
						<FaInfoCircle size={14} />
					</div>

					<div>
						<label>Lucro real</label>
						<div>
							<input type="number" placeholder="Escreva seu lucro real" />
							<FaInfoCircle />
						</div>
					</div>
				</div>

				{/* <div className="w-px h-36 bg-zinc-300" /> */}

				<div>
					<div>
						<h3>Margem de Lucro</h3>
						<select className="text-sm">
							<option>Comércio</option>
							<option>Indústria</option>
						</select>
					</div>
					<div>
						<p className="text-xs">(120/100) * 100</p>
						<p className="text-xs">0,12 * 100</p>
						<div className="flex">
							<p className="text-xs">12%</p>
							<FaInfoCircle/>
						</div>
					</div>

					<div className="flex justify-center items-center h-10 w-36 bg-red-600 text-red-950 rounded-lg cursor-pointer">
						<button>Excluir</button>
						<FaTrashAlt size={14} />
					</div>
				</div>

				<div>
					<div>
						<h3>Esperado x Real</h3>
						<p className="text-xs">(140 * 100) / 120</p>
						<p className="text-xs">14000 / 120</p>
						<div className="flex">
							<p className="text-sm">116,68%</p>
							<FaArrowAltCircleUp />
						</div>
						<p className="text-xs">116,68 / 100</p>
						<div className="flex">
							<p className="text-sm">1,1668%</p>
							<FaArrowAltCircleUp />
						</div> 
						<p className="text-xs">140 - 120</p>
						<div className="flex">
							<p className="text-sm">R$ 40</p>
							<FaArrowAltCircleUp />
						</div>
						<div className="flex justify-center items-center h-10 w-36 bg-lime-400 text-lime-950 rounded-lg cursor-pointer">
							<button>Salvar</button>
							<FaSave size={16} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
