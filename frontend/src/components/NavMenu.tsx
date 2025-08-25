import { Navbar, Container, Nav, Form, FormControl, Dropdown } from "react-bootstrap";
import { SliderDarkMode } from "./SliderDarkMode";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import '../styles/component-css/NavMenu.css'

interface MainNavbarProps {
  search: string;
  setSearch: (value: string) => void;
  ligarModoNoturno: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Jogo {
  id: string;
  nome: string;
  steamId: string;
}

export const NavMenu = ({ search, setSearch, ligarModoNoturno }: MainNavbarProps) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<Jogo[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`http://194.163.181.133:3000/api/games?nome=${encodeURIComponent(search)}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data: Jogo[] = await res.json();
          setSuggestions(data.slice(0, 5));
        }
      } catch (err) {
        console.error("Erro ao buscar sugestões:", err);
      }
    }, 250);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);

  }, [search]);

  const handleSelectSuggestion = (jogoId: string) => {
    window.open(`https://store.steampowered.com/app/${jogoId}`, "_blank");
    setSearch("");
    setSuggestions([]);
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm" style={{ backgroundColor: "#fff" }}>
      <Container fluid>
        <Navbar.Brand className="fw-bold" style={{ color: "#b22222ff" }}>
          Pixel Rank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Form className="d-flex mx-auto w-50 position-relative">
            <FormControl
              type="search"
              placeholder="Procurar jogos..."
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {suggestions.length > 0 && (
              <Dropdown.Menu 
                show 
                className="w-100 position-absolute top-100 mt-1" 
                style={{ maxHeight: "200px", overflowY: "auto", zIndex: 1000 }}
              >
                {suggestions.map((jogo) => (
                  <Dropdown.Item 
                    key={jogo.id} 
                    onClick={() => handleSelectSuggestion(jogo.steamId)}
                  >
                    {jogo.nome}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Form>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-profile" className="fw-semibold">
                Perfil
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  Meu Perfil
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => navigate("/login")}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Nav>
            <SliderDarkMode fLigarModo={ligarModoNoturno} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
