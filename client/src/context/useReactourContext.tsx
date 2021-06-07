import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import Tour from 'reactour';

interface IReactourContext {
  openTour: () => void;
}

export const ReactourContext = createContext<IReactourContext>({
  openTour: () => null,
});

const tourConfig = [
  {
    selector: 'root',
    content: 'First Test',
  },
];

export const ReactourProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

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

export function useSnackBar(): IReactourContext {
  return useContext(ReactourContext);
}
