import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import propTypes from "prop-types";
import { useState } from "react";
import axios from "../../../lib/axios";
import { toast } from "react-toastify";
import validator from "validator";

export function Register({ closeRegisterModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function createUser(e) {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      toast.error("Insira um e-mail válido");
      return;
    }

    if (password.length < 8) {
      toast.error("Insira uma senha com 8+ caracteres");
      return;
    }

    if (!name) {
      toast.error("Insira o seu nome");
      return;
    }

    try {
      await axios.post("/register", {
        email,
        password,
        name,
      });
    } catch (e) {
      e.response.data.errors.map((erro) => toast.error(erro));
      return;
    }

    closeRegisterModal();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-5 flex flex-col items-center justify-center text-white">
          <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <h2 className="text-4xl font-semibold">Registro</h2>
            </div>
            <button onClick={() => closeRegisterModal()}>
              <FaX />
            </button>
          </div>
          <form onSubmit={createUser} className="flex flex-col w-[30rem] gap-5">
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="email">E-mail</label>
                <div className="flex items-center bg-neutral-800 px-2 rounded">
                  <FaEnvelope />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-inherit  outline-none px-2 w-full h-8"
                    placeholder="seuemail@gmail.com"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="senha">Senha</label>
                <div className="flex items-center bg-neutral-800 px-2 rounded">
                  <FaLock />
                  <input
                    type="text"
                    name="senha"
                    id="senha"
                    className="bg-inherit  outline-none px-2 w-full h-8"
                    placeholder="Sua senha"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="nome">Nome</label>
                <div className="flex items-center bg-neutral-800 px-2 rounded">
                  <FaUserAlt />
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    className="bg-inherit  outline-none px-2 w-full h-8"
                    placeholder="Seu nome"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <button className="h-10 w-44 gap-2 bg-lime-400 text-lime-950 rounded-lg cursor-pointer">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  closeRegisterModal: propTypes.func.isRequired,
};
