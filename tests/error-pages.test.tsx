import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import NotFound from '../app/not-found'
import Error from '../app/error'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('Error Pages', () => {
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
  }

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  describe('404 Error Page (NotFound)', () => {
    it('renders 404 error page with correct content', () => {
      render(<NotFound />)
      
      // Check for main error elements
      expect(screen.getByText('404')).toBeInTheDocument()
      expect(screen.getByText('Page Not Found')).toBeInTheDocument()
      expect(screen.getByText(/Oops! The page you're looking for doesn't exist/)).toBeInTheDocument()
    })

    it('displays the error icon', () => {
      render(<NotFound />)
      
      const errorIcon = screen.getByAltText('404 Error Icon')
      expect(errorIcon).toBeInTheDocument()
      expect(errorIcon).toHaveAttribute('src')
    })

    it('has functional "Back to Home" button', () => {
      render(<NotFound />)
      
      const backToHomeButton = screen.getByText('Back to Home')
      expect(backToHomeButton).toBeInTheDocument()
      expect(backToHomeButton.closest('a')).toHaveAttribute('href', '/')
    })

    it('has functional "Go Back" button', () => {
      render(<NotFound />)
      
      const goBackButton = screen.getByText('Go Back')
      expect(goBackButton).toBeInTheDocument()
      
      // Mock window.history.back since the button uses window.history.back()
      const mockBack = jest.fn()
      Object.defineProperty(window, 'history', {
        value: { back: mockBack },
        writable: true
      })
      
      fireEvent.click(goBackButton)
      expect(mockBack).toHaveBeenCalled()
    })

    it('includes helpful links', () => {
      render(<NotFound />)
      
      const aboutLink = screen.getByText('About page')
      const dashboardLink = screen.getByText('Dashboard')
      
      expect(aboutLink).toBeInTheDocument()
      expect(dashboardLink).toBeInTheDocument()
      expect(aboutLink.closest('a')).toHaveAttribute('href', '/about')
      expect(dashboardLink.closest('a')).toHaveAttribute('href', '/dashboard')
    })

    it('has proper styling classes', () => {
      render(<NotFound />)
      
      // Check for the main container with the dark background
      const mainContainer = screen.getByText('404').closest('.min-h-screen')
      expect(mainContainer).toHaveClass('min-h-screen', 'bg-[#09050E]')
    })
  })

  describe('500 Error Page (Error)', () => {
    const mockError = {
      name: 'TestError',
      message: 'Test server error',
      digest: 'test-digest-123',
    } as Error & { digest?: string }

    const mockReset = jest.fn()

    it('renders 500 error page with correct content', () => {
      render(<Error error={mockError} reset={mockReset} />)
      
      // Check for main error elements
      expect(screen.getByText('500')).toBeInTheDocument()
      expect(screen.getByText('Server Error')).toBeInTheDocument()
      expect(screen.getByText(/Something went wrong on our end/)).toBeInTheDocument()
    })

    it('displays the error icon', () => {
      render(<Error error={mockError} reset={mockReset} />)
      
      const errorIcon = screen.getByAltText('500 Error Icon')
      expect(errorIcon).toBeInTheDocument()
      expect(errorIcon).toHaveAttribute('src')
    })

    it('has functional "Try Again" button', () => {
      render(<Error error={mockError} reset={mockReset} />)
      
      const tryAgainButton = screen.getByText('Try Again')
      expect(tryAgainButton).toBeInTheDocument()
      
      fireEvent.click(tryAgainButton)
      expect(mockReset).toHaveBeenCalled()
    })

    it('has functional "Back to Home" button', () => {
      render(<Error error={mockError} reset={mockReset} />)
      
      const backToHomeButton = screen.getByText('Back to Home')
      expect(backToHomeButton).toBeInTheDocument()
      expect(backToHomeButton.closest('a')).toHaveAttribute('href', '/')
    })

    it('shows error details in development mode', () => {
      // Mock NODE_ENV to development
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      
      render(<Error error={mockError} reset={mockReset} />)
      
      expect(screen.getByText('Error Details (Development):')).toBeInTheDocument()
      expect(screen.getByText('Test server error')).toBeInTheDocument()
      expect(screen.getByText('Error ID: test-digest-123')).toBeInTheDocument()
      
      // Restore original env
      process.env.NODE_ENV = originalEnv
    })

    it('includes support contact information', () => {
      render(<Error error={mockError} reset={mockReset} />)
      
      const supportLink = screen.getByText('contact our support team')
      expect(supportLink).toBeInTheDocument()
      expect(supportLink.closest('a')).toHaveAttribute('href', '/about')
    })

    it('has proper styling classes', () => {
      render(<Error error={mockError} reset={mockReset} />)
      
      // Check for the main container with the dark background
      const mainContainer = screen.getByText('500').closest('.min-h-screen')
      expect(mainContainer).toHaveClass('min-h-screen', 'bg-[#09050E]')
    })
  })

  describe('Accessibility', () => {
    it('404 page has proper semantic structure', () => {
      render(<NotFound />)
      
      // Check for proper heading hierarchy
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })
      
      expect(h1).toHaveTextContent('404')
      expect(h2).toHaveTextContent('Page Not Found')
    })

    it('500 page has proper semantic structure', () => {
      const mockError = { name: 'TestError', message: 'Test error', digest: 'test' } as Error & { digest?: string }
      const mockReset = jest.fn()
      
      render(<Error error={mockError} reset={mockReset} />)
      
      // Check for proper heading hierarchy
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })
      
      expect(h1).toHaveTextContent('500')
      expect(h2).toHaveTextContent('Server Error')
    })

    it('buttons are keyboard accessible', () => {
      render(<NotFound />)
      
      const goBackButton = screen.getByText('Go Back')
      expect(goBackButton).toBeInTheDocument()
      // Buttons are keyboard accessible by default in HTML
    })
  })

  describe('Responsive Design', () => {
    it('404 page has responsive classes', () => {
      render(<NotFound />)
      
      const container = screen.getByText('404').closest('div')
      expect(container).toHaveClass('text-center', 'px-4', 'sm:px-6', 'md:px-8')
    })

    it('500 page has responsive classes', () => {
      const mockError = { name: 'TestError', message: 'Test error', digest: 'test' } as Error & { digest?: string }
      const mockReset = jest.fn()
      
      render(<Error error={mockError} reset={mockReset} />)
      
      const container = screen.getByText('500').closest('div')
      expect(container).toHaveClass('text-center', 'px-4', 'sm:px-6', 'md:px-8')
    })
  })
})

