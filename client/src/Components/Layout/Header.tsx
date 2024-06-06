import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
      <nav className="w-full h-12 text-white bg-slate-800 ">
          <ul className="flex flex-row justify-start items-center space-x-10">
              <Link to="/Home"><li>Unread Pile</li></Link>
              <Link to="/About"><li>about</li></Link>
              <li>extra</li>
              <li>extra</li>
          </ul>
    </nav>
  )
}

export default Header;

