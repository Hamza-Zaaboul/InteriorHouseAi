
import { AuthContextProvider } from "@/store/AuthNavContext";
import { MyCoinsProvider } from "@/store/MyCoinsContext";

export default function Layout({ children }) {
  return (
    <>
      <AuthContextProvider>
        <MyCoinsProvider>
          <div className="h-full">{children}</div>
        </MyCoinsProvider>
      </AuthContextProvider>
    </>
  );
}
