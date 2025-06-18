# Tooriistamaailm Frontend

React TypeScript frontend application for the Tooriistamaailm product management system.

## Features

- **Modern React**: Built with React 18 and TypeScript for type safety
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Infinite Scroll**: Seamless product loading with intersection observer
- **Favorites System**: Interactive favorite/unfavorite functionality
- **Grid Layout**: Responsive product grid (1-5 columns based on screen size)
- **Clean Architecture**: Organized with hooks, services, and components

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing with Autoprefixer

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tooriistamaailm-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── ProductGrid.tsx      # Main product grid component
│   ├── ProductCard.tsx      # Individual product card
│   └── FavoriteIcon.tsx     # Favorite toggle button
├── hooks/
│   └── useProducts.ts       # Custom hook for product data
├── services/
│   └── productService.ts    # API service layer
├── types/
│   └── product.d.ts         # TypeScript type definitions
├── index.css               # Global styles and Tailwind imports
└── App.tsx                 # Main application component
```

## Features

### Infinite Scroll
- Loads 20 products initially
- Loads 10 additional products when scrolling near bottom
- Uses Intersection Observer API for optimal performance
- Smooth loading states and error handling

### Responsive Grid
- **Mobile (xs)**: 1 column
- **Small (sm)**: 2 columns
- **Medium (md)**: 3 columns  
- **Large (lg)**: 4 columns
- **Extra Large (xl)**: 5 columns

### Product Cards
- Product image with fallback
- Product name and price
- Interactive favorite button
- Hover effects and transitions
- Optimistic UI updates

### API Integration
- RESTful API communication with Laravel backend
- Proper error handling and loading states
- Product import functionality
- Favorite toggle with immediate UI feedback

## Available Scripts

### Development
```bash
npm start          # Start development server
npm run dev        # Alternative start command
```

### Building
```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

### Code Quality
```bash
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### API Endpoints
The frontend communicates with these backend endpoints:
- `GET /api/products` - Fetch products with pagination
- `POST /api/products/import` - Import products from external source
- `POST /api/products/{id}/favorite` - Toggle product favorite status

## Component Architecture

### ProductGrid Component
- Main container for product listing
- Handles import functionality
- Manages grid layout and infinite scroll
- Displays loading states and error messages

### ProductCard Component
- Individual product display
- Image handling with fallbacks
- Price formatting
- Favorite toggle integration

### useProducts Hook
- Custom React hook for product data management
- Infinite scroll logic with Intersection Observer
- State management for products, loading, and errors
- Pagination handling

### Product Service
- API communication layer
- HTTP client with proper error handling
- Type-safe request/response handling
- Centralized API configuration

## Styling

### Tailwind CSS
The project uses Tailwind CSS for styling with:
- Custom responsive breakpoints
- Utility-first approach
- Component-based styling
- Mobile-first responsive design

### Key Design Patterns
- Card-based product display
- Smooth hover interactions
- Loading skeletons
- Consistent spacing and typography
- Accessible color contrasts

## Development Guidelines

### TypeScript
- Strict type checking enabled
- Interface definitions for all data structures
- Proper type annotations for functions
- Generic types for reusable components

### Code Organization
- Component-based architecture
- Custom hooks for complex logic
- Service layer for API calls
- Type definitions in dedicated files

### Performance
- Lazy loading with intersection observer
- Optimized re-renders with proper dependencies
- Image optimization and fallbacks
- Efficient state updates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
