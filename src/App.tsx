import { useRecoilState } from 'recoil';
import { themeAtom } from './shared/state';

import './global.css'
import styles from "./App.module.css";
import { Routes } from './pages';

function App() {
  const [theme] = useRecoilState(themeAtom);

  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <main className={styles.pageContainer}>
        <Routes />
      </main>
    </div>
  )
}

export default App
