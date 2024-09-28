import { Header } from "./Header";
import { FilterAndCreate } from "./Filter-and-create";
import { Profit } from "./Profit";
import { useState, useEffect } from "react";
import { Register } from "./modals/Register";
import { Login } from "./modals/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../lib/axios";
import { Unauthorized } from "./modals/Unauthorized";

export function CreateProfits() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const verificationCookie = async () => {
      const response = await axios.get("/login", { withCredentials: true });
      setIsLogged(response.data);
    };
    verificationCookie();
  }, []);
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

  const [profits, setProfits] = useState([]);
  useEffect(() => {
    async function getData() {
      if (isLogged) {
        const response = await axios.get("/profit", { withCredentials: true });
        setProfits(response.data.profit);
      }
      return;
    }
    getData();
    return;
  }, [isLogged]);

  function createProfit() {
    let newState = [...profits];
    newState.push({idKey: Math.random()});
    setProfits(newState);
  }

  async function deleteProfit(index, id) {
    let newState = [...profits];
    newState.splice(index, 1);
    setProfits(newState);
    toast.success("Lucro removido");
    if (id) {
      await axios.delete(`/profit/${id}`, { withCredentials: true });
    }
  }

  const [IsUnauthorizedModal, setUnauthorizedModal] = useState(false);
  function closeUnauthorizedModal() {
    setUnauthorizedModal(false)
  }
  function openUnauthorizedModal() {
    setUnauthorizedModal(true)
  }

  async function updateOrCreateProfit(id, cust, gain, typeDiary, realGain, realProfit, profit, workedDays, typeMarket, setId) {
    if(isLogged) {
      if (id) {
        await axios.put(
          `/profit/${id}`,
          {
            cust: Number(cust),
            gain: Number(gain),
            type_diary: typeDiary,
            real_gain: Number(realGain),
            real_profit: Number(realProfit),
            expected_profit: Number(profit),
            worked_days: Number(workedDays),
            type_market: typeMarket,
          },
          { withCredentials: true }
        );
        toast.success("Lucro atualizado");
        return;
      } else {
        if(!profit && !realProfit) {
          return toast.error("Escreva pelo menos um lucro")
        }

        if(!gain && !realGain) {
          return toast.error("Escreva pelo menos um ganho")
        }

        if(typeDiary && workedDays <= 0) {
          return toast.error("Escreva os dias de ganhos")
        }

        const { data } = await axios.post(
          `/profit`,
          {
            cust: Number(cust),
            gain: Number(gain),
            type_diary: typeDiary,
            real_gain: Number(realGain),
            real_profit: Number(realProfit),
            expected_profit: Number(profit),
            worked_days: Number(workedDays),
            type_market: typeMarket,
          },
          { withCredentials: true }
        );
        setId(data.profit.id);
        toast.success("Lucro criado");
        return;
      }
    } else {
      openUnauthorizedModal(true)
    }
  }

  return (
    <div className="bg-neutral-800 min-h-screen">
      <Header
        openRegisterModal={openRegisterModal}
        openLoginModal={openLoginModal}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
      />
      <FilterAndCreate createProfit={createProfit} />
      <main className="flex flex-col justify-center items-center">
        {profits.map(({ ...profit }, index) => (
          <div key={profit.id || profit.idKey}>
            <Profit
              properties={profit}
              index={index}
              deleteProfit={deleteProfit}
              updateOrCreateProfit={updateOrCreateProfit}
            />
          </div>
        ))}
      </main>

      {IsRegisterModal && <Register closeRegisterModal={closeRegisterModal} />}
      {IsLoginModal && (
        <Login
          closeLoginModal={closeLoginModal}
          setIsLogged={setIsLogged}
          profits={profits}
        />
      )}
      {IsUnauthorizedModal && <Unauthorized closeUnauthorizedModal={closeUnauthorizedModal}/>}
      <ToastContainer />
    </div>
  );
}
