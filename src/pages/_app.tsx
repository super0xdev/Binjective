import { type AppType } from "next/app";
import { api } from "~/lib/utils/api";
import "~/styles/globals.css";
import Layout from "~/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "~/context/WalletProvider";
import { ProtocolProvider } from "~/context/ProtocolProvider";
import CounterContextProvider from "~/context/CounterProvider";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WalletProvider>
      <CounterContextProvider>
        <ProtocolProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ProtocolProvider>
      </CounterContextProvider>
    </WalletProvider>
  );
};

export default api.withTRPC(MyApp);
