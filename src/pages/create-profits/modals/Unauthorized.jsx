import { FaUserAltSlash } from "react-icons/fa";
import propTypes from "prop-types";

export function Unauthorized({ closeUnauthorizedModal }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-5 flex flex-col items-center justify-center text-white">
          <FaUserAltSlash size={90} />
          <p className="text-2xl px-5">
            Para realizar essa ação é necessário fazer login, realize o login ou
            se registre se ainda não tiver conta.
          </p>
          <div className="flex justify-center items-center h-10 w-44 gap-2 bg-lime-400 text-lime-950 rounded-lg cursor-pointer" onClick={() => closeUnauthorizedModal()}>
            <button>OK!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Unauthorized.propTypes = {
  closeUnauthorizedModal: propTypes.func.isRequired,
};