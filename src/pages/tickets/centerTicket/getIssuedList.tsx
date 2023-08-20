import { axiosInstance } from '@/utils/apiInstance';
import { useQuery } from 'react-query';
import SubHeader from '@components/common/SubHeader/SubHeader';
import { IssuedTicketListData } from '@/types/tickets/tickets';
import { useParams } from 'react-router-dom';

const IssuedListPage = () => {
  const { ticketId } = useParams();

  const fetchIssuedList = async () => {
    const res = await axiosInstance.get(`/tickets/${ticketId}/issued-tickets`);
    return res.data.datas;
  };

  const {
    data: issuedList,
    isLoading,
    isError,
  } = useQuery<IssuedTicketListData[] | Array<any>>(['issuedList', ticketId], fetchIssuedList);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <SubHeader title="부여내역" />
      {issuedList && (
        <main>
          <h1 className="my-4 small-title">총 {issuedList.length}건</h1>
          {issuedList.map((item) => (
            <ul key={item.id} className="mt-8">
              <li className="flex items-center gap-8 py-2 border-b border-line-200">
                <span className="font-bold">{item.owners[0].name}</span>
                <span>{item.owners[0].phone}</span>
                <span>{item.privateTutor.name}</span>
                <span>잔여 {item.remainingTimes}회</span>
                <span>
                  유효기간 : {item.startAt.replaceAll('-', '/')} - {item.endAt.replaceAll('-', '/')}
                </span>
              </li>
            </ul>
          ))}
        </main>
      )}
    </>
  );
};
export default IssuedListPage;
