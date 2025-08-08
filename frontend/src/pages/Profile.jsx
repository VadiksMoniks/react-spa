import { profile } from '../api/user';
import { logout } from '../api/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then(res => {        
        console.log(res);
        setUserData(res.data.user);
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка при загрузке профиля');
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate])

  const handleLogout = () => {
    logout()
      .then(res => {
        console.log(res.data.message);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка при выходе из профиля');
      });
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
