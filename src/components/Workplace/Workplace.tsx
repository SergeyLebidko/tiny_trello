import React, {FC} from 'react';
import Card from "../Card/Card";

const Workplace: FC = () => {
    return (
        <div style={{backgroundColor: "ghostwhite",}}>
            <div style={{fontSize:40}}>Название доски</div>
            <div style={{display:'flex', flexBasis:800, columnGap:40}}>
                <Card/>
                <Card/>
                <Card/>
            </div>

        </div>
    );
};

export default Workplace;