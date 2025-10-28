import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';


describe('Footer Component', () => {
  // Test to check if the component renders
  test('renders the footer without crashing', () => {
    render(<Footer />);
    
    // Check for LinkedIn and GitHub icons/links
    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/guillaume-martinez-232602259/');
    
    const gitHubLink = screen.getByRole('link', { name: /github/i });
    expect(gitHubLink).toHaveAttribute('href', 'https://github.com/martinez-guillaume');
  });

  // Test for features and resources sections
  test('renders features and resources sections', () => {
    render(<Footer />);
    
    // Check if the heading for 'Fonctionnalités' exists
    const featuresHeading = screen.getByRole('heading', { name: /fonctionnalités/i });
    expect(featuresHeading).toBeInTheDocument();

    // Check if the heading for 'Ressources' exists
    const resourcesHeading = screen.getByRole('heading', { name: /ressources/i });
    expect(resourcesHeading).toBeInTheDocument();
  });

  // Test the presence of email
  test('renders email contact', () => {
    render(<Footer />);
    
    // Check for email contact
    const emailLink = screen.getByText('guillaume.m.developer@gmail.com');
    expect(emailLink).toBeInTheDocument();
  });
});