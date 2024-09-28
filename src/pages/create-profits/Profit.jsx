import { useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaArrowAltCircleUp,
  FaTrashAlt,
  FaSave,
  FaMinusCircle,
  FaArrowAltCircleDown,
} from "react-icons/fa";
import propTypes from "prop-types";
import { getDate } from "../../lib/getDate";

export function Profit({properties, index, deleteProfit, updateOrCreateProfit}) {
  const [id, setId] = useState(properties.id)
  const [date, setDate] = useState("")
  const [cust, setCust] = useState("");
  const [gain, setGain] = useState("");
  const [totalGain, setTotalGain] = useState(0);
  const [profit, setProfit] = useState(0);
  const [realProfit, setRealProfit] = useState("");
  const [realGain, setRealGain] = useState("");
  const [typeDiary, setTypeDiary] = useState(false);
  const [workedDays, setWorkedDays] = useState("");
  const [typeMarket, setTypeMarket] = useState("Comércio");
  const [expectedMargin, setExpectedMargin] = useState(0);
  const [realMargin, setRealMargin] = useState(0);

  const [infoWorkedDays, setInfoWorkedDays] = useState(false);
  const [infoRealProfit, setInfoRealProfit] = useState(false);
  const [infoGainProfit, setInfoGainProfit] = useState(false);
  const [infoMarginProfit, setInfoMarginProfit] = useState(false);

  useEffect(() => {
    setDate(properties.created_at?  (`${properties.created_at.slice(0, 4)}/${properties.created_at.slice(5, 7)}` ) : (getDate()))
    setCust(properties.cust || "")
    setGain(properties.gain || "")
    setRealGain(properties.real_gain || "")
    setRealProfit(properties.real_profit || "")
    setTypeDiary(properties.type_diary || false)
    setWorkedDays(properties.worked_days || "")
    setTypeMarket(properties.type_market || "Comércio")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeDiary) {
      setTotalGain(Number(workedDays) * Number(gain));
    } else {
      setTotalGain(Number(gain));
    }
  }, [typeDiary, workedDays, gain]);

  useEffect(() => {
    setProfit(Number(totalGain) - Number(cust));
  }, [cust, totalGain]);

  useEffect(() => {
    setExpectedMargin(((profit / totalGain) * 100).toFixed(2));
  }, [profit, totalGain]);

  useEffect(() => {
    setRealMargin(((Number(realProfit) / Number(realGain)) * 100).toFixed(2));
  }, [realProfit, realGain]);


  function colorMarginProfit() {
    const margin = realProfit && realGain ? realMargin : expectedMargin;
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

  function infoMarginMessage() {
    const margin = realProfit && realGain ? realMargin : expectedMargin;
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

  function percentageProps(value, auxValue, option) {
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
    } else if (auxValue < 0) {
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

  let marginDiffer = Number(realMargin - expectedMargin).toFixed(2);
  let percentageCalculate = (Number(realProfit) * 100) / profit;
  let profitDiffer = Number(realProfit - profit);

  return (
    <div className="w-[50rem] bg-zinc-200 h-[17rem] rounded-3xl shadow-shape last:mb-16">
      <div className="bg-zinc-600 max-w-[4.8rem] text-zinc-200 rounded-br-3xl rounded-tl-2xl px-1 py-1">
        <span>{date}</span>
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
                <p>Receita esperada</p>
              </label>
              <input
                type="number"
                id="gain"
                className={`w-40 px-1 rounded no-spinner bg-zinc-100 focus:bg-white focus:outline-none ${
                  Number(gain) < 0 || gain === "0"
                    ? "outline outline-red-600"
                    : ""
                }`}
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
                <option selected={!typeDiary}>Mensal</option>
                <option selected={typeDiary}>Diário</option>
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
                <label htmlFor="realGain">Receita real</label>
                <div className="flex items-center rounded w-40">
                  <input
                    type="number"
                    className={`no-spinner w-full px-1 rounded bg-zinc-100 focus:bg-white focus:outline-none ${
                      Number(realGain) < 0 || realGain === "0"
                        ? "outline outline-red-600"
                        : ""
                    }`}
                    placeholder="Receita real"
                    id="realGain"
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
                    className={`no-spinner w-full px-1 rounded bg-zinc-100 focus:bg-white focus:outline-none ${
                      Number(realProfit) < 0 || realProfit === "0"
                        ? "outline outline-red-600"
                        : ""
                    }`}
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
                    ? `${Number(workedDays).toFixed(2)} * ${Number(
                        gain
                      ).toFixed(2)} - ${Number(cust).toFixed(2)} `
                    : `${Number(gain).toFixed(2)} - ${Number(cust).toFixed(2)}`}
                </p>
                <p
                  className={`text-sm ${marginAndDifferProfitProps(
                    profit,
                    "color"
                  )}`}
                >
                  R$ {profit.toFixed(2)}
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
            {((realGain && realProfit) || (gain && cust)) && ((Number(realProfit) !== 0 && Number(realGain) !== 0) || (profit !== 0 && Number(gain) !== 0)) && (typeDiary === false || (typeDiary && Number(workedDays) >= 1))
            ? (
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
                    : `(${profit} / ${totalGain}) * 100`}
                </p>
                <p className="text-xs text-gray-lightin">
                  {realProfit && realGain
                    ? `${(realProfit / realGain).toFixed(4)} * 100`
                    : `${(profit / totalGain).toFixed(4)} * 100`}
                </p>
                <div className="flex items-center justify-between gap-1">
                  <p
                    className={colorMarginProfit()}
                    onMouseEnter={() => setInfoMarginProfit(true)}
                    onMouseLeave={() => setInfoMarginProfit(false)}
                  >
                    {realProfit && realGain ? realMargin : expectedMargin}%
                  </p>
                  <div
                    className={
                      infoMarginProfit
                        ? `bg-zinc-700 text-zinc-200 rounded-lg z-10 px-2 py-2 h-auto w-72 absolute bottom-28 right-36 triangle`
                        : `hidden`
                    }
                  >
                    <p>{infoMarginMessage()}</p>
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
              {((realGain && realProfit) && (gain && cust)) && (Number(realProfit) !== 0 && Number(realGain) !== 0 && profit !== 0 && Number(gain) !== 0) && (typeDiary === false || (typeDiary && Number(workedDays) >= 1))? (
                <div>
                  {" "}
                  <p className="text-xs text-zinc-800">Margem de lucro:</p>
                  <p className="text-xs text-gray-lightin flex items-center gap-1">
                    {realMargin} - {expectedMargin}
                  </p>
                  <div className="flex items-center gap-1">
                    <p
                      className={`text-sm ${marginAndDifferProfitProps(
                        Number(marginDiffer),
                        "color"
                      )}`}
                    >
                      {marginDiffer}%
                    </p>
                    {marginAndDifferProfitProps(Number(marginDiffer), "symbol")}
                  </div>
                  <p className="text-xs text-zinc-800">
                    Porcentagem ao esperado:
                  </p>
                  <p className="text-xs text-gray-lightin">
                    ({`${realProfit} * 100 / ${profit}`})
                  </p>
                  <div className="flex items-center gap-1">
                    <p
                      className={`text-sm ${percentageProps(
                        percentageCalculate,
                        profit,
                        "color"
                      )}`}
                    >
                      {percentageCalculate.toFixed(2)}%{" "}
                    </p>
                    {percentageProps(percentageCalculate, profit, "symbol")}
                  </div>
                  <p className="text-xs text-zinc-800">
                    Diferença entre os lucros:
                  </p>
                  <p className="text-xs text-gray-lightin">
                    {`${realProfit}`} - {profit}
                  </p>
                  <div className="flex items-center gap-1 ">
                    <p
                      className={`text-sm ${marginAndDifferProfitProps(
                        profitDiffer,
                        "color"
                      )}`}
                    >
                      R$ {profitDiffer.toFixed(2)}
                    </p>
                    {marginAndDifferProfitProps(profitDiffer, "symbol")}
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
        <div className="flex justify-center items-center h-10 w-36 bg-red-600 text-red-100 rounded-lg cursor-pointer gap-1" onClick={() => deleteProfit(index, id)}>
          <button>Excluir</button>
          <FaTrashAlt size={14} />
        </div>
        <div className="flex justify-center items-center h-10 w-36 bg-lime-400 text-lime-950 rounded-lg cursor-pointer gap-1" onClick={() => updateOrCreateProfit(id, cust, gain, typeDiary, realGain, realProfit, profit, workedDays, typeMarket, setId)}>
          <button>Salvar</button>
          <FaSave size={16} />
        </div>
      </div>
    </div>
  );
}

Profit.propTypes = {
  properties: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  deleteProfit: propTypes.func.isRequired,
  updateOrCreateProfit: propTypes.func.isRequired
};
