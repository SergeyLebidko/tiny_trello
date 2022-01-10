import React from 'react';
import {Card} from '../../../store/card/types';
import './CardTitleEditForm.scss';

type CardTitleEditFormProps = {
    card: Card
}

const CardTitleEditForm: React.FC<CardTitleEditFormProps> = ({card}) => {
    return (
        <input defaultValue={card.title}/>
    );
}

export default CardTitleEditForm;