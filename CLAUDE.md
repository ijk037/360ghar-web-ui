# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview production build locally

## Architecture Overview

### Technology Stack
- **Framework**: React 18 + Vite
- **State Management**: Zustand (modern stores) + React Context API (legacy UI state)
- **Routing**: React Router DOM v6
- **Styling**: SCSS with custom architecture in `public/assets/sass/`
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios with interceptors
- **Notifications**: React Toastify

### Project Structure

#### Core Directories
- `src/pages/` - Route components (HomeOne, Property, Login, etc.)
- `src/components/` - Feature components (Banner, Counter, PropertyList, etc.)
- `src/common/` - Shared UI components (Header, Footer, Breadcrumb, etc.)
- `src/services/` - API service modules with backend integration
- `src/store/` - Zustand stores for state management
- `src/contextApi/` - React Context providers (MobileMenu, OffCanvas, etc.)
- `src/data/` - Static data organized by page/feature
- `public/assets/` - Static assets with comprehensive SCSS architecture

#### State Management Architecture
**Zustand Stores** (modern approach):
- `authStore.js` - Authentication state and user management
- `propertyStore.js` - Property listings, filters, CRUD operations
- `adminStore.js` - Admin-specific functionality

**React Context** (legacy UI state):
- `PropertyFilterContext` - Property filtering state
- `MobileMenuContext` - Mobile navigation state
- `OffCanvasContext` - Off-canvas menu state
- `BlogDataContext` - Blog-related state
- `ScrollHideContext` - Scroll-based UI behaviors

### API Integration

The application integrates with a 360ghar backend API running on `http://localhost:8000/api/v1`. All API calls go through:

- `api.js` - Base Axios configuration with auth interceptors
- `authService.js` - Authentication endpoints
- `propertyService.js` - Property management
- `mediaService.js` - Media upload/management
- `userService.js` - User profile management

**Authentication Flow**: JWT tokens stored in localStorage, automatic injection via Axios interceptors, 401 handling redirects to login.

### Routing Architecture

The app uses React Router with multiple home page variants (`/`, `/home-two` through `/home-seven`) and standard property/real estate pages. Dynamic routes use title-based parameters (`/property/:title`, `/blog/:title`).

### Styling System

Comprehensive SCSS architecture in `public/assets/sass/`:
- `abstracts/` - Variables, mixins, functions
- `base/` - Typography, margins, padding utilities
- `components/` - Reusable component styles
- `layout/` - Header, footer, navigation styles
- `partials/` - Page-specific styles organized by home variants

The project includes multiple home page designs (home-five, home-four, etc.) with corresponding SCSS partials.