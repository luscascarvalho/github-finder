import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import styles from "./Repos.module.css";

const Repos = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const repos = useLoaderData() as any[];

  if (!username) {
    return <p>Erro: Nenhum usuário fornecido.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>GitHub Finder</h1>
      <h2 className={styles.subheading}>Repositórios de {username}</h2>
      <button className={styles.button} onClick={() => navigate(-1)}>
        Voltar
      </button>
      <ul className={styles.repoList}>
        {repos.map((repo) => (
          <li key={repo.id} className={styles.repoItem}>
            <h3 className={styles.repoName}>{repo.name}</h3>
            {repo.description && (
              <p className={styles.repoDescription}>{repo.description}</p>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoLink}
            >
              Ver no GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repos;