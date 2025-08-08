import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts';
import { Link } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [links, setLinks] = useState({});
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    getPosts(page)
      .then(({ data }) => {
        setPosts(data.data);
        setLinks(data.links);
        setMeta(data.meta);
        setError('');
      })
      .catch(() => {
        setError('Ошибка при загрузке постов');
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.last_page && newPage !== page) {
      setPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-0">Posts</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {isAuthenticated && (
          <Link to="/create" className="btn btn-success">
            + Create Post
          </Link>
        )}
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {posts.map(post => (
          <div className="col" key={post.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-truncate" style={{ flexGrow: 1 }}>
                  {post.content?.slice(0, 100) || post.body?.slice(0, 100)}...
                </p>
                <Link to={`/posts/${post.id}`} className="btn btn-primary mt-auto align-self-start">
                  Read More
                </Link>
              </div>
              <div className="card-footer text-muted small">
                Author: {post.user?.name || 'Unknown'} | {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${!links.prev ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={!links.prev}
            >
              Back
            </button>
          </li>

          {[...Array(meta.last_page)].map((_, i) => (
            <li
              key={i + 1}
              className={`page-item ${page === i + 1 ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${!links.next ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={!links.next}
            >
              Forward
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Posts;
