import { colors } from './colors';
export const semanticColors = {
    background: {
        primary: colors.neutral[50],
        secondary: colors.neutral[100],
        tertiary: colors.neutral[200],
        inverse: colors.neutral[900]
    },
    button: {
        primary: {
            background: colors.coral[500],
            hover: colors.coral[600],
            active: colors.coral[700],
            text: colors.white
        },
        secondary: {
            background: colors.neutral[200],
            hover: colors.neutral[300],
            active: colors.neutral[400],
            text: colors.neutral[900]
        },
        tertiary: {
            background: 'transparent',
            hover: colors.neutral[100],
            active: colors.neutral[200],
            text: colors.coral[500]
        },
        danger: {
            background: colors.error,
            hover: '#C13C30',
            active: '#A73329',
            text: colors.white
        },
        disabled: {
            background: colors.neutral[200],
            text: colors.text.tertiary
        }
    },
    border: {
        light: colors.neutral[200],
        focus: colors.coral[500],
        error: colors.error
    },
    status: {
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info
    },
    travel: {
        primary: colors.teal[500],
        accent: colors.coral[500]
    },
    beauty: {
        primary: colors.blush[500],
        accent: colors.coral[500]
    },
    wellness: {
        primary: colors.coral[500],
        accent: colors.teal[500]
    }
};
//# sourceMappingURL=semanticColors.js.map