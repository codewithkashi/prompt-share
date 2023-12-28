import "@styles/globals.css";
import { ContextProvider } from "@components/Clients";
import Nav from "@components/Nav";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <ContextProvider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </ContextProvider>
    </body>
  </html>
);

export default RootLayout;
