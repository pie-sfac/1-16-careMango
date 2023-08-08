import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import { User, Member } from '../../types/search/search';

function SearchResults() {
  const location = useLocation();
  const state = location.state as { query: string } | undefined;

  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state && state.query) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/search?query=${state.query}`);
          setMembers(response.data.members);
          setUsers(response.data.users);
          setLoading(false);
        } catch (err) {
          setError('Error fetching search results');
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">검색 결과</h1>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Members</h2>
        <ul className="bg-gray-100 p-4 rounded-md">
          {members.map((member) => (
            <li key={member.id} className="border-b last:border-b-0 py-2">
              {member.name} - {member.phone}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <ul className="bg-gray-100 p-4 rounded-md">
          {users.map((user) => (
            <li key={user.id} className="border-b last:border-b-0 py-2">
              {user.name} - {user.phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;
