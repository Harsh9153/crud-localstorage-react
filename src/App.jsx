import { useEffect, useState } from "react";
import './App.css'


function App() {
    let [data, setData] = useState({})
    let [list, setList] = useState([])
    let [pos, setPos] = useState(-1)
    let [city, setCity] = useState(["surat", "vadodara", "Rajkot", "Navasari", "Bharuch"])
    let [hob, setHob] = useState([]);


    useEffect(() => {
        let stList = JSON.parse(localStorage.getItem("stdList"));
        let newList = stList ? stList : [];
        setList(newList);
    }, setList)


    let changeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        let hoData = [...hob];
        if (name == "hobby") {
            if (e.target.checked) {
                hoData.push(value);
            }
            else {
                let index = hoData.findIndex((v, i) => v == value);
                hoData.splice(index, 1);
            }
            value = hoData;
            setHob(value);
        }
        setData({ ...data, [name]: value });
    }

    let submitData = (e) => {

        e.preventDefault();

        if (pos != -1) {
            list.map((v, i) => {
                if (i == pos) {
                    list[i] = data;
                }
            })
            localStorage.setItem("stdList", JSON.stringify([...list]))

        } else {
            let updateData = [...list, data];
            setList(updateData)
            localStorage.setItem("stdList", JSON.stringify(updateData))

        }
        setPos(-1)
        setData({})
        setHob([]);
    }

    let deletStd = (poss) => {
        list.splice(poss, 1);
        localStorage.setItem("stdList", JSON.stringify([...list]))
        setList([...list])
    }
    let updateStd = (pos) => {
        setPos(pos);
        let rec = list.filter((v, i) => {
            if (pos == i) {
                return v;
            }
        })
        setData(rec[0]);
        setHob(rec[0]["hobby"])
    }



    return (
        <>
            <form method="post" onSubmit={(e) => submitData(e)}>

                <table align="center"  className="main-table">
                    <tr>
                        <td className="name">Enter name:-
                            <br />
                        <input style={{height:"20px"}} type="text" name="name" value={data.name ? data.name : ""} onChange={(e) => changeInput(e)} /></td>
                    </tr>

                    <tr>
                        <td className="name">Enter password:-
                            <br />
                        <input  style={{height:"20px"}} type="password" name="password" value={data.password ? data.password : ""} onChange={(e) => changeInput(e)} /></td>
                    </tr>

                    <tr>
                        <td className="name">enter Gender:-
                        <br />
                            <input  type="radio" name="gender" value="male" checked={data.gender == 'male' ? "checked" : ""} onChange={(e) => changeInput(e)} />Male
                            <input type="radio" name="gender" value="female" checked={data.gender == 'female' ? "checked" : ""} onChange={(e) => changeInput(e)} />Female
                        </td>
                    </tr>

                    <tr>
                        <td className="name">City:-
                            <br />
                        
                            <select name="city"  style={{height:"40px",width:"150px"}} onChange={(e) => changeInput(e)}>
                                <option value="" >--select city--</option>
                                {city.map((v, i) => {
                                    return (
                                        <option  value={v} selected={data.city == v ? data.city : ""}>{v}</option>
                                    )
                                })}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="name">Select Hobby:-
                            <br />
                        
                            <input type="checkbox" value="reading" name="hobby" checked={hob.includes('reading') ? "checked" : ""} onChange={(e) => changeInput(e)} />Reading
                            <br />
                            <input type="checkbox" value="cycling" name="hobby" checked={hob.includes('cycling') ? "checked" : ""} onChange={(e) => changeInput(e)} />Cycling
                            <br />
                            <input type="checkbox" value="adventure" name="hobby" checked={hob.includes('adventure') ? "checked" : ""} onChange={(e) => changeInput(e)} />Adventure


                        </td>
                    </tr>

                    <tr>
                        <td className="name"> Text-area
                            <br />
                        
                            <textarea name="area" type="area" value={data.area ? data.area : ""} onChange={(e) => changeInput(e)}></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td><input type="submit" name="submit" value={pos == -1 ? "submit" : "Edit"} /></td>
                    </tr>

                </table>

            </form>

            <br />
            <br />


            <table border={1} align="center" key="sd">
                <tr >
                    <td>name</td>
                    <td>password</td>
                    <td>gender</td>
                    <td>City</td>
                    <td>Hobby</td>
                    <td>area</td>
                </tr>
                {list.map((v, i) => {
                    return (
                        <tr key={i} >
                            <td>{v.name}</td>
                            <td>{v.password}</td>
                            <td>{v.gender}</td>
                            <td>{v.city}</td>
                            <td >{v.hobby}</td>
                            <td>{v.area}</td>


                            <td>
                                <button onClick={() => deletStd(i)}>delete</button>
                                ||
                                <button onClick={() => updateStd(i)}>updateData</button>
                            </td>

                        </tr>
                    )
                })}

            </table>

        </>
    )

}
export default App;
