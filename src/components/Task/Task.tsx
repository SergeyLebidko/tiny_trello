import React, {FC} from 'react';

interface ITaskProps {
    index: number;
    text: string;
    deleteTask: (id: number) => void;
}

const Task: FC<ITaskProps> = ({index, text,deleteTask}) => {

    const clickHandler = () => {
        deleteTask(index);
    }


    return (
        <div style={{margin:10}}>
            <textarea defaultValue={index + ' ' + text} style={{display:'block'}}></textarea>
            <button style={{color: "indianred"}} onClick={clickHandler} value={index}>Удалить</button>
        </div>
    );
};

export default Task;