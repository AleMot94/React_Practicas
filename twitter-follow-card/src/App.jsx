import FollowCard from './componentes/TwitterFollowCard'
import "./app.css"
const users = [
  {
    userName: "peron",
    name: "Juan Domingo Peron",
    urlImg: "/imagenes/peron.jpg",
    isFollowing: true
  },
  {
    userName: "menem",
    name: "Carlos Saul Menem",
    urlImg: "/imagenes/menem.jpg",
    isFollowing: true
  },
  {
    userName: "alfonsin",
    name: "Raul Alfonsin",
    urlImg: "/imagenes/alfonsin.jpg",
    isFollowing: false
  }
]

function App() {
  const formatUserName = (userName) => `@${userName}`

  return (
    <>
      <section className='fc-section-main'>
        {users.map(({name, userName, urlImg, isFollowing})=>
          <FollowCard 
            key={userName} 
            formatUserName={formatUserName}
            name={name} 
            userName={userName} 
            urlImg={urlImg}
            isFollowing={isFollowing}/>
        )}
      </section>
    </>
    
  )
}

export default App
