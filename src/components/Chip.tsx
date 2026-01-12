/**
 * OpenGov Chip Component
 *
 * Extended Chip component with additional color variants and styles
 * following OpenGov Capital Design System specifications.
 *
 * This component extends MUI's Chip with OpenGov-specific colors and variants:
 * - Extended colors: default, success, error, warning, inProgress, indigo, periwinkle, jade, port, rose, magenta, orange, terracotta
 * - Extended variants: filled, outlined, minimal, strong
 * - Extended sizes: small, medium, large
 *
 * @example
 * import { Chip } from './Chip';
 *
 * <Chip label="Label" color="success" variant="filled" size="medium" />
 */

import React from 'react';
import { Chip as MuiChip, styled } from '@mui/material';
import { capitalDesignTokens } from '@opengov/capital-mui-theme';

// Define MuiChipProps locally since it's not exported
interface MuiChipProps {
  label?: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLDivElement>) => void;
  deleteIcon?: React.ReactElement;
  icon?: React.ReactElement;
  avatar?: React.ReactElement;
  disabled?: boolean;
  [key: string]: any;
}

// Extended color types
export type ChipColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'inProgress'
  | 'indigo'
  | 'periwinkle'
  | 'jade'
  | 'port'
  | 'rose'
  | 'magenta'
  | 'orange'
  | 'terracotta';

// Extended variant types
export type ChipVariant = 'filled' | 'outlined' | 'minimal' | 'strong';

// Extended size types
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends Omit<MuiChipProps, 'color' | 'variant' | 'size'> {
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
}

// Color mappings for custom colors
const getColorStyles = (color: ChipColor, variant: ChipVariant, theme?: any) => {
  const colors = capitalDesignTokens.primitiveColors;

  // Safe color access with fallbacks
  const safeColor = (colorName: string, shade: number, fallback: string) => {
    try {
      return (colors as any)[colorName]?.[shade] || fallback;
    } catch {
      return fallback;
    }
  };

  // Define color mappings with safe access
  const colorMap: Record<ChipColor, Record<ChipVariant, any>> = {
    default: {
      filled: { bg: safeColor('grey', 200, '#e0e0e0'), text: safeColor('grey', 900, '#212121') },
      outlined: { border: safeColor('grey', 300, '#bdbdbd'), text: safeColor('grey', 900, '#212121'), bg: 'transparent' },
      minimal: { bg: safeColor('grey', 50, '#fafafa'), text: safeColor('grey', 900, '#212121') },
      strong: { bg: safeColor('grey', 800, '#424242'), text: safeColor('grey', 50, '#fafafa') },
    },
    primary: {
      filled: { bg: theme?.palette?.primary?.light || safeColor('blue', 100, '#bbdefb'), text: theme?.palette?.primary?.dark || safeColor('blue', 900, '#0d47a1') },
      outlined: { border: theme?.palette?.primary?.main || safeColor('blue', 500, '#2196f3'), text: theme?.palette?.primary?.dark || safeColor('blue', 900, '#0d47a1'), bg: 'transparent' },
      minimal: { bg: theme?.palette?.primary?.light || safeColor('blue', 50, '#e3f2fd'), text: theme?.palette?.primary?.dark || safeColor('blue', 900, '#0d47a1') },
      strong: { bg: theme?.palette?.primary?.main || safeColor('blue', 700, '#1976d2'), text: theme?.palette?.primary?.contrastText || '#fff' },
    },
    success: {
      filled: { bg: safeColor('green', 100, '#c8e6c9'), text: safeColor('green', 900, '#1b5e20') },
      outlined: { border: safeColor('green', 500, '#4caf50'), text: safeColor('green', 900, '#1b5e20'), bg: 'transparent' },
      minimal: { bg: safeColor('green', 50, '#e8f5e9'), text: safeColor('green', 900, '#1b5e20') },
      strong: { bg: safeColor('green', 700, '#388e3c'), text: '#fff' },
    },
    error: {
      filled: { bg: safeColor('red', 100, '#ffcdd2'), text: safeColor('red', 900, '#b71c1c') },
      outlined: { border: safeColor('red', 500, '#f44336'), text: safeColor('red', 900, '#b71c1c'), bg: 'transparent' },
      minimal: { bg: safeColor('red', 50, '#ffebee'), text: safeColor('red', 900, '#b71c1c') },
      strong: { bg: safeColor('red', 700, '#d32f2f'), text: '#fff' },
    },
    warning: {
      filled: { bg: safeColor('orange', 100, '#ffe0b2'), text: safeColor('orange', 900, '#e65100') },
      outlined: { border: safeColor('orange', 500, '#ff9800'), text: safeColor('orange', 900, '#e65100'), bg: 'transparent' },
      minimal: { bg: safeColor('orange', 50, '#fff3e0'), text: safeColor('orange', 900, '#e65100') },
      strong: { bg: safeColor('orange', 700, '#f57c00'), text: '#fff' },
    },
    inProgress: {
      filled: { bg: safeColor('blue', 100, '#bbdefb'), text: safeColor('blue', 900, '#0d47a1') },
      outlined: { border: safeColor('blue', 500, '#2196f3'), text: safeColor('blue', 900, '#0d47a1'), bg: 'transparent' },
      minimal: { bg: safeColor('blue', 50, '#e3f2fd'), text: safeColor('blue', 900, '#0d47a1') },
      strong: { bg: safeColor('blue', 700, '#1976d2'), text: '#fff' },
    },
    indigo: {
      filled: { bg: safeColor('indigo', 100, '#c5cae9'), text: safeColor('indigo', 900, '#1a237e') },
      outlined: { border: safeColor('indigo', 500, '#3f51b5'), text: safeColor('indigo', 900, '#1a237e'), bg: 'transparent' },
      minimal: { bg: safeColor('indigo', 50, '#e8eaf6'), text: safeColor('indigo', 900, '#1a237e') },
      strong: { bg: safeColor('indigo', 700, '#303f9f'), text: '#fff' },
    },
    periwinkle: {
      filled: { bg: safeColor('periwinkle', 100, '#d1c4e9'), text: safeColor('periwinkle', 900, '#4a148c') },
      outlined: { border: safeColor('periwinkle', 500, '#9c27b0'), text: safeColor('periwinkle', 900, '#4a148c'), bg: 'transparent' },
      minimal: { bg: safeColor('periwinkle', 50, '#f3e5f5'), text: safeColor('periwinkle', 900, '#4a148c') },
      strong: { bg: safeColor('periwinkle', 700, '#7b1fa2'), text: '#fff' },
    },
    jade: {
      filled: { bg: safeColor('jade', 100, '#b2dfdb'), text: safeColor('jade', 900, '#004d40') },
      outlined: { border: safeColor('jade', 500, '#009688'), text: safeColor('jade', 900, '#004d40'), bg: 'transparent' },
      minimal: { bg: safeColor('jade', 50, '#e0f2f1'), text: safeColor('jade', 900, '#004d40') },
      strong: { bg: safeColor('jade', 700, '#00796b'), text: '#fff' },
    },
    port: {
      filled: { bg: safeColor('port', 100, '#b39ddb'), text: safeColor('port', 900, '#311b92') },
      outlined: { border: safeColor('port', 500, '#673ab7'), text: safeColor('port', 900, '#311b92'), bg: 'transparent' },
      minimal: { bg: safeColor('port', 50, '#ede7f6'), text: safeColor('port', 900, '#311b92') },
      strong: { bg: safeColor('port', 700, '#512da8'), text: '#fff' },
    },
    rose: {
      filled: { bg: safeColor('rose', 100, '#f8bbd0'), text: safeColor('rose', 900, '#880e4f') },
      outlined: { border: safeColor('rose', 500, '#e91e63'), text: safeColor('rose', 900, '#880e4f'), bg: 'transparent' },
      minimal: { bg: safeColor('rose', 50, '#fce4ec'), text: safeColor('rose', 900, '#880e4f') },
      strong: { bg: safeColor('rose', 700, '#c2185b'), text: '#fff' },
    },
    magenta: {
      filled: { bg: safeColor('magenta', 100, '#f48fb1'), text: safeColor('magenta', 900, '#ad1457') },
      outlined: { border: safeColor('magenta', 500, '#e91e63'), text: safeColor('magenta', 900, '#ad1457'), bg: 'transparent' },
      minimal: { bg: safeColor('magenta', 50, '#fce4ec'), text: safeColor('magenta', 900, '#ad1457') },
      strong: { bg: safeColor('magenta', 700, '#c2185b'), text: '#fff' },
    },
    orange: {
      filled: { bg: safeColor('orange', 100, '#ffe0b2'), text: safeColor('orange', 900, '#e65100') },
      outlined: { border: safeColor('orange', 500, '#ff9800'), text: safeColor('orange', 900, '#e65100'), bg: 'transparent' },
      minimal: { bg: safeColor('orange', 50, '#fff3e0'), text: safeColor('orange', 900, '#e65100') },
      strong: { bg: safeColor('orange', 700, '#f57c00'), text: '#fff' },
    },
    terracotta: {
      filled: { bg: safeColor('terracotta', 100, '#ffccbc'), text: safeColor('terracotta', 900, '#bf360c') },
      outlined: { border: safeColor('terracotta', 500, '#ff5722'), text: safeColor('terracotta', 900, '#bf360c'), bg: 'transparent' },
      minimal: { bg: safeColor('terracotta', 50, '#fbe9e7'), text: safeColor('terracotta', 900, '#bf360c') },
      strong: { bg: safeColor('terracotta', 700, '#e64a19'), text: '#fff' },
    },
  };

  return colorMap[color]?.[variant] || colorMap.default[variant];
};

// Styled chip with custom colors
const StyledChip = styled(MuiChip, {
  shouldForwardProp: (prop) => prop !== 'customColor' && prop !== 'customVariant' && prop !== 'customSize',
})<{ customColor: ChipColor; customVariant: ChipVariant; customSize: ChipSize }>(
  ({ customColor, customVariant, customSize, theme }) => {
    const colorStyles = getColorStyles(customColor, customVariant, theme);

    // Size mappings
    const sizeStyles = {
      small: {
        height: 24,
        fontSize: '0.75rem',
        '& .MuiChip-label': {
          paddingLeft: 8,
          paddingRight: 8,
        },
        '& .MuiChip-icon': {
          fontSize: '1rem',
          marginLeft: 6,
        },
        '& .MuiChip-deleteIcon': {
          fontSize: '1rem',
          marginRight: 6,
        },
      },
      medium: {
        height: 32,
        fontSize: '0.875rem',
      },
      large: {
        height: 40,
        fontSize: '1rem',
        '& .MuiChip-label': {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    };

    const styles: any = {
      ...sizeStyles[customSize],
    };

    // Apply variant-specific styles
    if (customVariant === 'outlined') {
      styles.backgroundColor = colorStyles.bg;
      styles.color = colorStyles.text;
      styles.border = `1px solid ${colorStyles.border}`;
      styles['&:hover'] = {
        backgroundColor: colorStyles.bg === 'transparent'
          ? 'rgba(0, 0, 0, 0.04)'
          : colorStyles.bg,
      };
    } else if (customVariant === 'minimal') {
      styles.backgroundColor = colorStyles.bg;
      styles.color = colorStyles.text;
      styles.border = 'none';
    } else if (customVariant === 'strong') {
      styles.backgroundColor = colorStyles.bg;
      styles.color = colorStyles.text;
      styles.border = 'none';
      styles.fontWeight = 600;
    } else {
      // filled
      styles.backgroundColor = colorStyles.bg;
      styles.color = colorStyles.text;
      styles.border = 'none';
    }

    return styles;
  }
);

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ color = 'default', variant = 'filled', size = 'medium', ...props }, ref) => {
    return (
      <StyledChip
        ref={ref}
        customColor={color}
        customVariant={variant}
        customSize={size}
        {...props}
      />
    );
  }
);

Chip.displayName = 'Chip';
