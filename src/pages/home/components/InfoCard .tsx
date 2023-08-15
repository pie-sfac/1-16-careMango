import React from 'react';

interface InfoCardProps {
  title: string;
  mainInfo: number | string;
  secondaryInfo?: string;
  icon?: React.ReactNode;
  bottomInfo: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, mainInfo, secondaryInfo, icon, bottomInfo }) => (
  <li className="h-full">
    <span className="text-xl">{title}</span>
    <div className="h-full p-3 mt-3 rounded-2xl card_wrapper bg-slate-200">
      <div className="relative h-full card">
        <div className="card_upper">
          <span className="font-bold">{mainInfo}</span>
          {secondaryInfo && <br />}
          {secondaryInfo && <span>{secondaryInfo}</span>}
          {icon && <div className="absolute top-0 right-0 p-2 bg-white rounded-full">{icon}</div>}
        </div>
        <div className="absolute bottom-0 right-0 card_down">
          <span className="text-2xl font-extrabold text-primary-700">{bottomInfo}</span>
        </div>
      </div>
    </div>
  </li>
);

export default InfoCard;
