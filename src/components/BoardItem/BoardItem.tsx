import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {Board} from "../../store/board/types";

interface IBoardItem {
    board: Board,
    remove: () => void,
    rename: (board: Board) => void,
}

const BoardItem: FC<IBoardItem> = ({board, remove, rename}) => {
    const [edit, setEdit] = useState<boolean>(false)

    // Автовыделение
    const selectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.select()
    }

    // Если теряем фокус, срабатывает событие
    const getTitle = (e: React.FocusEvent<HTMLInputElement>): void => {
        rename(
            {
                ...board,
                title: e.currentTarget.value,
            }
        )
        setEdit(!edit)
    }
    // Если нажимаем Enter, срабатывает событие
    const getTitleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {

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


    return (
        <li style={{position: "relative", width: 200, height: 100, border: '1px solid black'}}>
            {/*Здесь мы переключаем режим изменения названия доски*/}
            {edit
                ? <input
                    type="text"
                    autoFocus
                    defaultValue={board.title}
                    onFocus={selectTitle}
                    onBlur={getTitle}
                    onKeyDown={getTitleEnter}
                />
                : <h2 onClick={() => setEdit(!edit)}>{board.title}</h2>
            }
            <Link to={`/board/${board.id}`}>
                Перейти на доску
            </Link>
            <button onClick={() => remove()} style={{position: "absolute", top: 0, right: 0, padding: 5}}>х</button>
        </li>
    );
};

export default BoardItem;