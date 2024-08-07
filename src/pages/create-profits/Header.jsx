import { FaUserPlus, FaUser } from "react-icons/fa";
import propTypes from "prop-types"

export function Header({ openRegisterModal, openLoginModal }) {
	return (
		<header className="flex justify-between items-center w-full h-24 bg-zinc-200 rounded-b-xl px-8">
			<div>
				<h1 className="text-4xl text-zinc-800">Gerencie seu lucro</h1>
			</div>

			<div className="flex gap-3">
				<button
					className="flex gap-2 justify-center items-center h-10 w-36 bg-neutral-600 text-zinc-200 rounded-lg cursor-pointer"
					onClick={() => openRegisterModal()}
				>
					Registro
					<FaUserPlus size={16} />
				</button>

				<button className="flex gap-2 justify-center items-center h-10 w-36 bg-lime-400 text-lime-950 rounded-lg cursor-pointer" onClick={() => openLoginModal()}>
					Login/Entrar 
					<FaUser size={14} />
				</button>
			</div>
		</header>
	);
}

Header.propTypes = {
	openRegisterModal: propTypes.func.isRequired,
	openLoginModal: propTypes.func.isRequired
}