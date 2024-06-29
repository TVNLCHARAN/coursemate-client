import { useEffect } from 'react';

const useClickSound = (soundFile, excludedSelectors = []) => {
  useEffect(() => {
    const clickSound = new Audio(soundFile);

    const handleClick = (event) => {
      if (excludedSelectors.some(selector => event.target.closest(selector))) {
        return;
      }
      clickSound.play();
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [soundFile, excludedSelectors]);
};

export default useClickSound;
