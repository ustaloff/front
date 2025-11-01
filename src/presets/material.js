import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';

const Preset = definePreset(Material, {
    extend: {
        brand: {
            accent: {
                0: '#ffff01',
                50: '#fefee6',
                100: '#fefecd',
                200: '#fcfc9c',
                300: '#ffff66',
                400: '#ffff33',
                500: '#ffff00',
                600: '#e5e600',
                700: '#c2c200',
                800: '#959504',
                900: '#6b6b06',
                950: '#474706',
            },
            extra: {
                0: '#0cbd5e',
                50: '#e8fdf1',
                100: '#d0fbe4',
                200: '#a1f7c9',
                300: '#6ff6ae',
                400: '#3ff392',
                500: '#0ff077',
                600: '#0ed86b',
                700: '#0cb65b',
                800: '#0d8c48',
                900: '#0c6535',
                950: '#0a4324',
            },
            surface: {
                0: '#ffffff',
                50: '#ecfdf5',
                100: '#d1fae5',
                200: '#a7f3d0',
                300: '#6ee7b7',
                400: '#34d399',
                500: '#10b981',
                600: '#059669',
                700: '#047857',
                800: '#065f46',
                900: '#064e3b',
                950: '#022c22'
            },
        },
    },
    semantic: {
        primary: {
            50: '{brand.extra.50}',
            100: '{brand.extra.100}',
            200: '{brand.extra.200}',
            300: '{brand.extra.300}',
            400: '{brand.extra.400}',
            500: '{brand.extra.500}',
            600: '{brand.extra.600}',
            700: '{brand.extra.700}',
            800: '{brand.extra.800}',
            900: '{brand.extra.900}',
            950: '{brand.extra.950}'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '{brand.surface.0}',
                    50: '{brand.surface.50}',
                    100: '{brand.surface.100}',
                    200: '{brand.surface.200}',
                    300: '{brand.surface.300}',
                    400: '{brand.surface.400}',
                    500: '{brand.surface.500}',
                    600: '{brand.surface.600}',
                    700: '{brand.surface.700}',
                    800: '{brand.surface.800}',
                    900: '{brand.surface.900}',
                    950: '{brand.surface.950}'
                },
                primary: {
                    color: '{primary.500}',
                    inverseColor: '{brand.surface.0}',
                    hoverColor: '{primary.600}',
                    activeColor: '{primary.700}'
                },
                body: {
                    background: '{brand.surface.100}',
                    textColor: '{brand.surface.950}',
                },
                header: {
                    background: '{brand.surface.950}',
                    textColor: '{brand.surface.0}',
                },
                footer: {
                    background: '{brand.surface.900}',
                    textColor: '{brand.surface.0}',
                },
                sidebar: {
                    background: '{brand.surface.800}',
                    textColor: '{brand.surface.0}',
                },
            },
            dark: {
                surface: {
                    0: '{brand.surface.0}',
                    50: '{brand.surface.50}',
                    100: '{brand.surface.100}',
                    200: '{brand.surface.200}',
                    300: '{brand.surface.300}',
                    400: '{brand.surface.400}',
                    500: '{brand.surface.500}',
                    600: '{brand.surface.600}',
                    700: '{brand.surface.700}',
                    800: '{brand.surface.800}',
                    900: '{brand.surface.900}',
                    950: '{brand.surface.950}'
                },
                primary: {
                    color: '{primary.400}',
                    inverseColor: '{brand.surface.900}',
                    hoverColor: '{primary.300}',
                    activeColor: '{primary.200}'
                },
                body: {
                    background: '{brand.surface.950}',
                    textColor: '{brand.surface.0}',
                },
                header: {
                    background: '{brand.surface.900}',
                    textColor: '{brand.surface.0}',
                },
                footer: {
                    background: '{brand.surface.800}',
                    textColor: '{brand.surface.0}',
                },
                sidebar: {
                    background: '{brand.surface.700}',
                    textColor: '{brand.surface.0}',
                },
            },
        }
    }
});

export default Preset
