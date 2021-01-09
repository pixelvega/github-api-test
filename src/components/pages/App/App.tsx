import Header from 'components/blocks/Header/Header'
import './App.scss';
import { SearcherContextProvider } from 'context/SearcherContext';

interface Props {
  children: React.ReactNode
}

export default function App({ children }: Props) {

  return (
    <div className="App">
      <SearcherContextProvider>
        <Header />
        <main>
          {children}
        </main>
      </SearcherContextProvider>
    </div>
  );
}
