import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import { User, Member } from '../../types/search/search';
import { ReactComponent as Search } from '../../assets/icons/Search.svg';

interface SearchResult {
  searchParam: {
    query: string;
    resources: string[];
  };
  members: Member[];
  users: User[];
  message: string;
}

function SearchBox() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const onSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지

    if (!query) return;

    try {
      const response = await axiosInstance.get<SearchResult>(`/search?query=${query}`);
      if (response.data && response.data.members && response.data.users) {
        navigate('/search-results', { state: { members: response.data.members, users: response.data.users } });
      } else {
        console.error('No data received');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex justify-end my-4">
      <form onSubmit={onSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="회원/멤버 이름, 연락처로 검색하세요"
          className="p-2 mr-2 border rounded-lg min-w-[300px]"
        />
        <button type="submit">
          <Search />
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
