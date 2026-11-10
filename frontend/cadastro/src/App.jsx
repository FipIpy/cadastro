import { useState, useRef } from "react";
import "./App.css";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import api from "../../../backend/src/api/api.js";

function App() {
  const [submitMessage, setSubmitMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const samePass = password === confirmPassword;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function createUser(event) {
    event.preventDefault();
    setSubmitMessage("");
    try {
      await api.post("/database/users/register", {
        name: inputName.current.value,
        email: inputEmail.current.value.trim().toLowerCase(),
        password: inputPassword.current.value,
        teacher: false,
        admin: false,
      });
      setSubmitMessage("Cadastro realizado com sucesso!");
    } catch (error) {
      setSubmitMessage(
        error.response?.status === 409
          ? error.response.data.error
          : "Não foi possível realizar o cadastro. Tente novamente",
      );
    }
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <form
        className="flex flex-col gap-12 w-1/4 items-center border h-3/5 justify-center rounded-3xl text-white"
        onSubmit={createUser}
      >
        <div className="title">
          <h1 className="font-semibold text-4xl">Cadastro</h1>
        </div>
        <div className="inputs flex flex-col gap-6 w-3/4 ">
          <div className="inps-box">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              ref={inputName}
              required
            />
          </div>
          <div className="inps-box">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              ref={inputEmail}
              required
            />
          </div>
          <div className="flex flex-col">
            <div className="inps-box flex items-center justify-between">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Senha"
                minLength={6}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                ref={inputPassword}
                required
              />
              <div onClick={togglePassword} className="icons w-auto h-auto">
                {showPassword ? (
                  <IoEyeOffOutline className="cursor-pointer" size={18} />
                ) : (
                  <IoEyeOutline className="cursor-pointer" size={18} />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="inps-box flex items-center justify-between">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                id="passwordConfirm"
                placeholder="Confirme sua Senha"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
              {/* <div onClick={toggleConfirmPassword} className="icons">
                {showConfirmPassword ? (
                  <IoEyeOffOutline className="cursor-pointer" size={18} />
                ) : (
                  <IoEyeOutline className="cursor-pointer" size={18} />
                )}
              </div> */}
            </div>
            <div className="bg-red-200 rounded-sm">
              {confirmPassword.length > 0 && (
                <p
                  className="text-lg text-red-900 font-bold text-center"
                  style={{ display: samePass ? "none" : "block" }}
                >
                  Senhas diferentes
                </p>
              )}
            </div>
          </div>
        </div>
        <p role="status" aria-live="polite">
          {submitMessage}
        </p>
        <div className="w-3/4 h-1/6 flex flex-col gap-2 items-center">
          <button
            disabled={!samePass}
            type="submit"
            className="w-full h-full border rounded-md font-semibold text-xl bg-blue-400 hover:opacity-85 cursor-pointer"
          >
            Cadastrar-se
          </button>

          <button
            className="w-full h-1/2 border rounded-md bg-white text-center"
            type="button"
          >
            <p className="font-semibold text-md  hover:opacity-85 cursor-pointer text-black">
              Entrar
            </p>
          </button>
        </div>
      </form>
    </main>
  );
}

export default App;
