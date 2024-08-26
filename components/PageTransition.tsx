import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  location: any;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, location }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    // Attach event listeners to start/stop loading animation
    location.events.on('routeChangeStart', handleStart);
    location.events.on('routeChangeComplete', handleComplete);
    location.events.on('routeChangeError', handleComplete);

    return () => {
      location.events.off('routeChangeStart', handleStart);
      location.events.off('routeChangeComplete', handleComplete);
      location.events.off('routeChangeError', handleComplete);
    };
  }, [location]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader">Loading...</div>
        </div>
      )}
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="page"
        >
          <div className={`page-container ${loading ? 'pointer-events-none' : ''}`}>
            {children}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default PageTransition;
