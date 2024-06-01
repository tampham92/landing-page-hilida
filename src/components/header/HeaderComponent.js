import styles from './Header.module.css';
import { sologanImg } from '../../images/Image';
function HeaderComponent() {
    return (
        <div className={styles['body']}>
            <img className={styles['sologan']} alt={sologanImg} src={sologanImg}></img>
        </div>
    );
}

export default HeaderComponent;
