import { Link } from "../Link";

export default function HomePage() {
  return (
    <>
      <h2>Home</h2>
      <p>pagina de ejemplo para crear un REACT ROUTER desde cero</p>
      <Link to="/about">About</Link>
    </>
  );
}
