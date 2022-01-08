import React, {useState} from 'react';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {useDispatch} from 'react-redux';
import {patchBoard, removeBoard} from '../../../store/board/actions';
import BoardCreateForm from '../../forms/BoardCreateForm/BoardCreateForm';
import {Board} from '../../../store/board/types';
import BoardItem from '../../BoardItem/BoardItem';
import {useImage} from '../../../utils/hooks';
import {Link} from 'react-router-dom';
import './BoardList.scss';

const BoardList: React.FC = () => {
    const dispatch = useDispatch();
    const loggedUser = useTypedSelector(getLoggedUser);
    const boards = useTypedSelector(getBoards);

    const {icons} = useImage();

    const [hasCreateForm, setHasCreateForm] = useState<boolean>(false)

    const openCreateForm = (): void => setHasCreateForm(true);
    const closeCreateForm = (): void => setHasCreateForm(false);

    // Функция удаления доску
    const removeBoardHandler = (board: Board): void => {
        dispatch(removeBoard(board));
    }

    // Функция изменения названия доску
    const renameBoardHandler = (board: Board): void => {
        dispatch(patchBoard(board));
    }

    return (
        loggedUser ? (
                <div className="boardList">
                    <div className="boardList__header">
                        <div className="boardList__header_block">
                            <div className="boardList__header_left">
                                <div className="boardList__header_left_item"/>
                            </div>
                            <div className="boardList__header_middle">
                                <div className="boardList__header__triangle_left"/>
                                <div className="boardList__header__triangle_right"/>
                                <Link className="boardList__logo" to="/">Tiny-trello</Link>
                                <div className="boardList__user">
                                    <p>{loggedUser.firstName} {loggedUser.lastName} :</p>
                                    <p>Список досок</p>
                                </div>
                            </div>
                            <div className="boardList__header_right">
                                <div className="boardList__header_right_item"/>
                            </div>
                        </div>
                    </div>

                    <ul className="boardList__content" style={{display: 'inline-flex'}}>
                        {boards.map((board) =>
                            <BoardItem
                                key={board.id}
                                board={board}
                                remove={() => removeBoardHandler(board)}
                                rename={renameBoardHandler}
                            />)
                        }
                        {hasCreateForm ?
                            <BoardCreateForm closeHandler={closeCreateForm}/>
                            :
                            <li className="boardList__list_btn_block" onClick={openCreateForm}>
                                <img
                                    className="boardList__btn_add"
                                    src={icons.iconAdd}
                                    alt="add"
                                />
                            </li>
                        }
                    </ul>

                    <footer className="boardList__footer">Свои предложения по развитию сайта и переводу присылайте на почту
                        kk309@mail.ru
                    </footer>
                </div>
            )
            : null
    )
}

export default BoardList;