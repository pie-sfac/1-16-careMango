import React from 'react';

type Props = {
  totalEvents: number;
  cancelledEvents: number;
};

const Statistics: React.FC<Props> = ({ totalEvents, cancelledEvents }) => {
  const cancellationRate = ((cancelledEvents / totalEvents) * 100).toFixed(2); // 소수점 둘째 자리까지 표시

  return (
    <div className="flex items-center gap-3">
      {/* <span>이번 달 : </span> */}
      {/* <span className="font-bold">박사장</span> */}
      <span>총 일정 : </span>
      <span className="font-bold">{totalEvents}건</span>
      <span>취소 일정 : </span>
      <span className="font-bold text-red-600">{cancelledEvents}건</span>
      <span>취소율 : </span>
      <span className="font-bold text-red-600">{cancellationRate}%</span>
    </div>
  );
};

export default Statistics;
