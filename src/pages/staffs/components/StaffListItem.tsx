import { useNavigate } from 'react-router-dom';
import { StaffsData } from '@/types/staffs/staffs';
import { ReactComponent as Profile24 } from '@/assets/icons/Profile_24.svg';

type StaffsType = StaffsData['datas'][number];

const StaffListItem = ({ staffs }: { staffs: StaffsType }) => {
  const navigate = useNavigate();
  const goStaffDetail = () => navigate(`/staffs/${staffs.id}`);

  return (
    <button type="button" onClick={goStaffDetail}>
      <div key={staffs.id} className="flex items-center justify-between p-3 my-1 bg-white rounded-md base-font">
        <div className="flex">
          <Profile24 />
          <p className="flex items-center justify-center ml-4 font-bold">{staffs.name}</p>
        </div>
        <div className="flex mr-96">
          <p className="mr-5">{staffs.phone}</p>
          <p className="mr-5">{staffs.memberCount}</p>
          <p className="mr-5">{staffs.memo}</p>
        </div>
      </div>
    </button>
  );
};

export default StaffListItem;
