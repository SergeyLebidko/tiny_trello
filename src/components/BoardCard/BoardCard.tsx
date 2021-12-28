import React, {FC, useEffect, useRef, useState} from 'react';
import {ROUTE_PREFIX} from "../../constants/settings";
import {Link} from "react-router-dom";
import {Board} from "../../store/board/types";

interface IBoardCard {
    board: Board,
    remove: () => void,
    rename: (board: Board) => void,
}

const BoardCard: FC<IBoardCard> = ({board, remove, rename}) => {
    const [edit,setEdit] = useState<boolean>(false)

    const getTitle = (e:React.FocusEvent<HTMLInputElement>) : void => {
        rename(
            {
                ...board,
                title: e.currentTarget.value,
            }
        )
        setEdit(!edit)
    }

    const getTitleEnter = (e:React.KeyboardEvent<HTMLInputElement>) : void => {
        if (e.code === 'Enter') {
            rename(
                {
                    ...board,
                    title: e.currentTarget.value,
                }
            )
            setEdit(!edit)
        }
    }

    const focusing = () => {
        setEdit(!edit)
    }

    return (
        <li style={{position:"relative", width:200, height:100, border: '1px solid black'}}>
            {edit
                ? <input type="text" defaultValue={board.title} onBlur={getTitle} onKeyDown={getTitleEnter}/>
                : <h2 onClick={focusing}>{board.title}</h2>
            }
            <Link
                to={`/${ROUTE_PREFIX}/board/${board.id}`}
            >
                Перейти на доску
            </Link>
            <button onClick={() => remove()} style={{position:"absolute", top:0, right: 0, padding: 5}}>х</button>
        </li>
    );
};

export default BoardCard;