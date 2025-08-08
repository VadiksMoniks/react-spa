import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/user';

export default function Settings() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password.trim()) {
      setError('Введите новый пароль');
      return;
    }

    try {
      await resetPassword({ password });
      setSuccess('Пароль успешно изменён');
      setPassword('');
    } catch (err) {
      setError('Ошибка при изменении пароля');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}

        <div className="mb-3">
          <label className="form-label">Change password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-warning" type="submit">Save changes</button>
      </form>
    </div>
  );
}
