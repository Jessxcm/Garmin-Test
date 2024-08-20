interface Deregistration {
    userId: string;
    userAccessToken: string;
  }
  
export interface DeregResponse {
    deregistrations: Deregistration[];
  }