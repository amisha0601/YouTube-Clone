import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import {vi} from "vitest";
import { describe,beforeEach,test,expect } from 'vitest';


vi.mock('../assets/clone_assets/simon.png', () => 'simon-mock');
vi.mock('../assets/clone_assets/tom.png', () => 'tom-mock');
vi.mock('../assets/clone_assets/megan.png', () => 'megan-mock');

describe('Sidebar component tests', () => {
  const mockSetCategory = vi.fn();

  beforeEach(() => {
    mockSetCategory.mockClear();
  });

  test('Sidebar should shows menu items when it is open', () => {
    render(
      <Sidebar
        isSidebarOpen={true}
        category={0}
        setCategory={mockSetCategory}
        currentTheme="light"
      />
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gaming')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  test('Sidebar should visually hide text labels when closed', () => {
    render(
      <Sidebar
        isSidebarOpen={false}
        category={0}
        setCategory={mockSetCategory}
        currentTheme="light"
      />
    );

    const homeElement = screen.getByText('Home');
    const gamingElement = screen.getByText('Gaming');

    expect(homeElement).toHaveClass('opacity-0');
    expect(homeElement).toHaveClass('pointer-events-none');
    expect(gamingElement).toHaveClass('opacity-0');
    expect(gamingElement).toHaveClass('pointer-events-none');
  });

  test('Clicking Gaming should call setCategory with value 20', () => {
    render(
      <Sidebar
        isSidebarOpen={true}
        category={0}
        setCategory={mockSetCategory}
        currentTheme="light"
      />
    );

    fireEvent.click(screen.getByText('Gaming'));
    expect(mockSetCategory).toHaveBeenCalledWith(20);
  });

  test('Home should be visually highlighted', () => {
    render(
      <Sidebar
        isSidebarOpen={true}
        category={0}
        setCategory={mockSetCategory}
        currentTheme="light"
      />
    );

    const homeWrapper = screen.getByText('Home').closest('div');
    expect(homeWrapper).toHaveClass('bg-gray-200');
  });
});
