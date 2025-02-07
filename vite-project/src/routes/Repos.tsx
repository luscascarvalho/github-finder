import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Repos = () => {
  const { username } = useParams<{ username: string }>(); // Pegando o nome de usuário da URL
  const [repos, setRepos] = useState<any[]>([]); // Estado para armazenar os repositórios
  const [error, setError] = useState(false); // Estado para controlar erros
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!res.ok) throw new Error("Erro ao buscar repositórios");
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os repositórios.</p>;

  return (
    <div>
      <h2>Repositórios de {username}</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repos;