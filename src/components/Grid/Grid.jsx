import { useState } from "react";
import './Grid.css'
import Card from "../Card/Card";
import iswinner from "../../helpers/checkwinner";

function Grid({numberofcards})
{
    const [board,setboard]=useState(Array(numberofcards).fill(""));
    const [turn,setturn]=useState(true)
    const [winner,setwinner]=useState(null);
    function play(index)
    {
        if(turn==true)
        {
            board[index]='O';
        }else{
            board[index]='X'
        }
        const win=iswinner(board,turn?'O':'X');
        if(win)
        {
            setwinner(win);
        }
        setboard([...board]);
        setturn(!turn)
    }
    function reset()
    {
        setturn(true);
        setwinner(null);
        setboard(Array(numberofcards).fill(""));

    }
    return(
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                    <h1 className="turn-highlight">winner is :{winner}</h1>
                    <button className="reset" onClick={reset}>Reset</button>
                    </>
                )
                
            }
            <h1 className="turn-highlight">current turn:{(turn)?'O':'X'}</h1>
            <div className="grid">
                {board.map((el,idx)=> <Card gameend={winner?true:false} key={idx} onPlay={play} player={el} index={idx} />)}
            </div>
        </div>
    )

}

export default Grid;