import { useRef } from 'react';
import { StyledHeader } from './styledHeader';
import { Transition } from 'react-transition-group';
import Title from '../Title';
import UserMenu from '../UserMenu';

const Header = ({ isIn }) => {
  const ref = useRef(null);
  return (
    <>
      <StyledHeader>
        <div className="container">
          <nav>
            <Transition in={isIn} timeout={200} nodeRef={ref}>
              {state => (
                <>
                  <Title
                    ref={ref}
                    title="My Phonebook App"
                    fontSize={30}
                    padding={20}
                    tagName="h1"
                    className={`header__title ${state}`}
                  />
                  <UserMenu />
                </>
              )}
            </Transition>
          </nav>
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;
