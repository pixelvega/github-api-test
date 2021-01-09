import { Link } from 'react-router-dom';
import githubLogo from 'images/github-logo.svg';
import Searcher from 'components/blocks/Searcher/Searcher';
import './Header.scss';

export default function Header() {
  return (
    <header className="Header">
      <Link
        to="/"
      >
        <img src={githubLogo} alt="" />
      </Link>
      <Searcher />
    </header>
  )
}
