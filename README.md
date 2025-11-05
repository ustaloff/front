# CodeCraftPro Frontend

Modern Vue.js 3 frontend application built with cutting-edge technologies and best practices for professional development workflows.

## Technology Stack

- **Vue.js 3.5+** with Composition API
- **Vite 7.0+** for lightning-fast builds
- **PrimeVue 4.4+** UI component library
- **Pinia 3.0+** for state management
- **Vue Router 4.5+** for routing
- **Axios 1.10+** for HTTP requests
- **SCSS** with design tokens

## Core Features

### Professional Development Platform
- **Modular Architecture**: Extensible component system for rapid development
- **Real-time Collaboration**: WebSocket integration for team workflows
- **Advanced UI Components**: Professional-grade interface elements
- **Theme System**: Dark/light themes with custom design tokens

### Developer Experience
- **Hot Module Replacement**: Instant development feedback
- **TypeScript Ready**: Type-safe development environment
- **Component Documentation**: Integrated Storybook support
- **Testing Framework**: Comprehensive testing utilities

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Commands

```bash
# Clean build artifacts and cache
npm run clean

# Check for outdated packages
npm run deps:check

# Update dependencies
npm run deps:update

# Run tests
npm run test:simple
npm run test:manual

# Type checking
npm run type-check

# Lint and format code
npm run lint
npm run format
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Header, Sidebar, Footer)
│   ├── pages/           # Page components and views
│   └── ui/              # Reusable UI components
├── composables/         # Vue composition functions
├── stores/              # Pinia state stores
├── router/              # Vue Router configuration
├── assets/              # SCSS files, design tokens, and static assets
├── services/            # API services and utilities
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── test/                # Testing utilities and fixtures
```

## Development Guidelines

### Code Standards
- **Composition API**: Use `<script setup>` syntax
- **Component Naming**: PascalCase for components, camelCase for composables
- **Type Safety**: Leverage TypeScript for better development experience
- **Design System**: Follow established design tokens and patterns

### Architecture Patterns
- **Composables**: Extract reusable logic into composition functions
- **Store Management**: Use Pinia for complex state management
- **Component Structure**: Maintain clear separation of concerns
- **API Integration**: Centralized service layer for backend communication

### Styling Approach
- **SCSS with Design Tokens**: Consistent theming system
- **Component-Scoped Styles**: Isolated styling per component
- **Responsive Design**: Mobile-first approach with breakpoint mixins
- **CSS Custom Properties**: Dynamic theming support

## Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Eliminate unused code from bundles
- **Asset Optimization**: Optimized images and static assets
- **Lazy Loading**: Components and routes loaded on demand

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## Requirements

- **Node.js** >=18.0.0
- **npm** >=9.0.0
- **Modern Browser** with ES2020+ support