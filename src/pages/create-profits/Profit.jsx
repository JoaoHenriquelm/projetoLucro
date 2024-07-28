import {
  FaInfoCircle,
  FaArrowAltCircleUp,
  FaTrashAlt,
  FaSave,
} from "react-icons/fa";

export function Profit() {
  return (
    <div className="w-[50rem] bg-zinc-200 h-64 rounded-3xl shadow-shape">
      <div className="bg-zinc-600 max-w-[4.5rem] text-zinc-200 rounded-br-3xl rounded-tl-2xl px-2 py-1">
        <span>2024/8</span>
      </div>

      <div className="flex flex-flex-wrap justify-center px-16">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="custo">
                <p>Custo</p>
              </label>
              <input
                type="number"
                id="custo"
                placeholder="Custo de produção"
                className="w-40 px-1 rounded no-spinner bg-zinc-100 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gain">
                <p>Ganho</p>
              </label>
              <input
                type="number"
                id="gain"
                className="w-40 px-1 rounded no-spinner bg-zinc-100 focus:bg-white focus:outline-none"
                placeholder="Ganho"
              />
            </div>
            <div>
              <h3>Lucro esperado</h3>
              <p className="text-xs text-gray-lightin">1000 - 880</p>
              <p className="text-green-900">R$ 120</p>
            </div>
          </div>

          <div className="flex flex-col justify-center relative top-4 gap-2">
            <div className="flex flex-col gap-2">
              <div>
                <select className="text-sm w-40 px-1 rounded bg-zinc-100 focus:bg-white h-6 ">
                  <option>Diário</option>
                  <option>Mensal</option>
                </select>
              </div>

              <div className="flex items-center px-1 rounded bg-zinc-100 focus:bg-white w-40 ">
                <input
                  type="number"
                  className="no-spinner w-full bg-zinc-100 focus:bg-white focus:outline-none"
                  placeholder="Dias úteis"
                />
                <FaInfoCircle size={12} className="cursor-pointer"/>
              </div>
            </div>
            <div>
              <label>Lucro real</label>
              <div className="flex items-center px-1 rounded bg-zinc-100 focus:bg-white w-40">
                <input
                  type="number"
                  className="no-spinner w-full bg-zinc-100 focus:bg-white focus:outline-none"
                  placeholder="Lucro real"
                />
                <FaInfoCircle size={12} className="cursor-pointer"/>
              </div>
            </div>
          </div>
        </div>

        <div className="relative left-6">
          <div className="w-px h-36 bg-zinc-300" />
        </div>

        <div className="flex gap-4 relative left-10">
          <div>
            <h3 className="mb-1">Margem de Lucro</h3>
            <select className="text-sm w-40 px-1 py-1 mb-2 rounded bg-zinc-100 focus:bg-white">
              <option>Comércio</option>
              <option>Indústria</option>
            </select>
            <p className="text-xs text-gray-lightin">(120/100) * 100</p>
            <p className="text-xs text-gray-lightin">0,12 * 100</p>
            <div className="flex items-center gap-1">
              <p className="text-red-600">12%</p>
              <FaInfoCircle size={12} className="cursor-pointer"/>
            </div>
          </div>
          <div>
            <div>
              <h3 className="mb-1">Esperado x Real</h3>
              <p className="text-xs text-gray-lightin">(140 * 100) / 120</p>
              <p className="text-xs text-gray-lightin">14000 / 120</p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-green-900">116,68%</p>
                <FaArrowAltCircleUp size={12}/>
              </div>
              <p className="text-xs text-gray-lightin">116,68 / 100</p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-green-900">1,1668%</p>
                <FaArrowAltCircleUp size={12}/>
              </div>
              <p className="text-xs text-gray-lightin">140 - 120</p>
              <div className="flex items-center gap-1 ">
                <p className="text-sm text-green-900">R$ 40</p>
                <FaArrowAltCircleUp size={12}/>
              </div>
            </div>
          </div>

        </div>
      </div>
	  <div className="flex gap-4 justify-end relative right-8 bottom-2">
            <div className="flex justify-center items-center h-10 w-36 bg-red-600 text-red-950 rounded-lg cursor-pointer gap-1">
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
