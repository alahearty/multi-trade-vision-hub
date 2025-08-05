const API_BASE_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:6001');

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  memberId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface SignUpRequest {
  userDetails: {
    firstName: string;
    lastName: string;
  };
  email: string;
  birthDay: string;
  gender: string;
  password: string;
  contact: {
    mobileNumber: string;
    whatsapp: boolean;
    viber: boolean;
    telegram: boolean;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface SignUpResponse {
  memberId: string;
  memberNumber: number;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
}

export interface UserProfile {
  id: number;
  memberNumber: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  birthDay: string;
  designation: string;
  isEmailVerified: boolean;
  signupDate: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  gender: string;
  birthDay: string;
  designation: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
}

export interface WalletBalance {
  totalBalance: number;
  availableBalance: number;
  pendingBalance: number;
  investedBalance: number;
  lastUpdated: string;
}

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  createdAt: string;
  completedAt?: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface Investment {
  id: number;
  assetType: string;
  assetSymbol: string;
  assetName: string;
  quantity: number;
  averagePrice: number;
  currentValue: number;
  totalInvested: number;
  profitLoss: number;
  createdAt: string;
  lastUpdated: string;
}

export interface PortfolioResponse {
  investments: Investment[];
  totalPortfolioValue: number;
  totalInvested: number;
  totalProfitLoss: number;
}

export interface Referral {
  id: number;
  referredName: string;
  status: string;
  bonusAmount: number;
  createdAt: string;
  completedAt?: string;
}

export interface ReferralsResponse {
  referrals: Referral[];
  totalReferrals: number;
  totalBonus: number;
  referralCode: string;
}

export interface DepositRequest {
  amount: number;
  currency: string;
  description?: string;
}

export interface WithdrawRequest {
  amount: number;
  currency: string;
  description?: string;
}

export interface BuyInvestmentRequest {
  assetType: string;
  assetSymbol: string;
  assetName: string;
  quantity: number;
  price: number;
  totalAmount: number;
}

// Admin interfaces
export interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  pendingApprovals: number;
  activeUsers: number;
  averageTransactionAmount: number;
}

export interface AdminUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  signupDate: string;
  isEmailVerified: boolean;
  totalTransactions: number;
  totalBalance: number;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface AdminTransaction {
  id: number;
  userName: string;
  userEmail: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  createdAt: string;
  completedAt?: string;
}

export interface AdminTransactionsResponse {
  transactions: AdminTransaction[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ApproveTransactionRequest {
  action: string; // "approve" or "reject"
  reason?: string;
}

export interface ApproveTransactionResponse {
  success: boolean;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.errors?.[0]?.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Authentication
  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/members/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async signUp(request: SignUpRequest): Promise<ApiResponse<SignUpResponse>> {
    return this.request<SignUpResponse>('/members/signup', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async verifyEmail(request: VerifyEmailRequest): Promise<ApiResponse<VerifyEmailResponse>> {
    return this.request<VerifyEmailResponse>('/members/verify-email', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async resendVerification(request: ResendVerificationRequest): Promise<ApiResponse<ResendVerificationResponse>> {
    return this.request<ResendVerificationResponse>('/members/resend-verification', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Profile Management
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>('/members/profile');
  }

  async updateProfile(request: UpdateProfileRequest): Promise<ApiResponse<ProfileResponse>> {
    return this.request<ProfileResponse>('/members/profile', {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async changePassword(request: ChangePasswordRequest): Promise<ApiResponse<ProfileResponse>> {
    return this.request<ProfileResponse>('/members/change-password', {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  // Wallet
  async getWalletBalance(): Promise<ApiResponse<WalletBalance>> {
    return this.request<WalletBalance>('/wallet/balance');
  }

  async getTransactions(page: number = 1, pageSize: number = 10): Promise<ApiResponse<TransactionsResponse>> {
    return this.request<TransactionsResponse>(`/wallet/transactions?page=${page}&pageSize=${pageSize}`);
  }

  async deposit(request: DepositRequest): Promise<ApiResponse<{ transactionId: number; status: string; message: string }>> {
    return this.request('/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async withdraw(request: WithdrawRequest): Promise<ApiResponse<{ transactionId: number; status: string; message: string }>> {
    return this.request('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Investments
  async getPortfolio(): Promise<ApiResponse<PortfolioResponse>> {
    return this.request<PortfolioResponse>('/investments/portfolio');
  }

  async buyInvestment(request: BuyInvestmentRequest): Promise<ApiResponse<{ investmentId: number; status: string; message: string }>> {
    return this.request('/investments/buy', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Referrals
  async getReferrals(): Promise<ApiResponse<ReferralsResponse>> {
    return this.request<ReferralsResponse>('/referrals');
  }

  // Admin endpoints
  async getAdminStats(): Promise<ApiResponse<AdminStats>> {
    return this.request<AdminStats>('/admin/stats');
  }

  async getAdminUsers(page: number = 1, pageSize: number = 20, search?: string, status?: string): Promise<ApiResponse<AdminUsersResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    
    return this.request<AdminUsersResponse>(`/admin/users?${params.toString()}`);
  }

  async getPendingTransactions(page: number = 1, pageSize: number = 20, type?: string): Promise<ApiResponse<AdminTransactionsResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (type) params.append('type', type);
    
    return this.request<AdminTransactionsResponse>(`/admin/transactions/pending?${params.toString()}`);
  }

  async approveTransaction(transactionId: number, request: ApproveTransactionRequest): Promise<ApiResponse<ApproveTransactionResponse>> {
    return this.request<ApproveTransactionResponse>(`/admin/transactions/${transactionId}/approve`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL); 