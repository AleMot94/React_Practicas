import React from "react";
import { useState } from "react";
import "./followCard.css"

const FollowCard = ({name, userName, urlImg, formatUserName, isFollowing}) => {
    const [initialIsFollowing, setInitialIsFollowing] = useState(isFollowing);
    const textButton = initialIsFollowing ? "siguiendo" : "seguir"
    const buttonClassName = initialIsFollowing ? "fc-button-siguiendo" : "fc-button-seguir"
    const handleClick = () => {
        setInitialIsFollowing(!initialIsFollowing);
    }

    return(
        <article className="fc-article">
        <header className="fc-header">
            <img className="fc-imagen" src={urlImg} alt="peron"/>
            <div className="fc-div-info">
              <strong>{name}</strong>
              <span className="fc-span-user">{formatUserName(userName)}</span>
            </div>
        </header>

        <section>
            <button className={buttonClassName} onClick={handleClick}>
                {textButton}
            </button>
        </section>
     </article>
    )
}

export default FollowCard