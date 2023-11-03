import { useFilter } from "../hooks/useFilter";
import { useCart } from "../hooks/useCart";
import "./Footer.css";

// linda forma de ver en tiempo real un objeto en la pagina
function Footer() {
  const { filters } = useFilter();
  const { cart } = useCart();

  return (
    <footer className="footer">
      {JSON.stringify(filters, null, 2)}
      {JSON.stringify(cart, null, 2)}
    </footer>
  );
}

export default Footer;
