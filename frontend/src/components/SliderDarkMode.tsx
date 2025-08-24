import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import { FaMoon, FaSun } from "react-icons/fa";

import '../styles/component-css/SliderDarkMode.css'

type Handler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface SliderDarkModeProps {
  fLigarModo?: Handler;
}

export const SliderDarkMode = ({ fLigarModo }: SliderDarkModeProps): React.JSX.Element => {
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    if (modoEscuro) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [modoEscuro]);

  const ligarModoNoturno = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setModoEscuro(e.target.checked); 
    if (fLigarModo) fLigarModo(e); 
  };

  return (
    <Form className="d-flex align-items-center ms-3">
      <Form.Check
        className="switch-modo"
        type="switch"
        id="modo-escuro"
        label={modoEscuro ? <FaMoon color="yellow" /> : <FaSun color="yellow" />}
        checked={modoEscuro}
        onChange={ligarModoNoturno}
      />
    </Form>
  );
};
