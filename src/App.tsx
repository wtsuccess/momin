import AddTokensToWallet from "./components/AddTokensToWallet";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SocialIcons from "./components/SocialIcons";
import Presale from "./pages/Presale";

function App() {
  return (
    <div className="font-[poppinsbold] h-screen bg-gradient-to-r from-[#ff9800] to-[#ff7500] bg-transparent flex flex-col ">
      <Header />
      <main className="justify-center items-center grid grid-cols-1 flex-1 mx-5 md:grid-cols-3">
        <SocialIcons />
        <Presale />
        <AddTokensToWallet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
