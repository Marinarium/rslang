import React from "react";
import rsLogo from "./images/rs-logo.svg"

import styles from './Footer.module.scss';

export default function Footer() {
    const gitAccounts = [
        {login: 'adelheid483', link: 'https://github.com/Adelheid483'},
        {login: 'kruglyanski', link: 'https://github.com/Kruglyanski'},
        {login: 'marinarium', link: 'https://github.com/Marinarium'},
        {login: 'zhenjahorbach', link: 'https://github.com/ZhenjaHorbach'}
    ];

    const allGitAccounts = gitAccounts.map(({login, link}) => {
        return (
            <li className={styles.author} key={login}>
                <a href={link} className={styles.author_link}>
                    <span className={styles.login}>{login}</span>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M6.5 0C2.90875 0 0 2.90875 0 6.5C0 9.37625 1.86062 11.8056 4.44438 12.6669C4.76937 12.7237 4.89125 12.5287 4.89125 12.3581C4.89125 12.2037 4.88313 11.6919 4.88313 11.1475C3.25 11.4481 2.8275 10.7494 2.6975 10.3837C2.62437 10.1969 2.3075 9.62 2.03125 9.46562C1.80375 9.34375 1.47875 9.04312 2.02312 9.035C2.535 9.02687 2.90062 9.50625 3.0225 9.70125C3.6075 10.6844 4.54188 10.4081 4.91563 10.2375C4.9725 9.815 5.14313 9.53062 5.33 9.36812C3.88375 9.20562 2.3725 8.645 2.3725 6.15875C2.3725 5.45187 2.62438 4.86687 3.03875 4.41187C2.97375 4.24937 2.74625 3.58312 3.10375 2.68937C3.10375 2.68937 3.64812 2.51875 4.89125 3.35562C5.41125 3.20937 5.96375 3.13625 6.51625 3.13625C7.06875 3.13625 7.62125 3.20937 8.14125 3.35562C9.38438 2.51062 9.92875 2.68937 9.92875 2.68937C10.2863 3.58312 10.0588 4.24937 9.99375 4.41187C10.4081 4.86687 10.66 5.44375 10.66 6.15875C10.66 8.65312 9.14062 9.20562 7.69438 9.36812C7.93 9.57125 8.13313 9.96125 8.13313 10.5706C8.13313 11.44 8.125 12.1387 8.125 12.3581C8.125 12.5287 8.24687 12.7319 8.57188 12.6669C9.86224 12.2313 10.9835 11.402 11.7779 10.2957C12.5722 9.18943 12.9997 7.86191 13 6.5C13 2.90875 10.0913 0 6.5 0Z"
                              fill="white"/>
                    </svg>
                </a>
            </li>
        );
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.details}>
                <a href="https://rs.school/" className={styles.rs}>
                    <img src={rsLogo} alt="rs-school" className={styles.rs_img}/>
                </a>
                <p className={styles.copyright}>© 2021 RSLang</p>
            </div>
            <ul className={styles.authors}>
                {allGitAccounts}
            </ul>
        </footer>
    )
}