import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@shopify/polaris';
import { HomeIcon, ProductIcon, SettingsIcon } from '@shopify/polaris-icons';
import Path from '../utils/path';

export const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            onClick: () => navigate(Path.DASHBOARD),
          },
          {
            label: 'Products',
            icon: ProductIcon,
            onClick: () => navigate(Path.PRODUCTS),
          },
        ]}
      />
      <Navigation.Section
        items={[
          {
            label: 'Settings',
            icon: SettingsIcon,
            onClick: () => navigate(Path.SETTINGS),
          },
        ]}
        separator
      />
    </Navigation>
  );
};
