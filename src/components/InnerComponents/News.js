import { nanoid } from "nanoid";
import React, { useState, useEffect, useContext } from "react";
import generateNews from "../HelperFunctions/generateNews";
import Loader from "../Loader";
import TextTruncate from 'react-text-truncate';
import { weatherContext } from "../../App";
function News() {
    const [newsLoading, setNewsLoading] = useState(false);

    const [newsList, setnewsList] = useState(null)
    const code = useContext(weatherContext)
    const { c_code } = code
    useEffect(() => {
        setNewsLoading(true)
        generateNews().then((newsData) => {
            const newsList = newsData.map((item) => {
                return (
                    <div key={nanoid(9)} className="news-tile">
                        <div className="img-mask-div">
                            <img src={item.news_img} alt={item.caption} className="news-thumbnail" />
                        </div>
                        <div className="news-text-content-div">
                            <h3 className="news-title">{item.title}</h3>
                            <TextTruncate
                            element="p"
                            containerClassName="news-description"
                            line={1}
                            truncateText="…"
                            text={item.abstract}
                            />
                            <a href={item.news_url} target="_blank" rel="noreferrer" className="news-link">Read More</a>
                            
                        </div>
                        
                    </div>

                )
            })

            setnewsList(newsList)
            setNewsLoading(false)
        })


    }, [c_code]);
const a = [1,2,3,4,5]
    return (

        <>
 

            <div className="news-container">

                {newsLoading ? <>

                    {a.map((item) => {
                        return (
                            <React.Fragment key={nanoid(9)}>
                                <Loader
                                    classStyle={"loader-element"}
                                />
                            </React.Fragment>
                        )
                    }
                    )
                    }</>
                    : <>

                        {newsList}
                        <span className="nytimes-attribution">Data provided by The New York Times</span>
                    </>
                }
                
            </div>
        </>
    )
}
export default News;