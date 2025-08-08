import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import { getPost, update } from '../api/posts';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id).then(({ data }) => {
      setPost(data.data);
    });
  }, [id]);

  const handleSubmit = (data) => {
    return update(id, data).then(() => {
      navigate(`/posts/${id}`);
    });
  };

  if (!post) return <p>Загрузка...</p>;

  return (
    <div className="container mt-4">
      <h2>Редактировать пост</h2>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
}
