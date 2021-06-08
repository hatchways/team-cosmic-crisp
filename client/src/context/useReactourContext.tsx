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
      selector: '#product_tour_request_form',
      content: 'Select Drop In and Drop Off time, send request',
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
