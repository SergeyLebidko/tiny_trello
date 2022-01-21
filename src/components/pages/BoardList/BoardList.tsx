import React, {useState} from 'react';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import BoardCreateForm from '../../forms/BoardCreateForm/BoardCreateForm';
import BoardPanel from '../../entities/BoardPanel/BoardPanel';
import {Link} from 'react-router-dom';
import './BoardList.scss';

// images
import iconAdd from '../../../content/icons/btn-add.png';

const BoardList: React.FC = () => {
    const loggedUser = useTypedSelector(getLoggedUser);
    const boards = useTypedSelector(getBoards);

    const [hasCreateForm, setHasCreateForm] = useState<boolean>(false)

    const openCreateForm = (): void => setHasCreateForm(true);
    const closeCreateForm = (): void => setHasCreateForm(false);

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

                    <ul className="boardList__content">
                        {boards.length == 0 && <div className="boardList__text_empty">Список досок пуст.</div>}
                        {boards.map((board) => <BoardPanel key={board.id} board={board}/>)}
                        {hasCreateForm ?
                            <li>
                                <BoardCreateForm closeHandler={closeCreateForm}/>
                            </li>
                            :
                            <li className="boardList__list_btn_block" onClick={openCreateForm}>
                                <img
                                    className="boardList__btn_add"
                                    src={iconAdd}
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