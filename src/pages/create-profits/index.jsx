import { Footer } from "./Footer";
import { Header } from "./Header";
import { FilterAndCreate } from "./Filter-and-create";
import { Profit } from "./Profit";
import { useState } from "react";
import { Register } from "./modals/Register";
import { Login } from "./modals/Login";

export function CreateProfits() {
	const [IsRegisterModal, setIsRegisterModal] = useState(false);
	function openRegisterModal() {
		setIsRegisterModal(true);
	}
	function closeRegisterModal() {
		setIsRegisterModal(false);
	}

	const [IsLoginModal, setIsLoginModal] = useState(false);
	function openLoginModal() {
		setIsLoginModal(true);
	}
	function closeLoginModal() {
		setIsLoginModal(false);
	}

	const [isProfits, setIsProfits] = useState([]);
	function createProfit() {
		let newState = [...isProfits];
		newState.push({});
		setIsProfits(newState);
	}


	return (
		<div className="bg-neutral-800 min-h-screen">
			<Header
				openRegisterModal={openRegisterModal}
				openLoginModal={openLoginModal}
			/>
			<FilterAndCreate createProfit={createProfit} />
			<main className="flex flex-col justify-center items-center">
				{isProfits.map(({...profit}, index) => (
					<div key={index}>
						<Profit {...profit} index={index} setIsProfits={setIsProfits}/>
					</div>
				))}
			</main>
			<Footer />

			{IsRegisterModal && <Register closeRegisterModal={closeRegisterModal} />}
			{IsLoginModal && <Login closeLoginModal={closeLoginModal} />}
		</div>
	);
}
