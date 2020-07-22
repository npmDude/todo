import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Theme, useAppContext } from 'context/App';
import React from 'react';

type ThemeButtonProps = {
  className?: string;
};

const ThemeButton = ({ className }: ThemeButtonProps) => {
  const { themeType, setTheme } = useAppContext();

  const handleThemeButtonClick = () => {
    if (themeType === Theme.LIGHT) {
      setTheme(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
    }
  };

  return (
    <Tooltip title="Change Theme">
      <IconButton
        className={className}
        size="medium"
        color="primary"
        aria-label="Change theme"
        onClick={handleThemeButtonClick}
      >
        <Brightness4Icon />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeButton;