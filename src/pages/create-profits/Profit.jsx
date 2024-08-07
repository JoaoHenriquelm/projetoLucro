import { useState } from "react";
import {
	FaInfoCircle,
	FaArrowAltCircleUp,
	FaTrashAlt,
	FaSave,
	FaMinusCircle,
	FaArrowAltCircleDown
} from "react-icons/fa";

export function Profit() {
	const [cust, setCust] = useState("");
	const [gain, setGain] = useState("");
	const [realProfit, setRealProfit] = useState("");
	const [realGain, setRealGain] = useState("");
	const [typeDiary, setTypeDiary] = useState(false);
	const [workedDays, setWorkedDays] = useState("");
	const [typeMarket, setTypeMarket] = useState("Comércio");

	const [infoWorkedDays, setInfoWorkedDays] = useState(false);
	const [infoRealProfit, setInfoRealProfit] = useState(false);
	const [infoGainProfit, setInfoGainProfit] = useState(false);
	const [infoMarginProfit, setInfoMarginProfit] = useState(false);

	function profitCalculate(cust, gain, typeDiary, workedDays) {
		let profit;
		if (!typeDiary) {
			profit = Number(gain) - Number(cust);
			return `${profit}`;
		} else {
			profit = Number(workedDays) * Number(gain) - Number(cust);
			return `${profit}`;
		}
	}

	function marginProfit(cust, typeReal) {
		const profit = profitCalculate(cust, gain, typeDiary, workedDays);
		if (!typeDiary) {
			return (Number(realProfit) && Number(realGain)) && typeReal
				? `${((Number(realProfit) / Number(realGain)) * 100).toFixed(2)}`
				: `${((Number(profit) / Number(gain)) * 100).toFixed(2)}`;
		} else {
			return (Number(realProfit) && Number(realGain)) && typeReal
				? `${((Number(realProfit) / Number(gain * workedDays)) * 100).toFixed(
						2
				  )}`
				: `${((Number(profit) / Number(gain * workedDays)) * 100).toFixed(2)}`;
		}
	}

	function colorMarginProfit(marginProfit) {
		const margin = Number(marginProfit);
		const cursor = "cursor-pointer";
		if (typeMarket === "Comércio") {
			if (margin < 15) {
				return `text-red-600 ${cursor}`;
			} else {
				return `text-green-900 ${cursor}`;
			}
		} else if (typeMarket === "Indústria") {
			if (margin < 8) {
				return `text-red-600 ${cursor}`;
			} else {
				return `text-green-900 ${cursor}`;
			}
		} else if (typeMarket === "Serviço") {
			if (margin < 20) {
				return `text-red-600 ${cursor}`;
			} else {
				return `text-green-900 ${cursor}`;
			}
		}
	}

	function infoMarginMessage(marginProfit) {
		const margin = Number(marginProfit);
		const badMessage = `Sua margem de lucro é de ${margin}%, tente diminuir seu custo ou aumentar seu ganho nesse investimento para ter uma margem ideal para o ${typeMarket.toLowerCase()} que é de:`;
		const goodMessage = `Sua margem de lucro é de ${margin}%, é uma margem ideal para o ${typeMarket.toLowerCase()}`;
		if (typeMarket === "Comércio") {
			if (margin < 15) {
				return badMessage + ` 15% a 20%`;
			} else {
				return goodMessage;
			}
		} else if (typeMarket === "Indústria") {
			if (margin < 8) {
				return badMessage + ` 8% a 12%`;
			} else {
				return goodMessage;
			}
		} else if (typeMarket === "Serviço") {
			if (margin < 20) {
				return badMessage + ` 20% a 30%`;
			} else {
				return goodMessage;
			}
		}
	}

	function marginAndDifferProfitProps(value, option) {
		if (value === 0) {
			switch (option) {
				case "color":
					return `text-yellow-700`;
				case "symbol":
					return <FaMinusCircle size={12} />;
			}
		} else if (value > 0) {
			switch (option) {
				case "color":
					return `text-green-900`;
				case "symbol":
					return <FaArrowAltCircleUp size={12} />;
			}
		} else {
			switch (option) {
				case "color":
					return `text-red-600`;
				case "symbol":
					return <FaArrowAltCircleDown size={12} />;
			}
		}
	}

	function percentageProps(value, option) {
		if (value > 100) {
			switch (option) {
				case "color":
					return `text-green-900`;
				case "symbol":
					return <FaArrowAltCircleUp size={12} />;
			}
		} else if (value === 100) {
			switch (option) {
				case "color":
					return `text-yellow-700`;
				case "symbol":
					return <FaMinusCircle size={12} />;
			}
		} else {
			switch (option) {
				case "color":
					return `text-red-600`;
				case "symbol":
					return <FaArrowAltCircleDown size={12} />;
			}
		}
	}

	return (
		<div className="w-[50rem] bg-zinc-200 h-[17rem] rounded-3xl shadow-shape last:mb-16">
			<div className="bg-zinc-600 max-w-[4.5rem] text-zinc-200 rounded-br-3xl rounded-tl-2xl px-2 py-1">
				<span>2024/8</span>
			</div>

			<div className="flex flex-flex-wrap justify-center px-16">
				<div className="flex gap-4 mb-3">
					<div className="flex flex-col gap-2">
						<div>
							<label htmlFor="custo">
								<p>Custo total</p>
							</label>
							<input
								type="number"
								id="custo"
								placeholder="Custo de produção"
								className="w-40 px-1 rounded no-spinner bg-zinc-100 focus:bg-white focus:outline-none"
								value={cust}
								onChange={(e) => setCust(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="gain">
								<p>Receita</p>
							</label>
							<input
								type="number"
								id="gain"
								className="w-40 px-1 rounded no-spinner bg-zinc-100 focus:bg-white focus:outline-none"
								placeholder="Receita esperada"
								value={gain}
								onChange={(e) => setGain(e.target.value)}
							/>
						</div>
						<div>
							<select
								className="text-sm w-40 px-1 rounded bg-zinc-100 focus:bg-white h-6"
								onChange={(e) => {
									e.target.value === "Diário"
										? setTypeDiary(true)
										: setTypeDiary(false);
								}}
							>
								<option>Mensal</option>
								<option>Diário</option>
							</select>
						</div>
						<div className="relative">
							<div
								className={
									infoWorkedDays
										? `bg-zinc-700 text-zinc-200 rounded-lg z-10 px-2 py-2 h-auto w-80 absolute bottom-8 left-2 triangle`
										: `hidden`
								}
							>
								<p>Digite quantos dias essa mesma receita esperada é gerada</p>
							</div>
							<div
								className={
									typeDiary
										? `flex items-center rounded w-40 relative`
										: `hidden`
								}
							>
								<input
									type="number"
									className="no-spinner w-full px-1 rounded bg-zinc-100 focus:bg-white focus:outline-none"
									placeholder="Dias úteis"
									value={workedDays}
									onChange={(e) => setWorkedDays(e.target.value)}
								/>
								<FaInfoCircle
									size={12}
									className="cursor-pointer absolute right-1"
									onMouseEnter={() => setInfoWorkedDays(true)}
									onMouseLeave={() => setInfoWorkedDays(false)}
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-col relative">
						<div className="flex flex-col gap-2">
							<div>
								<div
									className={
										infoGainProfit
											? `bg-zinc-700 text-zinc-200 rounded-lg z-10 px-2 py-2 h-auto w-80 absolute bottom-40 left-2 triangle`
											: `hidden`
									}
								>
									<p>
										O lucro real e a receita real é opcional, mas desbloqueará a
										estatística de margem de lucro sendo a real e a comparação
										com o lucro esperado. Em caso da ausência da receita ou
										lucro real, as informações de previsão serão utilizadas.{" "}
									</p>
								</div>
								<label>Receita real</label>
								<div className="flex items-center rounded w-40">
									<input
										type="number"
										className="no-spinner w-full px-1 rounded bg-zinc-100 focus:bg-white focus:outline-none"
										placeholder="Receita real"
										value={realGain}
										onChange={(e) => setRealGain(e.target.value)}
									/>
									<FaInfoCircle
										size={12}
										className="cursor-pointer absolute right-1"
										onMouseEnter={() => setInfoGainProfit(true)}
										onMouseLeave={() => setInfoGainProfit(false)}
									/>
								</div>
							</div>
							<div>
								<div
									className={
										infoRealProfit
											? `bg-zinc-700 text-zinc-200 rounded-lg z-10 px-2 py-2 h-auto w-80 absolute bottom-[6.5rem] left-2 triangle`
											: `hidden`
									}
								>
									<p>
										O lucro real e a receita real é opcional, mas desbloqueará a
										estatística de margem de lucro sendo a real e a comparação
										com o lucro esperado. Em caso da ausência da receita ou
										lucro real, as informações de previsão serão utilizadas.{" "}
									</p>
								</div>
								<label>Lucro real</label>
								<div className="flex items-center rounded w-40">
									<input
										type="number"
										className="no-spinner w-full px-1 rounded bg-zinc-100 focus:bg-white focus:outline-none"
										placeholder="Lucro real"
										value={realProfit}
										onChange={(e) => setRealProfit(e.target.value)}
									/>
									<FaInfoCircle
										size={12}
										className="cursor-pointer absolute right-1"
										onMouseEnter={() => setInfoRealProfit(true)}
										onMouseLeave={() => setInfoRealProfit(false)}
									/>
								</div>
							</div>
							<div>
								<h3>Lucro esperado</h3>
								<p className="text-xs text-gray-lightin">
									{typeDiary
										? `${workedDays} * ${gain} - ${cust} `
										: `${gain} - ${cust}`}
								</p>
								<p className="text-green-900">
									R$ {profitCalculate(cust, gain, typeDiary, workedDays)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="relative left-6">
					<div className="w-px h-36 bg-zinc-300" />
				</div>

				<div className="flex gap-4 relative left-11">
					<div>
						<h3 className="mb-1">Margem de Lucro</h3>
						{((realGain && realProfit) || (gain && cust)) &&
						gain !== "0" &&
						realGain !== "0" ? (
							<div>
								{" "}
								<select
									className="text-sm w-40 px-1 py-1 mb-2 rounded bg-zinc-100 focus:bg-white"
									onChange={(e) => {
										if (e.target.value === "Comércio") {
											setTypeMarket("Comércio");
										} else if (e.target.value === "Indústria") {
											setTypeMarket("Indústria");
										} else if (e.target.value === "Serviço") {
											setTypeMarket("Serviço");
										}
									}}
									value={typeMarket}
								>
									<option>Comércio</option>
									<option>Indústria</option>
									<option>Serviço</option>
								</select>
								<p className="text-xs text-gray-lightin">
									{realProfit && realGain
										? `(${realProfit} / ${realGain}) * 100`
										: `(${profitCalculate(
												cust,
												gain,
												typeDiary,
												workedDays
										  )} / ${Number(gain) * (Number(workedDays) || 1)}) * 100`}
								</p>
								<p className="text-xs text-gray-lightin">
									{realProfit && realGain
										? `${(realProfit / realGain).toFixed(4)} * 100`
										: `${(
												profitCalculate(cust, gain, typeDiary, workedDays) /
												(gain * (Number(workedDays) || 1))
										  ).toFixed(4)} * 100`}
								</p>
								<div className="flex items-center justify-between gap-1">
									<p
										className={colorMarginProfit(marginProfit(cust, true))}
										onMouseEnter={() => setInfoMarginProfit(true)}
										onMouseLeave={() => setInfoMarginProfit(false)}
									>
										{marginProfit(cust, true)}%
									</p>
									<div
										className={
											infoMarginProfit
												? `bg-zinc-700 text-zinc-200 rounded-lg z-10 px-2 py-2 h-auto w-72 absolute bottom-28 right-36 triangle`
												: `hidden`
										}
									>
										<p>{infoMarginMessage(marginProfit(cust, true))}</p>
									</div>
								</div>{" "}
							</div>
						) : (
							<div className="w-40">
								<p className="text-sm text-zinc-800">
									Insira os dados de previsão para obter a margem de lucro ou se
									já tiver os dados reais obtenha a margem real
								</p>
							</div>
						)}
					</div>
					<div>
						<div className="w-40">
							<h3>Esperado x Real</h3>
							{realProfit &&
							realGain &&
							gain &&
							cust &&
							gain !== "0" &&
							realGain !== "0" &&
							(marginProfit(cust, true)) !== "0.00" && (marginProfit(cust, false)) !== "0.00" ? (
								<div>
									{" "}
									<p className="text-xs text-zinc-800">Margem de lucro:</p>
									<p className="text-xs text-gray-lightin flex items-center gap-1">
										{marginProfit(cust, true)} -{" "}
										{typeDiary
											? (
													(profitCalculate(cust, gain, typeDiary, workedDays) /
														Number(gain * workedDays)) *
													100
											  ).toFixed(2)
											: (
													(Number(
														profitCalculate(cust, gain, typeDiary, workedDays)
													) /
														Number(gain)) *
													100
											  ).toFixed(2)}
									</p>
									<div className="flex items-center gap-1">
										<p
											className={`text-sm ${marginAndDifferProfitProps(
												Number(
													marginProfit(cust, true) - marginProfit(cust, false)
												),
												"color"
											)}`}
										>
											{Number(
												marginProfit(cust, true) - marginProfit(cust, false)
											).toFixed(2)}
											%
										</p>
										{marginAndDifferProfitProps(
											Number(
												marginProfit(cust, true) - marginProfit(cust, false)
											),
											"symbol"
										)}
									</div>
									<p className="text-xs text-zinc-800">
										Porcentagem ao esperado:
									</p>
									<p className="text-xs text-gray-lightin">
										(
										{`${realProfit} * 100 / ${
											typeDiary
												? Number(workedDays * gain) - Number(cust)
												: Number(gain - cust)
										}`}
										)
									</p>
									<div className="flex items-center gap-1">
										<p
											className={`text-sm ${percentageProps(
												(Number(realProfit) * 100) /
													(typeDiary
														? Number(workedDays * gain) - Number(cust)
														: Number(gain - cust)),
												"color"
											)}`}
										>
											{(
												(Number(realProfit) * 100) /
												(typeDiary
													? Number(workedDays * gain) - Number(cust)
													: Number(gain - cust))
											).toFixed(2)}
											%{" "}
										</p>
										{percentageProps(
											(realProfit * 100) /
												(typeDiary
													? Number(workedDays * gain) - Number(cust)
													: Number(gain - cust)),
											"symbol"
										)}
									</div>
									<p className="text-xs text-zinc-800">
										Diferença entre os lucros:
									</p>
									<p className="text-xs text-gray-lightin">
										{`${realProfit}`} -{" "}
										{typeDiary
											? Number(workedDays * gain) - Number(cust)
											: Number(gain - cust)}
									</p>
									<div className="flex items-center gap-1 ">
										<p
											className={`text-sm ${marginAndDifferProfitProps(
												realProfit -
													(typeDiary
														? Number(workedDays * gain) - Number(cust)
														: Number(gain - cust)),
												"color"
											)}`}
										>
											R${" "}
											{(
												realProfit -
												(typeDiary
													? Number(workedDays * gain) - Number(cust)
													: Number(gain - cust))
											).toFixed(2)}
										</p>
										{marginAndDifferProfitProps(
											realProfit -
												(typeDiary
													? Number(workedDays * gain) - Number(cust)
													: Number(gain - cust)),
											"symbol"
										)}
									</div>{" "}
								</div>
							) : (
								<p className="text-sm text-zinc-800">
									Para ter acesso a essas estastísticas escreva os dados reais e
									os de previsão.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-4 justify-end relative right-8">
				<div className="flex justify-center items-center h-10 w-36 bg-red-600 text-red-100 rounded-lg cursor-pointer gap-1">
					<button>Excluir</button>
					<FaTrashAlt size={14} />
				</div>
				<div className="flex justify-center items-center h-10 w-36 bg-lime-400 text-lime-950 rounded-lg cursor-pointer gap-1">
					<button>Salvar</button>
					<FaSave size={16} />
				</div>
			</div>
		</div>
	);
}
