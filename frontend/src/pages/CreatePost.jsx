import PostForm from './PostForm';
import { create } from '../api/posts';

export default function CreatePost() {
  const handleSubmit = (data) => create(data);

  return (
    <div className="container mt-4">
      <h2>Создать пост</h2>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
