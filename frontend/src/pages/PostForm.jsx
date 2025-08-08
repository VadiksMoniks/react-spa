import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostForm({ initialData = null, onSubmit }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate])

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !content.trim()) {
      setError('Все поля обязательны');
      return;
    }

    onSubmit({ title, content, user_id: storedUser.id })
      .then(() => {
        setSuccess('Успешно сохранено');
        navigate('/posts');
      })
      .catch((error) => {
        console.error('Ошибка при сохранении:', error);
        setError('Ошибка при сохранении');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}

      <div className="mb-3">
        <label className="form-label">Заголовок</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Содержание</label>
        <textarea
          className="form-control"
          rows="4"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData ? 'Обновить' : 'Создать'}
      </button>
    </form>
  );
}
