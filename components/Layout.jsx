import { AuthContextNavProvider } from "@/store/AuthNavContext";
import { MyCoinsProvider } from "@/store/MyCoinsContextNav";

export default function Layout({ children }) {
  return (
    <>
      <AuthContextNavProvider>
        <MyCoinsProvider>
          <div className="h-full">{children}</div>
        </MyCoinsProvider>
      </AuthContextNavProvider>
    </>
  );
}
