import { useEffect, useState } from "react";

const citiesData = [
    { id: 1, name: "HCM" },
    { id: 2, name: "Hà Nội" },
    { id: 3, name: "Cần Thơ" },
    { id: 4, name: "Đà Nẵng" }
];

const districtsData = [
    { id: 1, name: "Quan 1", citi_id: 1 },
    { id: 2, name: "Quan 2", citi_id: 1 },
    { id: 3, name: "Quan 3", citi_id: 1 },
    { id: 4, name: "Quan 4", citi_id: 1 },
    { id: 5, name: "Ninh Kieu", citi_id: 3 },
    { id: 6, name: "Cai Rang", citi_id: 3 },
    { id: 7, name: "Long Bien", citi_id: 2 }
];


const addressData = [
    { id: 1, address: "123 Bui dinh tuy", name: "bia 123", citi_id: 1, dict_id: 1 },
    { id: 2, address: "223 Nguyen thi dinh", name: "bia Tuoi ne", citi_id: 1, dict_id: 2 },
    { id: 3, address: "445 Tan trao", name: "bia Quan", citi_id: 1, dict_id: 3 },
    { id: 4, address: "555 Phu my hung", name: "bia PHM", citi_id: 1, dict_id: 4 },
    { id: 5, address: "123 Ninh Kieu", name: "bia Ninh Kieu", citi_id: 3, dict_id: 5 },
    { id: 6, address: "03 Lang Ha", name: "bia Lang Ha", citi_id: 2, dict_id: 7 },
    { id: 7, address: "04 Long Dien Bien", name: "bia Long Bien", citi_id: 2, dict_id: 7 }
];

function AddressComponent() {
    const [city, setCity] = useState(citiesData[0].name);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [addressStore, setAddressStore] = useState([]);

    const handleSelectCity = (e) => {
        setCity(() => {
            const citiId = e.target.value;
            const listDist = [];
            districtsData.forEach(dict => {
                if (dict.citi_id == citiId) {
                    listDist.push(dict);
                }
            });
            setCity(citiId);
            setDistricts(listDist);
        })
    }

    useEffect(() => {
        const listStore = [];
        addressData.forEach(addr => {
            if(district == addr.dict_id){
                listStore.push(addr);
            }
        });
        setAddressStore(listStore);
    }, [district])
    return (
        <>
            <div style={{ padding: 20 }}>
                <select onChange={handleSelectCity}>
                    <option>TỈNH/THÀNH PHỐ</option>
                    {citiesData.map((ci) => (
                        <option key={ci.id} value={ci.id} defaultValue={city === ci.id} >
                            {ci.name}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setDistrict(e.target.value)}>
                    <option >Quận/Huyện</option>
                    {districts.map((dist) => (
                        <option key={dist.id} value={dist.id} defaultValue={district === dist.id} >
                            {dist.name}
                        </option>
                    ))}
                </select>
                <div>
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Địa chỉ</th>
                            <th>Thành phố</th>
                        </tr>
                        {addressStore.map((addr, index) => {
                            return (
                                <tr key={addr.id}>
                                    <td>{index+1}</td>
                                    <td>{addr.name}</td>
                                    <td>{addr.address}</td>
                                    <td>{addr.citi_id}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </>
    )
}

export default AddressComponent;