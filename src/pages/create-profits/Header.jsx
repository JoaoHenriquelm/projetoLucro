import { FaUserPlus, FaUser } from "react-icons/fa";

export function Header() {
	return (
		<header className="flex justify-between items-center w-full h-24 bg-zinc-200 rounded-b-xl px-8">
			<div>
				<h1 className="text-4xl">Gerencie seu lucro</h1>
			</div>

			<div className="flex gap-3">
				<div className="flex gap-2 justify-center items-center h-10 w-36 bg-neutral-600 text-zinc-200 rounded-lg cursor-pointer">
					<button>Registro</button>
					<FaUserPlus size={16}/>
				</div>

				<div className="flex gap-2 justify-center items-center h-10 w-36 bg-lime-400 text-lime-950 rounded-lg cursor-pointer">
					<button>Login/Entrar</button>
					<FaUser size={14} />
				</div>
			</div>
		</header>
	);
}
