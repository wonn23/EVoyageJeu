import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  서울: "#0088FE",
  부산: "#00C49F",
  대구: "#FFBB28",
  인천: "#FF8042",
  광주: "#AF19FF",
  대전: "#FF00AE",
  울산: "#FF0000",
  세종: "#C0C0C0",
  경기: "#808080",
  강원: "#000000",
  충북: "#FFD700",
  충남: "#ADFF2F",
  전북: "#008000",
  전남: "#ADFF2F",
  경북: "#FF00FF",
  경남: "#800000",
  제주: "#FF8042",
  기타: "#0000FF",
};

const cityNamesInKorean = {
  Seoul: "서울",
  Busan: "부산",
  Daegu: "대구",
  Incheon: "인천",
  Gwangju: "광주",
  Daejeon: "대전",
  Ulsan: "울산",
  Sejong: "세종",
  Gyeonggi: "경기",
  Gangwon: "강원",
  Chungbuk: "충북",
  Chungnam: "충남",
  Jeonbuk: "전북",
  Jeonnam: "전남",
  Gyeongbuk: "경북",
  Gyeongnam: "경남",
  Jeju: "제주",
};

const renderTooltipItem = ({ payload }) => {
  return null; // 페이로드가 비어 있을 때는 아무것도 반환하지 않습니다
};

function EVPieChart() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2015);

  useEffect(() => {
    const fetchData = async (year) => {
      try {
        const response = await fetch(`http://localhost:5001/evRatio/${year}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let rawData = await response.json();

        // 도시 이름을 한국어로 변환하고 evcar_count 비율 계산
        let convertedData = rawData.map((item) => ({
          ...item,
          city: cityNamesInKorean[item.city],
          ratio:
            item.evcar_count /
            rawData.reduce((acc, cur) => acc + cur.evcar_count, 0),
        }));

        // 2% 미만인 도시들을 '기타'로 묶는 부분
        let otherCities = { city: "기타", ratio: 0 };
        convertedData = convertedData.filter((item) => {
          if (item.ratio <= 0.02) {
            // 2%를 비율로 바꾼 값
            otherCities.ratio += item.ratio;
            return false;
          }
          return true;
        });
        convertedData.push(otherCities);

        setData(convertedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData(year);
  }, [year]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div>
        {year <= 2020 && (
          <PieChart width={800} height={400}>
            <Pie
              dataKey="ratio"
              isAnimationActive={false}
              data={data}
              cx={300}
              cy={200}
              outerRadius={160}
              innerRadius={120} // 도넛 차트를 만들기 위한 설정
              fill="#8884d8"
              labelLine={false}
              label={({ city, percent }) =>
                `${city}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.city]} />
              ))}
            </Pie>
            <text
              x={300} // 중앙에 텍스트를 위치시키기 위한 x 위치 조정
              y={200} // 중앙에 텍스트를 위치시키기 위한 y 위치 조정
              dy={8} // 텍스트를 적절히 중앙에 위치시키기 위한 조정
              textAnchor="middle"
              fill="#8884d8"
              style={{ fontSize: "2em", fontWeight: "bold" }}
            >
              100%
            </text>
            <text
              style={{ fontSize: "23px", fontWeight: "bold" }}
              x={100}
              y={20}
              textAnchor="inner"
              dominantBaseline="middle"
            >
              {year} 전국 각 지역의 전기차 비율
            </text>
            <Tooltip content={renderTooltipItem} />
          </PieChart>
        )}
        <button
          onClick={() => {
            if (year > 2015) setYear(year - 1); // 2015는 이전 연도로 이동할 수 있는 가장 작은 연도로 가정합니다.
          }}
        >
          이전 연도
        </button>
        <button
          onClick={() => {
            if (year < 2020) setYear(year + 1);
          }}
        >
          다음 연도
        </button>
      </div>
    </ResponsiveContainer>
  );
}

export default EVPieChart;