function Legend() {
  return (
    <div className="flex justify-around mb-1">
      <span className="flex items-center gap-1">
        <div className="w-3 h-3 bg-blue-500" /> 출석
      </span>
      <span className="flex items-center gap-1">
        <div className="w-3 h-3 bg-red-500" /> 결석
      </span>
      <span className="flex items-center gap-1">
        <div className="w-3 h-3 bg-gray-500" /> 예약
      </span>
      <span className="flex items-center gap-1">
        <div className="w-3 h-3 bg-transparent border border-green-500" /> 상담
      </span>
    </div>
  );
}

export default Legend;
