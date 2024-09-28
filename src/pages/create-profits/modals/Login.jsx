import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import propTypes from "prop-types";
import validator from "validator";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "../../../lib/axios";

export function Login({ closeLoginModal, setIsLogged }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(e) {
    e.preventDefault()

    if(!validator.isEmail(email)) {
      toast.error("Insira um e-mail válido")
      return
    }

    if(password.length < 8) {
      toast.error("Insira uma senha com 8+ caracteres")
      return
    }

    try {
      await axios.post('/login', {
        email,
        password
      } , {withCredentials: true})
      setIsLogged(true)
    } catch (e) {
        e.response.data.errors.map(erro => toast.error(erro))
        return 
    }
   
    closeLoginModal()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-5 flex flex-col items-center justify-center text-white">
          <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <h2 className="text-4xl font-semibold">Login</h2>
            </div>
            <button>
              <FaX onClick={() => closeLoginModal()} />
            </button>
          </div>
          <form onSubmit={loginUser} className="flex flex-col w-[30rem] gap-5">
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
                    onChange={event => {setEmail(event.target.value)}}
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
                    onChange={event => {setPassword(event.target.value)}}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <button className="h-10 w-44 gap-2 bg-lime-400 text-lime-950 rounded-lg cursor-pointer">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  closeLoginModal: propTypes.func.isRequired,
  setIsLogged: propTypes.func.isRequired
};
