import { Footer } from "./Footer";
import { Header } from "./Header";
import { FilterAndCreate } from "./Filter-and-create";
import { Profit } from "./Profit";

export function CreateProfits() {
	return (
		<div className="bg-neutral-800 h-screen">
			<Header />
			<FilterAndCreate />
			<main className="flex flex-col justify-center items-center gap-6">
				<Profit />
			</main>
			<Footer />
		</div>
	);
}
