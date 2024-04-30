import { createApp } from '.';
import './db';
import { AuthService } from './services/auth.service';
import { PortfolioService } from './services/portfolio.service';

const authService = new AuthService();
const portfolioService = new PortfolioService();

createApp({ authService, portfolioService });
