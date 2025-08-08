import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { register } from '../api/user';


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/profile');
    }
  }, [navigate])

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const response = await register(form);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/posts');

  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="w-100 card p-4 shadow-sm" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Регистрация</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Имя</label>
            <input type="text" name="name" className="form-control" required value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Registre</button>
        </form>
        <Link to="/login" className="btn btn-outline-primary mb-3 d-inline-flex align-items-center mt-3">Already have an account?</Link>
      </div>
    </div>
  );
}
