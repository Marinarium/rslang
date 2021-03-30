import React from "react";
import styles from './ChessStructure.scss';

export default function ChessStructure({contentItems}) {
    const content = contentItems.map(({img, id, title, text}) => {
        return (
            <div key={id}>
                <img src={img} alt={title}/>
                <h4 >{title}</h4>
                <div>
                    {text.map((paragraph) => {
                        return (
                            <p>{paragraph}</p>
                        );
                    })}
                </div>
            </div>
        );
    });

    return (
        <div>
            {content}
        </div>
    );


}