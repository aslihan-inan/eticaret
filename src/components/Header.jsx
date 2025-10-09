import { useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="flex justify-between items-center p-4 shadow">
      <Link to="/" className="text-xl font-bold">
        E-Ticaret
      </Link>
      {user ? (
        <div className="flex items-center space-x-2">
          <Gravatar email={user.email} size={32} className="rounded-full" />
          <span>{user.email}</span>
        </div>
      ) : (
        <Link to="/login">Giriş Yap</Link>
      )}
    </header>
  );
}
