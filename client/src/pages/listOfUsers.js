import React from 'react';
import styles from "./styles.module.scss";

export default function ListOfUsers({id, name, joinToPlayer , room}) {
    return (
        <div key={id}>
            <ul>
                <li>
                    <h3 onClick={()=>joinToPlayer({room, id, name})} className={styles.titleForInput}>{name}</h3>
                </li>
            </ul>

        </div>
    )

}
