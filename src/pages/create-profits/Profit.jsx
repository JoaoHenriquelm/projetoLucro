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

			<div className="grid grid-cols-5 px-16">
				<div className="flex flex-col">
					<div>
						<label htmlFor="custo" className="text-sm">Custo</label>
						<input
							type="number"
							id="custo"
							placeholder="Escreva o custo de produção"
						/>
					</div>

					<div>
						<label htmlFor="gain" className="text-sm">Ganho</label>
						<input type="number" id="gain" placeholder="Escreva o seu ganho" />
					</div>

					<div>
						<h3 className="text-sm">Lucro esperado</h3>
						<span>1000 - 880</span>
						<span>R$ 120</span>
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
						<FaInfoCircle size={8} />
					</div>

					<div>
						<label className="text-sm">Lucro real</label>
						<div>
							<input type="number" placeholder="Escreva seu lucro real" />
							<FaInfoCircle />
						</div>
					</div>
				</div>

				<div className="w-px h-36 bg-zinc-300" />

				<div>
					<div>
						<h3 className="text-sm">Margem de Lucro</h3>
						<select className="text-sm">
							<option>Comércio</option>
							<option>Indústria</option>
						</select>
					</div>
					<div>
						<span>(120/100) * 100</span>
						<span>0,12 * 100</span>
						<span>12%</span>
					</div>

					<div className="flex justify-center items-center h-10 w-36 bg-red-600 text-red-950 rounded-lg cursor-pointer">
						<button>Excluir</button>
						<FaTrashAlt size={16} />
					</div>
				</div>

				<div>
					<div>
						<h3>Esperado x Real</h3>
						<span>(140 * 100) / 120</span>
						<span>14000 / 120</span>
						<div>
							<span>116,68%</span>
							<FaArrowAltCircleUp />
						</div>
						<span>116,68 / 100</span>
						<div>
							<span>1,1668%</span>
							<FaArrowAltCircleUp />
						</div>
						<span>140 - 120</span>
						<div>
							<span>R$ 40</span>
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
