import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Service } from './pages/Service';
import { Register } from './pages/Register'; 
import { Login } from './pages/Login'; 
import { Logout } from './pages/Logout';
import { Navbar } from './components/Navbar';
import { Error } from './pages/Error';
import { AdminUsers } from './pages/admin-users';
import { AdminContacts } from './pages/admin-contacts';
import { AdminLayout } from './components/layouts/admin-layout';
import { Footer } from './components/Footer/Footer';
import { AdminUpdate } from './pages/admin-update';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
