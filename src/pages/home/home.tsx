import { useEffect, useState, useCallback } from 'react';
import { axiosInstance } from '@/utils/apiInstance';

import SearchBox from '@components/common/SearchBox';
import Banner from './components/Banner';
import InfoCard from './components/InfoCard ';
import Cards from './components/Cards';
import Banners from './components/Banners';

import { ApiResponse } from '@/types/home/apiResponse';

import '@/index.css';

function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/me/summary');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // console.log('useEffect 호출');
    getData();
  }, [getData]);

  return (
    <div>
      {data && (
        <>
          <SearchBox />
          <div className="mb-5">
            <ul className="flex w-full gap-5">
              {Banners.map((banner, idx) => (
                <Banner key={idx} {...banner} />
              ))}
            </ul>
          </div>
          <div>
            <ul className="grid grid-cols-3 gap-4 mb-5 h-96">
              {data &&
                Cards.map((card, idx) => (
                  <InfoCard
                    key={idx}
                    title={card.title}
                    mainInfo={card.getMainInfo(data)}
                    secondaryInfo={card.getSecondaryInfo?.(data)}
                    icon={card.icon}
                    bottomInfo={card.getBottomInfo(data)}
                    navigateTo={card.navigateTo}
                  />
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
