import { useNavigate } from 'react-router-dom';
import TicketList from '@pages/tickets/components/TicketList';

const CenterTicketPage = () => {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate(`/tickets/center/new`);
  };

  return (
    <>
      <section className="flex items-center justify-between mt-4">
        <h1 className="main-title">센터 수강권</h1>
        <button type="button" onClick={onClickAdd} className="px-8 py-3 text-white rounded bg-primary-500">
          + 수강권 추가
        </button>
      </section>
      <TicketList tab />
    </>
  );
};
export default CenterTicketPage;
