# Contributing to Allstar Forge

Thank you for your interest in contributing to Allstar Forge! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm
- Python 3.11+
- Docker and Docker Compose
- Git

### Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/your-username/allstar-forge.git
   cd allstar-forge
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Environment**
   ```bash
   npm run dev:up
   ```

## 🏗️ Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages

Follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

### Code Style

#### Frontend (React/TypeScript)

- Use TypeScript strict mode
- Follow ESLint rules
- Use functional components with hooks
- Prefer composition over inheritance
- Use shadcn/ui components when possible

#### Backend (Python/FastAPI)

- Follow PEP 8 style guide
- Use type hints for all functions
- Write comprehensive docstrings
- Use async/await for I/O operations
- Follow FastAPI best practices

## 🧪 Testing

### Frontend Testing

```bash
npm run test -w @allstar/web
```

### Backend Testing

```bash
cd apps/api
pytest
```

### Integration Testing

```bash
npm run test:integration
```

## 📝 Documentation

### API Documentation

- Update OpenAPI schemas in FastAPI routers
- Add comprehensive docstrings
- Include example requests/responses

### Frontend Documentation

- Document component props and usage
- Add JSDoc comments for complex functions
- Update README files for new features

## 🔍 Code Review Process

1. **Create Pull Request**

   - Provide clear description of changes
   - Link to related issues
   - Include screenshots for UI changes

2. **Review Checklist**

   - [ ] Code follows style guidelines
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No breaking changes (or properly documented)
   - [ ] Security considerations addressed

3. **Approval Process**
   - At least one approval required
   - All CI checks must pass
   - No merge conflicts

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

## 💡 Feature Requests

For feature requests:

- Check existing issues first
- Provide clear use case
- Include mockups or examples if possible
- Consider implementation complexity

## 🏷️ Release Process

1. **Version Bumping**

   - Update version in `package.json`
   - Update version in Python services
   - Create release notes

2. **Deployment**
   - Automated via GitHub Actions
   - Manual verification in staging
   - Production deployment with approval

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check existing docs first

## 🎯 Areas for Contribution

### High Priority

- Additional API endpoints
- Enhanced monitoring and observability
- Performance optimizations
- Security improvements

### Medium Priority

- UI/UX improvements
- Additional test coverage
- Documentation enhancements
- Developer tooling

### Low Priority

- Code refactoring
- Dependency updates
- Minor bug fixes

## 📋 Development Guidelines

### Database Changes

- Always include migrations
- Test with sample data
- Consider backward compatibility
- Update API documentation

### API Changes

- Follow RESTful conventions
- Maintain backward compatibility
- Include proper error handling
- Add comprehensive tests

### Frontend Changes

- Maintain responsive design
- Follow accessibility guidelines
- Test across different browsers
- Optimize for performance

## 🚨 Security

- Never commit secrets or credentials
- Use environment variables for configuration
- Follow security best practices
- Report security issues privately

## 📊 Performance

- Monitor bundle sizes
- Optimize database queries
- Use caching appropriately
- Profile performance-critical code

Thank you for contributing to Allstar Forge! 🎉
