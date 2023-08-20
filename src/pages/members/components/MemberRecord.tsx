import { useState } from 'react';

interface RecordType {
  date: string;
  template: string;
}

const MemberRecord = () => {
  const [activeTab, setActiveTab] = useState('문진');

  const initialMujinRecord: RecordType = {
    date: '2023-08-11',
    template: '문진 템플릿',
  };

  const initialCheochiRecord: RecordType = {
    date: '2023-08-11',
    template: '처치 템플릿',
  };

  const [mujinRecords, setMujinRecords] = useState<RecordType[]>([initialMujinRecord]);
  const [cheochiRecords, setCheochiRecords] = useState<RecordType[]>([initialCheochiRecord]);

  const addNewRecord = () => {
    const newRecord: RecordType = {
      date: '2023-08-11',
      template: activeTab === '문진' ? '문진 템플릿' : '처치 템플릿',
    };

    if (activeTab === '문진') {
      setMujinRecords((prevRecords) => [...prevRecords, newRecord]);
    } else {
      setCheochiRecords((prevRecords) => [...prevRecords, newRecord]);
    }
  };

  return (
    <div className="p-5 bg-bg-100 ">
      <div>
        <div className="mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-3xl mr-5 ${activeTab === '문진' ? 'bg-primary-300 text-white' : 'bg-white'}`}
            onClick={() => setActiveTab('문진')}>
            문진
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-3xl ${activeTab === '처치' ? 'bg-primary-300 text-white' : 'bg-white'}`}
            onClick={() => setActiveTab('처치')}>
            처치
          </button>
        </div>

        {activeTab === '문진'
          ? mujinRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 my-1 bg-white rounded-md base-font">
                <div className="flex">
                  <p className="mr-5">{record.date}</p>
                  <p>{record.template}</p>
                </div>
              </div>
            ))
          : cheochiRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 my-1 bg-white rounded-md base-font">
                <div className="flex">
                  <p className="mr-5">{record.date}</p>
                  <p>{record.template}</p>
                </div>
              </div>
            ))}
      </div>

      <button
        className="fixed py-4 text-white px-7 bottom-40 right-20 bg-primary-300 rounded-3xl"
        onClick={addNewRecord}>
        + 추가하기
      </button>
    </div>
  );
};

export default MemberRecord;
