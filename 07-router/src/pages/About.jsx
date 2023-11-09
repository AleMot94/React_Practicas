import { Link } from "../Link";

// ejemplo de hacer un componente en varios idiomas por query
const languish = {
  en: {
    title: "About",
    description:
      "paginate ejample to create a reacto router dom from the start",
  },
  es: {
    title: "Sobre nosotros",
    description: "pagina de ejemplo para crear un REACT ROUTER desde cero",
  },
};

const useLang = (lang) => {
  return languish[lang] || languish.en;
};

export default function About({ routerParams }) {
  const lang = useLang(routerParams.lang ?? "es");
  return (
    <>
      <h2>{lang.title}</h2>
      <p>{lang.description}</p>
      <Link to="/">Home</Link>
    </>
  );
}
