import {useState} from "react";
import './App.css';

function App() {

    const [link, setLink] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState('')
    const onchangeInp = (e) => {
        setValue(e);
        if(error){
            setError('');
        }
    }
    const handleClick = () => {
        fetch(`https://api.shrtco.de/v2/shorten?url=${value}`).then(res => {
            res.json().then(response => {
                if (response.ok) {
                    setLink(response.result.short_link)
                } else {
                    setError('Something went wrong');
                    setLink('');
                }
            })
        })
    }
    return (
        <div className="App">
            <input onChange={(e) => onchangeInp(e.target.value)}/>
            <button onClick={handleClick}>Shorten</button>
            {
                link &&  <div style={{marginTop:' 15px'}}>
                    <span>link</span>
                    <a href={value} target='_blank' style={{marginLeft: '15px'}}>{link}</a>
                </div>
            }
            {
                error && <p>{error}</p>
            }
        </div>
    );
}

export default App;
