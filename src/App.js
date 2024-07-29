import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2024-06-29&sortBy=publishedAt&apiKey=f6f7dcf674ed4fe194ff1e952af11cef"
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsList(data.articles.slice(0, 10)); // Only take the first 10 articles
      });
  }, []);

  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center m-2 p-2">
        <h1 className="text-4xl font-bold">News</h1>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center m-2 p-2">
          {newsList.map((val, key) => {
            return (
              <div
                className="flex flex-col items-center justify-center border-2 border-black rounded-lg m-2 p-2 w-1/2"
                key={key}
              >
                <div className="m-2 p-2">
                  <p className="font-bold text-2xl m-2">{val.title}</p>
                </div>
                <div className="m-2 p-2">
                  <img
                    className="object-scale-down h-48 w-96 m-2"
                    src={val.urlToImage}
                    alt="News"
                  />
                </div>
                <div className="m-2 p-2">
                  <p className="text-lg font-semibold">{val.description}</p>
                </div>
                <div className="flex flex-col items-end justify-end w-full">
                  <div className="flex flex-col">
                    <div className="m-2 p-2">
                      <h1 className="font-bold text-lg">Author:</h1>
                      <h1 className="text-lg">{val.author}</h1>
                    </div>
                    <div className="m-2 p-2">
                      <h1 className="font-bold text-lg">Published At:</h1>
                      <p>{convertToIST(val.publishedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
