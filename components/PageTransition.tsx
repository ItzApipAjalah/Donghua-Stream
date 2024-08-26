import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  location: any;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, location }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames="page"
      >
        <div className="page-container">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
