import MainPage from '../Component/MainPage/MainPage.tsx';

class AppData {
  OffersCount: number = 0;
}

function App({OffersCount}: AppData): React.ReactElement {
  return (
    <MainPage OffersCount={OffersCount}/>
  );
}

export default App;
