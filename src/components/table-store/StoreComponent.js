import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

function StoreComponent() {
    const [stores, setStores] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [citySelect, setCitySelect] = useState();
    const [districtSelect, setDistrictSelect] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${apiUrl}/api/stores`);

                if (response.ok) {
                    const storesData = await response.json();
                    const citiesData = new Set();
                    storesData.data.forEach(value => {
                        citiesData.add(value.city);

                    })

                    localStorage.setItem('stores', JSON.stringify(storesData.data));

                    setStores(storesData.data);
                    setCities(citiesData);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const handleSelectCity = (e) => {
        const citiSelected = e.target.value;
        const districtsData = new Set();

        const sotresLocal = JSON.parse(localStorage.getItem('stores')) ?? [];
        sotresLocal.forEach(store => {
            if (store.city === citiSelected) {
                districtsData.add(store.district)
            }
        });

        setCitySelect(citiSelected);
        setDistricts(districtsData);
    }

    useEffect(() => {
        const listStore = [];
        const sotresLocal = JSON.parse(localStorage.getItem('stores')) ?? [];
        sotresLocal.forEach(store => {
            if (districtSelect === store.district) {
                listStore.push(store);
            }
        });
        setStores(listStore);
    }, [districtSelect]);

    return (
        <>
            <div style={{ padding: 20 }}>
                <select onChange={handleSelectCity}>
                    <option>TỈNH/THÀNH PHỐ</option>
                    {[...cities].map((ci) => (
                        <option key={ci} value={ci} defaultValue={citySelect === ci} >
                            {ci}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setDistrictSelect(e.target.value)}>
                    <option >Quận/Huyện</option>
                    {[...districts].map((dist) => (
                        <option key={dist} value={dist} defaultValue={districtSelect === dist} >
                            {dist}
                        </option>
                    ))}
                </select>
                <div>
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Địa chỉ</th>
                            <th>Thời gian</th>
                        </tr>
                        {stores.map((store, index) => {
                            return (
                                <tr index={index} key={store.name}>
                                    <td>{index + 1}</td>
                                    <td>{store.name}</td>
                                    <td>{`${store.street}, ${store.district}, ${store.city}`}</td>
                                    <td>{`${store.time} - ${store.date}`}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </>
    )
}

export default StoreComponent;