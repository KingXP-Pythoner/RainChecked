
const generateNews = async () => {
try{
    const url = "/.netlify/functions/fetchNews"
const apiData = await fetch(url)
.then(res => res.json())

const filterList = apiData.results.filter((item)=>{return item.section === "world" && item.multimedia !== null})
       const generalNewsList = filterList.map((item)=>{

              const obj = {title: item.title, abstract: item.abstract, news_url: item.url, news_img: item["multimedia"][2]["url"], caption: item["multimedia"][2]["caption"]}
              return obj
         
    })

    return generalNewsList

}
catch(err){
    console.log("codetoCountry error: ", err)
}
}
export default generateNews;