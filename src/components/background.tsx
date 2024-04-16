import { useEffect, useState } from "react"
import svg_tripoloski from "styles/tripoloski.svg"

const BackgroundElements = () => {

    const [clockJson, setClock] = useState({time: "00:00:00", date: "00/00/0000", local: Intl.DateTimeFormat().resolvedOptions().timeZone})

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
            const formattedTime = `${hours}:${minutes}:${seconds}`;
    
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
    
            const formattedDate = `${day}/${month}/${year}`;
    
            setClock(prevState => ({
                ...prevState,
                time: formattedTime,
                date: formattedDate
            }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    return <div className="absolute w-full top-0 left-0" style={{zIndex: -99}}>
        <img className="absolute left-[50%] w-[50%] translate-x-[-50%] top-[125vh]" src={"cdn/bgcode.png"} alt={"bgcode"}/>
        <div className="w-full max-w-[1000px] mx-auto">
            <p className="absolute h-full top-[50vh] text-white text-3xl opacity-25 mx-3">
                <span className="text-yellow-400">{"{"}</span><br />
                <span className="ml-[25px]"><span className="text-blue-300">"time"</span>: <span className="text-[#A57151]">"{clockJson.time}"</span>,</span><br />
                <span className="ml-[50px]"><span className="text-blue-300">"date"</span>: <span className="text-[#A57151]">"{clockJson.date}"</span>,</span><br />
                <span className="ml-[75px]"><span className="text-blue-300">"local"</span>: <span className="text-[#A57151]">"{clockJson.local}"</span></span><br />
                <span className="text-yellow-400 ml-[110px]">{"}"}</span>
            </p>
        </div>
    </div>  
}

export default BackgroundElements