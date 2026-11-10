import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import QuickView from './QuickView';
import ToastNotification from './ToastNotification';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="main">
        <Outlet />
      </main>
      <Footer />
      <QuickView />
      <ToastNotification />
    </div>
  );
}