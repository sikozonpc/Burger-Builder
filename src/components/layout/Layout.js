import React from "react";

import styles from "./Layout.module.css";


const layout = (props) => (
    <>
        <div>Toolbar, sidedrawer</div>
        <main className={styles.Content}>
            { props.children }
        </main>
    </> 
);

export default layout;