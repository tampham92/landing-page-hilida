import styels from './Body.module.css';
import { itemsImg, infoAddressImg } from '../../images/Image';
import StoreComponent from '../table-adress/StoreComponent';
function BodyComponent() {
    return (
        <div className={styels['body']}>
            <div>
                <img className={styels['address']} alt={infoAddressImg} src={infoAddressImg}></img>
                <img className={styels['item']} alt={itemsImg} src={itemsImg}></img>
            </div>
            <StoreComponent/>
        </div>
    )
}

export default BodyComponent;