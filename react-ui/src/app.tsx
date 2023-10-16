import { Footer, Header, Main } from "./sectioning";
import { setClientEnvironment } from "./utils/utils";

const App = (): JSX.Element => {
  (window as any).CLIENT_ENV = setClientEnvironment();
  
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
