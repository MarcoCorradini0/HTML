import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal(false);

  currentUser$ = this.currentUser;
  isAuthenticated$ = this.isAuthenticated;

  constructor() {
    // Check if user is logged in from sessionStorage
    const stored = sessionStorage.getItem('currentUser');
    if (stored) {
      const user = JSON.parse(stored);
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Mock login - in a real app, this would call an API
      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
        };
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    sessionStorage.removeItem('currentUser');
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'admin' || false;
  }
}
