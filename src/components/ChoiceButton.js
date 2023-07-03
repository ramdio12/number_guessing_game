import React, { useState } from "react";
import './button_styler/btnstyler.css';
import NumGameTitle from './button_styler/img/title.png'
import { useNavigate } from "react-router-dom";

function ChoiceButton({
    playersCount,
    stats,
    clickNoop
}) {



    const [click, setClick] = useState(false);
    const navigate = useNavigate();

    const numGameClick = async () => {
        await clickNoop("join_and_play");
        setClick(true);

    }
    const play_count = stats.find((_) => _.key === "play_count")?.value;

    return (
        <div className="menu_page">
            {click === true ?
            navigate("number_guessing_game")
               :
                <div className="num-page-option">
                    <div className="numguess-title">
                        <img alt="number_guessing_game_wallpaper" src={NumGameTitle} height={180} />

                    </div>
                    
                    <div className="numguess_btn_div">
                        <button onClick={numGameClick} className="btn-num-start">
                            PLAY
                        </button>
                    </div>
                    
                    <div className="numgame_stats">
                        <p>No. of Players registered : {playersCount}</p>
                        <p>No. of times you played/visit : {play_count} </p>
                    </div>
                    </div>  
            }

        </div>
    )

}

export default ChoiceButton;