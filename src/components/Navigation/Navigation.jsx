import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => (
  <div className={s.navContainer}>
    <nav className={s.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? s.active : s.link)}>Головна</NavLink>
        <NavLink to="/movies" className={({ isActive }) => (isActive ? s.active : s.link)}>Фільми</NavLink>
    </nav>
  </div>
);

export default Navigation;
