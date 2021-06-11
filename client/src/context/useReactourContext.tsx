import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import Tour from 'reactour';
import { useHistory } from 'react-router-dom';

interface IReactourContext {
  openTour: () => void;
}

export const ReactourContext = createContext<IReactourContext>({
  openTour: () => null,
});

export const ReactourProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const history = useHistory();
  const tourConfig = [
    {
      action: () => {
        history.push('/listings');
      },
      selector: '#product_tour_search_box',
      content: 'Start by giving a city and date',
    },
    {
      selector: 'div#product_tour_sitters',
      content: 'All the available dog sitters are listed here',
    },
    {
      action: () => {
        history.push('/profile/60ad24ea2c5adf3bccd916fa');
      },
      selector: '*',
      content: 'Select Drop In and Drop Off time, send request',
    },
    {
      selector: '#product_tour_logo',
      content: 'Show all the listings here',
    },
    {
      action: () => {
        history.push('/listings');
      },
      selector: '#product_tour_navigation_button',
      content: 'You can view all notifications here',
    },
    {
      selector: '#product_tour_sitter_button',
      content: 'You can view all the bookings here',
    },
    {
      selector: '#product_tour_message_button',
      content: 'Send and receive message here',
    },
    {
      selector: '#product_tour_profile_button',
      content: 'Edit profile here',
    },
  ];

  const openTour = useCallback(() => {
    setIsTourOpen(true);
  }, []);

  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, []);

  return (
    <ReactourContext.Provider value={{ openTour }}>
      {children}
      <Tour onRequestClose={closeTour} steps={tourConfig} isOpen={isTourOpen}></Tour>
    </ReactourContext.Provider>
  );
};

export function useReactour(): IReactourContext {
  return useContext(ReactourContext);
}
