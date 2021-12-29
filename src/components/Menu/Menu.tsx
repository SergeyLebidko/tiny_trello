import React, {FC, useRef, useState} from 'react';
import {Board} from "../../store/board/types";

interface IMenuProps {
    remove: () => void,
    rename: (board: Board) => void,
    board: Board,
}

const Menu: FC<IMenuProps> = ({board, remove, rename}) => {

    const [active, setActive] = useState<boolean>(false)
    const [modalView, setModalView] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const getTitleBoard = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (!inputRef.current) return;
        if (e.code === 'Enter') {
            rename(
                {
                    ...board,
                    title: e.currentTarget.value,
                }
            )
            setModalView(false)
            setActive(false)
        }
    }

    const getTitleMouse = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (!inputRef.current) return;
        rename(
            {
                ...board,
                title: inputRef.current.value,
            }
        )
    }


    return (
        <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: 10,
            textAlign: "right"
        }}>
            <div onClick={() => setActive(!active)} style={{backgroundColor: '#a48c3a',}}>
                Меню
            </div>
            {active ?
                <div style={{display: "flex", flexDirection: "column", width: 150}}>
                    <button onClick={() => remove()}>Удалить доску</button>
                    <button onClick={() => setModalView(!modalView)}>Переименовать</button>
                </div>
                : null
            }
            {modalView ?
                <div className='modal'>
                    <p>Введите новое название</p>
                    <input ref={inputRef} type="text" onKeyDown={getTitleBoard}/>
                    <button onClick={getTitleMouse}></button>
                </div>
                : null
            }
        </div>
    );
}

export default Menu;