import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPost, deletePost, update } from '../api/posts'; // Добавь функцию удаления в api/posts.js

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setLoading(true);
    getPost(id)
      .then(({ data }) => {
        setPost(data.data);
      })
      .catch(() => {
        setPost(null);
        setError('Пост не найден');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот пост?')) return;

    deletePost(id)
    .then(() => {
      navigate('/posts');
    })
    .catch(() => {
      alert('Ошибка при удалении поста');
    });
  };

  if (loading) return <p className="text-center my-4">Загрузка...</p>;
  if (error) return <p className="text-center my-4 text-danger">{error}</p>;
  if (!post) return null;

  const canEditOrDelete = storedUser && post.user && storedUser.id === post.user.id;

  return (
    <div className="container my-4">
      <Link to="/posts" className="btn btn-outline-primary mb-3 d-inline-flex align-items-center">
        {}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left me-2"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 1-.5.5H3.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"
          />
        </svg>
        Back to posts
      </Link>

      <h2 className="mb-3">{post.title}</h2>
      <p className="text-muted small">
        Author: {post.user?.name || 'Unknown'} | {new Date(post.created_at).toLocaleString()}
      </p>
      <div className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>
        {post.content || post.body}
      </div>

      {canEditOrDelete && (
        <div className="d-flex gap-2">
          <Link to={`/posts/edit/${id}`} className="btn btn-warning">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
