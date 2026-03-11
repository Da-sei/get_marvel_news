"use client"

import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  link: string;
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchAndParseXml = async () => {
      try {
        // NestJSのAPIからXMLを取得
        const response = await fetch('http://localhost:3000/get');
        const xmlString = await response.text();

        // DOMParserを使ってXML文字列をDOMオブジェクトに変換
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // getElementsByTagNameやquerySelectorAllで特定のタブを抽出
        const items = xmlDoc.getElementsByTagName('item');
        const extractedData: NewsItem[] = [];

        // HTMLコレクションをループして中身を取り出す
        for(let i = 0; i < items.length; i ++) {
          const title = items[i].getElementsByTagName('title')[0]?.textContent || '';
          const link = items[i].getElementsByTagName('link')[0]?.textContent || '';
          
          extractedData.push({ title, link });
        }
          setNews(extractedData);
      } catch (error) {
        console.log('XMLの解析に失敗しました:', error);
      }
    };
    // 実行する関数
    fetchAndParseXml();
  }, [])

  return (
  <div>
    <header className="shadow-md mb-2 bg-red-500 sticky top-0">
      <h1 className="italic font-bold text-white text-center text-4xl">MARVEL News List</h1>
    </header>
    <div className="mx-40">
      <ul className="list-disc list-inside ml-4">
        {news.map((item, index) => (
          <li key={index}  className="my-2">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <footer className="bg-gray-200">
      <h1 className="text-center">Created By Issey</h1>
    </footer>
    </div>
  );
}
